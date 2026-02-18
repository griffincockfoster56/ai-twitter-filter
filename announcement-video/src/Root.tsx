import {Composition} from 'remotion';
import {AnnouncementVideo} from './AnnouncementVideo';

export const RemotionRoot = () => {
  return (
    <Composition
      id="AnnouncementVideo"
      component={AnnouncementVideo}
      durationInFrames={675}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
