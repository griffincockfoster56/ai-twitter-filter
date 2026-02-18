import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';

export const SolutionScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const iconProgress = spring({
    frame,
    fps,
    config: {damping: 12},
  });

  const textProgress = spring({
    frame,
    fps,
    delay: Math.round(0.4 * fps),
    config: {damping: 200},
  });

  const filterBarProgress = spring({
    frame,
    fps,
    delay: Math.round(0.8 * fps),
    config: {damping: 15},
  });

  const checkmarkProgress = spring({
    frame,
    fps,
    delay: Math.round(1.4 * fps),
    config: {damping: 10},
  });

  const iconScale = interpolate(iconProgress, [0, 1], [0.5, 1]);

  // Mockup of a filtered tweet
  const filterBarY = interpolate(filterBarProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Small icon */}
      <Img
        src={staticFile('icon-cropped.png')}
        style={{
          position: 'absolute',
          top: 80,
          width: 120,
          height: 120,
          objectFit: 'contain',
          transform: `scale(${iconScale})`,
          opacity: iconProgress,
        }}
      />

      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          textAlign: 'center',
          opacity: textProgress,
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
          AI-Powered Filtering
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#5b7083',
            marginTop: 12,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Describe what you don't want to see.
          <br />
          AI handles the rest.
        </div>
      </div>

      {/* Mock filter bar */}
      <div
        style={{
          position: 'absolute',
          top: 420,
          opacity: filterBarProgress,
          transform: `translateY(${filterBarY}px)`,
          width: 740,
        }}
      >
        {/* Filter prompt mockup */}
        <div
          style={{
            background: '#f7f9fa',
            border: '2px solid #1d9bf0',
            borderRadius: 12,
            padding: '18px 24px',
            fontSize: 20,
            color: '#1a1a2e',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontStyle: 'italic',
          }}
        >
          "Hide tweets that are negative, toxic, or rage-bait"
        </div>

        {/* Filtered tweet result */}
        <div
          style={{
            marginTop: 20,
            border: '1px solid #e1e8ed',
            borderRadius: 16,
            padding: '16px 20px',
            opacity: checkmarkProgress,
            transform: `scale(${interpolate(checkmarkProgress, [0, 1], [0.95, 1])})`,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: 'rgba(29,155,240,0.04)',
          }}
        >
          {/* Checkmark / shield icon */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#1d9bf0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#1a1a2e',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Tweet filtered
            </div>
            <div
              style={{
                fontSize: 16,
                color: '#5b7083',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Matched: negative tone, rage-bait content
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
