import {
  AbsoluteFill,
  Img,
  staticFile,
  Composition,
} from 'remotion';

const FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export const Screenshot1_Hero = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #e8f5fd 0%, #ffffff 50%, #f0f8ff 100%)',
        }}
      />

      {/* Bird logo */}
      <Img
        src={staticFile('full-icon-nobg.png')}
        style={{
          position: 'absolute',
          right: 80,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 420,
          height: 420,
          objectFit: 'contain',
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: '50%',
          transform: 'translateY(-50%)',
          maxWidth: 680,
        }}
      >
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: '#1d9bf0',
            fontFamily: FONT_FAMILY,
            letterSpacing: -1,
            lineHeight: 1.15,
          }}
        >
          AI Twitter Filter
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#536471',
            fontFamily: FONT_FAMILY,
            marginTop: 16,
            lineHeight: 1.4,
          }}
        >
          Take back control of your timeline.
          <br />
          AI filters out the noise so you don't have to.
        </div>
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            gap: 12,
          }}
        >
          <div
            style={{
              background: '#1d9bf0',
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 700,
              padding: '12px 28px',
              borderRadius: 30,
              fontFamily: FONT_FAMILY,
            }}
          >
            Free &amp; Open Source
          </div>
          <div
            style={{
              background: '#f7f9fa',
              color: '#536471',
              fontSize: 18,
              fontWeight: 600,
              padding: '12px 28px',
              borderRadius: 30,
              border: '1px solid #e1e8ed',
              fontFamily: FONT_FAMILY,
            }}
          >
            Bring Your Own API Key
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Screenshot2_Filtering = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#f7f9fa',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 60,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: '#1d9bf0',
            fontFamily: FONT_FAMILY,
          }}
        >
          Every tweet gets checked automatically
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#536471',
            fontFamily: FONT_FAMILY,
            marginTop: 8,
          }}
        >
          AI evaluates each tweet against your custom filter criteria in real-time
        </div>
      </div>

      {/* Screenshot */}
      <Img
        src={staticFile('filtering-tweets.png')}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          height: 560,
          objectFit: 'contain',
          borderRadius: 16,
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        }}
      />
    </AbsoluteFill>
  );
};

export const Screenshot3_Filtered = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#f7f9fa',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 60,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: '#1d9bf0',
            fontFamily: FONT_FAMILY,
          }}
        >
          Toxic content? Gone.
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#536471',
            fontFamily: FONT_FAMILY,
            marginTop: 8,
          }}
        >
          Filtered tweets are collapsed with a reason tag — click "Show" to reveal anytime
        </div>
      </div>

      {/* Screenshot */}
      <Img
        src={staticFile('filtered-tweets.png')}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          height: 560,
          objectFit: 'contain',
          borderRadius: 16,
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        }}
      />
    </AbsoluteFill>
  );
};

const FEATURES = [
  {icon: '🤖', title: 'Multiple AI Providers', desc: 'OpenAI, OpenRouter, Gemini, Claude & more'},
  {icon: '🎯', title: 'Custom Filter Criteria', desc: 'Write natural language rules for what to hide'},
  {icon: '💾', title: 'Save & Load Filters', desc: 'Switch between filter presets instantly'},
  {icon: '⚡', title: 'Real-time Filtering', desc: 'Tweets evaluated as you scroll'},
  {icon: '🔑', title: 'Bring Your Own Key', desc: 'Use your own API key — no subscription'},
  {icon: '🔓', title: 'Fully Open Source', desc: 'Transparent code you can inspect and trust'},
];

export const Screenshot4_Features = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: '#1d9bf0',
            fontFamily: FONT_FAMILY,
          }}
        >
          Packed with Features
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#536471',
            fontFamily: FONT_FAMILY,
            marginTop: 8,
          }}
        >
          Bring your own API key. Fully open source.
        </div>
      </div>

      {/* Feature grid */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          justifyContent: 'center',
          padding: '0 60px',
          maxWidth: 1200,
        }}
      >
        {FEATURES.map((f, i) => (
          <div
            key={i}
            style={{
              background: '#f7f9fa',
              border: '2px solid #e1e8ed',
              borderRadius: 16,
              padding: '22px 24px',
              width: 360,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
            }}
          >
            <div style={{fontSize: 32, lineHeight: 1, flexShrink: 0}}>{f.icon}</div>
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1a1a2e',
                  fontFamily: FONT_FAMILY,
                  marginBottom: 4,
                }}
              >
                {f.title}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: '#536471',
                  fontFamily: FONT_FAMILY,
                  lineHeight: 1.3,
                }}
              >
                {f.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
