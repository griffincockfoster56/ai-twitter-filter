const DEFAULT_SETTINGS = {
  enabled: true,
  apiProvider: "openai",
  apiKey: "",
  model: "gpt-4o-mini",
  filterPrompt:
    "Is this tweet negative, toxic, or complaining? Reply with true to hide it, false to keep it.",
};

const els = {
  enabled: document.getElementById("enabled"),
  apiProvider: document.getElementById("apiProvider"),
  apiKey: document.getElementById("apiKey"),
  model: document.getElementById("model"),
  modelTextField: document.getElementById("modelTextField"),
  modelSelect: document.getElementById("modelSelect"),
  modelSelectField: document.getElementById("modelSelectField"),
  filterPrompt: document.getElementById("filterPrompt"),
  clearCache: document.getElementById("clearCache"),
  status: document.getElementById("status"),
};

function updateModelVisibility(provider) {
  if (provider === "openrouter") {
    els.modelTextField.style.display = "none";
    els.modelSelectField.style.display = "";
  } else {
    els.modelTextField.style.display = "";
    els.modelSelectField.style.display = "none";
  }
}

// Load saved settings
chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
  els.enabled.checked = settings.enabled;
  els.apiProvider.value = settings.apiProvider;
  els.apiKey.value = settings.apiKey;
  els.model.value = settings.model;
  els.filterPrompt.value = settings.filterPrompt;

  updateModelVisibility(settings.apiProvider);

  // If provider is openrouter, select the saved model in the dropdown
  if (settings.apiProvider === "openrouter") {
    els.modelSelect.value = settings.model;
  }
});

// Auto-save on change
function save(key, value) {
  chrome.storage.sync.set({ [key]: value });
}

els.enabled.addEventListener("change", () => {
  save("enabled", els.enabled.checked);
});

els.apiProvider.addEventListener("change", () => {
  const provider = els.apiProvider.value;
  save("apiProvider", provider);
  updateModelVisibility(provider);

  // Set a sensible default model when switching providers
  if (provider === "openrouter") {
    const model = els.modelSelect.value;
    save("model", model);
  } else {
    save("model", "gpt-4o-mini");
    els.model.value = "gpt-4o-mini";
  }
});

els.apiKey.addEventListener("change", () => {
  save("apiKey", els.apiKey.value);
});

els.model.addEventListener("change", () => {
  save("model", els.model.value);
});

els.modelSelect.addEventListener("change", () => {
  save("model", els.modelSelect.value);
});

els.filterPrompt.addEventListener("change", () => {
  save("filterPrompt", els.filterPrompt.value);
});

// Clear cache button
els.clearCache.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "CLEAR_CACHE" }, () => {
    els.status.textContent = "Cache cleared";
    setTimeout(() => {
      els.status.textContent = "";
    }, 2000);
  });
});
