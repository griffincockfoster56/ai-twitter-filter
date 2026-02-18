import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from 'remotion';

const TOXIC_TWEETS = [
  {author: '@angry_user', text: 'This is the worst take I\'ve ever seen 🤬'},
  {author: '@doom_poster', text: 'Everything is terrible and getting worse...'},
  {author: '@troll_42', text: 'You\'re an idiot if you think that works lol'},
];

const TweetCard: React.FC<{
  author: string;
  text: string;
  index: number;
}> = ({author, text, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay: index * Math.round(0.3 * fps),
    config: {damping: 15},
  });

  const slideX = interpolate(entrance, [0, 1], [-400, 0]);

  // Red tint grows
  const redTint = interpolate(
    frame,
    [index * 0.3 * fps + fps, index * 0.3 * fps + 1.5 * fps],
    [0, 0.08],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <div
      style={{
        transform: `translateX(${slideX}px)`,
        opacity: entrance,
        backgroundColor: `rgba(244, 33, 46, ${redTint})`,
        border: '1px solid #e1e8ed',
        borderRadius: 16,
        padding: '16px 20px',
        marginBottom: 14,
        width: 700,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#1a1a2e',
          marginBottom: 6,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {author}
      </div>
      <div
        style={{
          fontSize: 20,
          color: '#536471',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          lineHeight: 1.4,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const ProblemScene = () => {
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
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Headline */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          opacity: headlineProgress,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: '#1a1a2e',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Your timeline is full of{' '}
          <span style={{color: '#f4212e'}}>noise</span>
        </div>
      </div>

      {/* Toxic tweet cards */}
      <div style={{marginTop: 80}}>
        {TOXIC_TWEETS.map((tweet, i) => (
          <TweetCard
            key={i}
            author={tweet.author}
            text={tweet.text}
            index={i}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
