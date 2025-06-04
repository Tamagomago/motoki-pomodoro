import { useCallback, useEffect, useState } from 'react';
import { TIMER_MODE } from '@/components/timer/timerConfig';

type TimerModeKey = keyof typeof TIMER_MODE;

interface TimerState {
  activeMode: TimerModeKey;
  timerLeft: number;
  isRunning: boolean;
  cycleCount: number;
  longBreakInterval: number;
}

export interface Settings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  interval: number;
}

function useTimer() {
  // Initial state
  const [state, setState] = useState<TimerState>({
    activeMode: 'Pomodoro',
    timerLeft: TIMER_MODE['Pomodoro'].duration,
    isRunning: false,
    cycleCount: 1,
    longBreakInterval: 4,
  });

  const handleSettingsUpdate = ({
    pomodoro,
    shortBreak,
    longBreak,
    interval,
  }: Settings) => {
    TIMER_MODE['Pomodoro'].duration = pomodoro * 60;
    TIMER_MODE['ShortBreak'].duration = shortBreak * 60;
    TIMER_MODE['LongBreak'].duration = longBreak * 60;
    setState((prev) => ({
      ...prev,
      cycleCount: 1,
      longBreakInterval: Math.floor(interval),
    }));
    resetTimer();
  };

  // Timer control functions
  const resetTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      timerLeft: TIMER_MODE[prev.activeMode].duration,
    }));
  }, []);

  const toggleTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));
  }, []);

  const skipTimer = useCallback(() => {
    const nextCount = state.cycleCount + 1;
    const nextMode: TimerModeKey =
      nextCount % state.longBreakInterval === 0
        ? 'LongBreak'
        : nextCount % 2 === 0
          ? 'ShortBreak'
          : 'Pomodoro';

    setState((prev) => ({
      ...prev,
      isRunning: false,
      cycleCount: nextCount,
      activeMode: nextMode,
      timerLeft: TIMER_MODE[nextMode].duration,
    }));
  }, [state.cycleCount]);

  // Determine next timer mode based on cycle count
  const nextTimer = useCallback((nextCycle: number) => {
    const nextMode: TimerModeKey =
      nextCycle % state.longBreakInterval === 0
        ? 'LongBreak'
        : nextCycle % 2 === 0
          ? 'ShortBreak'
          : 'Pomodoro';

    setState((prev) => ({
      ...prev,
      activeMode: nextMode,
      timerLeft: TIMER_MODE[nextMode].duration,
    }));
  }, []);

  // Manual mode selection
  const selectMode = useCallback((mode: TimerModeKey) => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      activeMode: mode,
      timerLeft: TIMER_MODE[mode].duration,
    }));
  }, []);

  // Format timer display (MM:SS)
  const formatTimer = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (!state.isRunning) return;

    if (state.timerLeft <= 0) {
      setState((prev) => {
        const nextCount = prev.cycleCount + 1;
        nextTimer(nextCount);
        return { ...prev, cycleCount: nextCount };
      });
      return;
    }

    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        timerLeft: prev.timerLeft - 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, state.timerLeft, nextTimer]);

  return {
    activeMode: state.activeMode,
    timerLeft: state.timerLeft,
    isRunning: state.isRunning,
    resetTimer,
    toggleTimer,
    skipTimer,
    formatTimer,
    selectedMode: selectMode,
    handleSettingsUpdate,
  };
}

export default useTimer;
