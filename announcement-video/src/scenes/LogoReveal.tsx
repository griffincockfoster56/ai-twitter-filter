import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from 'remotion';

export const LogoReveal = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Logo scales up with a bouncy spring
  const logoScale = spring({
    frame,
    fps,
    config: {damping: 8, stiffness: 120},
  });

  // Logo subtle rotation
  const logoRotation = interpolate(
    spring({frame, fps, config: {damping: 12}}),
    [0, 1],
    [-15, 0]
  );

  // Lightning flash effect at peak
  const flashOpacity = interpolate(frame, [8, 12, 16], [0, 0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Title slides up and fades in
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(0.6 * fps),
    config: {damping: 15},
  });
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleOpacity = titleProgress;

  // Subtitle fades in
  const subtitleProgress = spring({
    frame,
    fps,
    delay: Math.round(1.2 * fps),
    config: {damping: 200},
  });

  // Glow pulse behind logo
  const glowScale = interpolate(
    frame,
    [0, 1.5 * fps, 3 * fps],
    [0.8, 1.15, 1],
    {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'}
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(29,155,240,0.15) 0%, rgba(29,155,240,0) 70%)',
          transform: `scale(${glowScale})`,
        }}
      />

      {/* Flash overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: 'rgba(29,155,240,0.3)',
          opacity: flashOpacity,
        }}
      />

      {/* Logo */}
      <Img
        src={staticFile('full-icon-nobg.png')}
        style={{
          width: 320,
          height: 320,
          objectFit: 'contain',
          transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          bottom: 260,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#1d9bf0',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: -1,
          }}
        >
          AI Twitter Filter
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: 215,
          opacity: subtitleProgress,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: '#5b7083',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Take control of your timeline
        </div>
      </div>
    </AbsoluteFill>
  );
};
