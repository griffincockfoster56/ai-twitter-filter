import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';

export const DemoScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Headline fades in
  const headlineProgress = spring({
    frame,
    fps,
    config: {damping: 200},
  });

  // First screenshot (filtering) appears
  const filteringEntrance = spring({
    frame,
    fps,
    delay: Math.round(0.3 * fps),
    config: {damping: 14},
  });
  const filteringY = interpolate(filteringEntrance, [0, 1], [60, 0]);

  // Transition point: swap to filtered screenshot
  const swapStart = 3 * fps;
  const swapProgress = spring({
    frame: Math.max(0, frame - swapStart),
    fps,
    config: {damping: 200},
  });

  // Second headline
  const headline2Progress = spring({
    frame: Math.max(0, frame - swapStart),
    fps,
    config: {damping: 200},
  });

  // Filtered screenshot entrance
  const filteredEntrance = spring({
    frame: Math.max(0, frame - swapStart - Math.round(0.2 * fps)),
    fps,
    config: {damping: 14},
  });
  const filteredY = interpolate(filteredEntrance, [0, 1], [40, 0]);

  const showingFiltered = frame >= swapStart;

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
          top: 60,
          textAlign: 'center',
          opacity: showingFiltered ? headline2Progress : headlineProgress,
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: '#1d9bf0',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {showingFiltered ? 'Toxic content? Gone.' : 'See it in action'}
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#5b7083',
            marginTop: 8,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {showingFiltered
            ? 'AI detects and hides unwanted tweets'
            : 'Every tweet gets checked automatically'}
        </div>
      </div>

      {/* Screenshot container */}
      <div
        style={{
          position: 'absolute',
          top: 160,
          width: 860,
          height: 860,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Filtering screenshot */}
        <div
          style={{
            position: 'absolute',
            opacity: showingFiltered ? 1 - swapProgress : filteringEntrance,
            transform: showingFiltered
              ? `scale(${interpolate(swapProgress, [0, 1], [1, 0.95])})`
              : `translateY(${filteringY}px)`,
          }}
        >
          <Img
            src={staticFile('filtering-tweets.png')}
            style={{
              maxWidth: 860,
              maxHeight: 840,
              objectFit: 'contain',
              borderRadius: 16,
              boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
            }}
          />
        </div>

        {/* Filtered screenshot */}
        {showingFiltered && (
          <div
            style={{
              position: 'absolute',
              opacity: filteredEntrance,
              transform: `translateY(${filteredY}px)`,
            }}
          >
            <Img
              src={staticFile('filtered-tweets.png')}
              style={{
                maxWidth: 860,
                maxHeight: 840,
                objectFit: 'contain',
                borderRadius: 16,
                boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
              }}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
