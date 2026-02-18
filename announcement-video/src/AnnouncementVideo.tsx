import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {IntroScene} from './scenes/IntroScene';
import {LogoReveal} from './scenes/LogoReveal';
import {SolutionScene} from './scenes/SolutionScene';
import {DemoScene} from './scenes/DemoScene';
import {FeaturesScene} from './scenes/FeaturesScene';
import {OutroScene} from './scenes/OutroScene';

export const AnnouncementVideo = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#ffffff'}}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={4 * fps}>
          <LogoReveal />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: Math.round(0.5 * fps)})}
        />

        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <IntroScene text="The algorithm controls what you see" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: Math.round(0.5 * fps)})}
        />

        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <IntroScene text="Now you can take back control from the algorithm" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: Math.round(0.5 * fps)})}
        />

        <TransitionSeries.Sequence durationInFrames={3 * fps}>
          <SolutionScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({direction: 'from-bottom'})}
          timing={linearTiming({durationInFrames: Math.round(0.5 * fps)})}
        />

        <TransitionSeries.Sequence durationInFrames={6 * fps}>
          <DemoScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: Math.round(0.5 * fps)})}
        />

        <TransitionSeries.Sequence durationInFrames={3.5 * fps}>
          <FeaturesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: Math.round(0.5 * fps)})}
        />

        <TransitionSeries.Sequence durationInFrames={3.5 * fps}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
