// In-memory cache: hash -> { hide: boolean, reason: string }
const cache = new Map();

const DEFAULT_SETTINGS = {
  enabled: true,
  apiProvider: "openai",
  apiKey: "",
  model: "gpt-4o-mini",
  filterPrompt: "Is this tweet negative, toxic, or complaining? Reply with true to hide it, false to keep it.",
};

async function getSettings() {
  const data = await chrome.storage.sync.get(DEFAULT_SETTINGS);
  return data;
}

function getApiUrl(provider) {
  if (provider === "openrouter") {
    return "https://openrouter.ai/api/v1/chat/completions";
  }
  return "https://api.openai.com/v1/chat/completions";
}

async function evaluateWithAI(tweets, settings) {
  const url = getApiUrl(settings.apiProvider);

  const systemPrompt = `You are a tweet filter. The user has set this filter criteria:

"${settings.filterPrompt}"

You will receive a JSON array of tweets, each with an "id" and "text" field.
For each tweet, decide if it should be hidden based on the filter criteria.
Respond with ONLY a JSON array of objects with "id" (string), "hide" (boolean), and "reason" (string, max 3 words, e.g. "toxic negativity", "political rage-bait", "spam promotion") fields.
If hide is false, reason should be an empty string.
No explanation, no markdown, just the JSON array.`;

  const userMessage = JSON.stringify(
    tweets.map((t) => ({ id: t.hash, text: t.text }))
  );

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${settings.apiKey}`,
  };

  if (settings.apiProvider === "openrouter") {
    headers["HTTP-Referer"] = "https://github.com/ai-twitter-filter";
    headers["X-Title"] = "AI Twitter Filter";
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: settings.model,
      temperature: 0,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content.trim();

  // Parse JSON, stripping markdown code fences if present
  let cleaned = content;
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  return JSON.parse(cleaned);
}

async function handleEvaluateTweets(tweets) {
  const settings = await getSettings();

  if (!settings.enabled || !settings.apiKey) {
    return tweets.map((t) => ({ id: t.hash, hide: false }));
  }

  // Split into cached and uncached
  const results = [];
  const uncached = [];

  for (const tweet of tweets) {
    if (cache.has(tweet.hash)) {
      const cached = cache.get(tweet.hash);
      results.push({ id: tweet.hash, hide: cached.hide, reason: cached.reason });
    } else {
      uncached.push(tweet);
    }
  }

  if (uncached.length === 0) {
    return results;
  }

  // Process in batches of 15
  for (let i = 0; i < uncached.length; i += 15) {
    const batch = uncached.slice(i, i + 15);
    try {
      const verdicts = await evaluateWithAI(batch, settings);
      for (const verdict of verdicts) {
        cache.set(verdict.id, { hide: verdict.hide, reason: verdict.reason || "" });
        results.push(verdict);
      }
    } catch (err) {
      console.error("AI Twitter Filter - API error:", err);
      // Fail open: show tweets on error
      for (const tweet of batch) {
        results.push({ id: tweet.hash, hide: false });
      }
    }
  }

  return results;
}

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "EVALUATE_TWEETS") {
    handleEvaluateTweets(message.tweets).then(sendResponse);
    return true; // async response
  }

  if (message.type === "GET_SETTINGS") {
    getSettings().then(sendResponse);
    return true;
  }

  if (message.type === "CLEAR_CACHE") {
    cache.clear();
    console.log("AI Twitter Filter - Cache cleared");
    sendResponse({ success: true });
    return false;
  }
});

// Listen for settings changes and broadcast to content scripts
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "sync") return;

  // Auto-clear cache when filter prompt changes
  if (changes.filterPrompt) {
    cache.clear();
    console.log("AI Twitter Filter - Cache cleared (filter changed)");
  }

  // Broadcast settings update to all x.com tabs
  chrome.tabs.query({ url: ["https://x.com/*", "https://twitter.com/*"] }, (tabs) => {
    const settings = {};
    for (const [key, change] of Object.entries(changes)) {
      settings[key] = change.newValue;
    }
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, {
        type: "SETTINGS_UPDATED",
        changes: settings,
      }).catch(() => {
        // Tab might not have content script loaded yet
      });
    }
  });
});
