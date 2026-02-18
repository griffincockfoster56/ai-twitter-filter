import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';

export const OutroScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const logoProgress = spring({
    frame,
    fps,
    config: {damping: 12},
  });

  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(0.3 * fps),
    config: {damping: 200},
  });

  const ctaProgress = spring({
    frame,
    fps,
    delay: Math.round(0.8 * fps),
    config: {damping: 15},
  });

  const ctaScale = interpolate(ctaProgress, [0, 1], [0.9, 1]);
  const ctaY = interpolate(ctaProgress, [0, 1], [20, 0]);

  // Subtle floating animation on logo
  const floatY = interpolate(
    frame % (2 * fps),
    [0, fps, 2 * fps],
    [0, -8, 0]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background gradient accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 300,
          background:
            'linear-gradient(to top, rgba(29,155,240,0.06), transparent)',
        }}
      />

      {/* Logo */}
      <Img
        src={staticFile('full-icon.png')}
        style={{
          width: 240,
          height: 240,
          objectFit: 'contain',
          transform: `scale(${logoProgress}) translateY(${floatY}px)`,
          opacity: logoProgress,
        }}
      />

      {/* Title */}
      <div
        style={{
          marginTop: 24,
          opacity: titleProgress,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: '#1d9bf0',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: -1,
          }}
        >
          AI Twitter Filter
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 32,
          opacity: ctaProgress,
          transform: `scale(${ctaScale}) translateY(${ctaY}px)`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: '#1d9bf0',
            color: '#ffffff',
            fontSize: 24,
            fontWeight: 700,
            padding: '16px 48px',
            borderRadius: 40,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: 'inline-block',
          }}
        >
          Available Now — Free Chrome Extension
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 20,
            color: '#5b7083',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Filter your feed. Protect your peace.
        </div>
      </div>
    </AbsoluteFill>
  );
};
