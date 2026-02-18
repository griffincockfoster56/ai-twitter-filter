import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';

export const IntroScene: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const textProgress = spring({
    frame,
    fps,
    config: {damping: 200},
  });

  const scaleProgress = interpolate(textProgress, [0, 1], [0.92, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div
        style={{
          opacity: textProgress,
          transform: `scale(${scaleProgress})`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 54,
            fontWeight: 800,
            color: '#1d9bf0',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: 1.3,
            letterSpacing: -1,
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
