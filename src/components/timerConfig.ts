export const TIMER_MODE = {
  Pomodoro: {
    label: 'Pomodoro',
    duration: 1500, // 25 minutes
  },
  ShortBreak: {
    label: 'Short Break',
    duration: 300, // 5 minutes
  },
  LongBreak: {
    label: 'Long Break',
    duration: 900, // 15 minutes
  },
} as const;
