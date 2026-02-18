import {Composition} from 'remotion';
import {AnnouncementVideo} from './AnnouncementVideo';
import {
  Screenshot1_Hero,
  Screenshot2_Filtering,
  Screenshot3_Filtered,
  Screenshot4_Features,
} from './StoreScreenshots';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AnnouncementVideo"
        component={AnnouncementVideo}
        durationInFrames={675}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="screenshot-1-hero"
        component={Screenshot1_Hero}
        durationInFrames={1}
        fps={1}
        width={1280}
        height={800}
      />
      <Composition
        id="screenshot-2-filtering"
        component={Screenshot2_Filtering}
        durationInFrames={1}
        fps={1}
        width={1280}
        height={800}
      />
      <Composition
        id="screenshot-3-filtered"
        component={Screenshot3_Filtered}
        durationInFrames={1}
        fps={1}
        width={1280}
        height={800}
      />
      <Composition
        id="screenshot-4-features"
        component={Screenshot4_Features}
        durationInFrames={1}
        fps={1}
        width={1280}
        height={800}
      />
    </>
  );
};
