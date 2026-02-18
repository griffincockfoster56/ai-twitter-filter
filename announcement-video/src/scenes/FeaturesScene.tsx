import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';

const FEATURES = [
  {
    icon: '🤖',
    title: 'Multiple AI Providers',
    desc: 'OpenAI, OpenRouter, Gemini, Claude & more',
  },
  {
    icon: '🎯',
    title: 'Custom Filter Criteria',
    desc: 'Write natural language rules for what to hide',
  },
  {
    icon: '💾',
    title: 'Save & Load Filters',
    desc: 'Switch between filter presets instantly',
  },
  {
    icon: '⚡',
    title: 'Real-time Filtering',
    desc: 'Tweets evaluated as you scroll',
  },
];

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  desc: string;
  index: number;
}> = ({icon, title, desc, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay: Math.round(0.3 * fps + index * 0.25 * fps),
    config: {damping: 14},
  });

  const slideY = interpolate(entrance, [0, 1], [50, 0]);

  return (
    <div
      style={{
        opacity: entrance,
        transform: `translateY(${slideY}px)`,
        background: '#ffffff',
        border: '2px solid #e1e8ed',
        borderRadius: 20,
        padding: '24px 28px',
        width: 440,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        boxShadow: '0 2px 12px rgba(29,155,240,0.06)',
      }}
    >
      <div style={{fontSize: 36, lineHeight: 1, flexShrink: 0}}>{icon}</div>
      <div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#1a1a2e',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 17,
            color: '#5b7083',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: 1.3,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  );
};

export const FeaturesScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const headlineProgress = spring({
    frame,
    fps,
    config: {damping: 200},
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#f7f9fa',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          opacity: headlineProgress,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: '#1d9bf0',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Packed with Features
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#5b7083',
            marginTop: 10,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Bring your own API key. Fully open source.
        </div>
      </div>

      {/* Feature grid */}
      <div
        style={{
          marginTop: 60,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 18,
          justifyContent: 'center',
          maxWidth: 940,
        }}
      >
        {FEATURES.map((f, i) => (
          <FeatureCard key={i} {...f} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
