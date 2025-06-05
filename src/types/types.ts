import { TIMER_MODE } from '@/components/timer/timerConfig';
import type { ComponentType, SVGProps } from 'react';

// Timer Config Keys
export type TimerModeKey = keyof typeof TIMER_MODE;

// Control Buttons
export type Control = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  action: () => void;
};

export type Settings = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  interval: number;
  autorun: boolean;
};
