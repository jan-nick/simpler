import { AnimationDuration } from '@simpler/types';
import { fadeInOnEnterAnimation } from 'angular-animations';

export const defaultOnEnterAnimation = fadeInOnEnterAnimation({
  duration: AnimationDuration.Short,
  anchor: 'enter',
});
