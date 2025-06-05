import { useCallback, useEffect, useState } from 'react';
import { TIMER_MODE } from '@/components/timer/timerConfig';
import type { Settings } from '@/types/types';
import type { TimerModeKey } from '@/types/types';

type TimerState = {
  activeMode: TimerModeKey;
  timerLeft: number;
  isRunning: boolean;
  longBreakInterval: number;
  completedPomodoros: number;
};

function useTimer() {
  // Initial state
  const [state, setState] = useState<TimerState>({
    activeMode: 'Pomodoro',
    timerLeft: TIMER_MODE['Pomodoro'].duration,
    isRunning: false,
    longBreakInterval: 4,
    completedPomodoros: 0,
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
      completedPomodoros: 0,
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
    setState((prev) => nextTimer(prev));
  }, []);

  const nextTimer = useCallback((prev: TimerState) => {
    let nextMode: TimerModeKey;
    let newCompletedPomodoros = prev.completedPomodoros;

    if (prev.activeMode === 'Pomodoro') {
      newCompletedPomodoros = prev.completedPomodoros + 1;
      nextMode =
        newCompletedPomodoros % prev.longBreakInterval === 0
          ? 'LongBreak'
          : 'ShortBreak';
    } else {
      nextMode = 'Pomodoro';
    }

    return {
      ...prev,
      isRunning: false,
      completedPomodoros: newCompletedPomodoros,
      activeMode: nextMode,
      timerLeft: TIMER_MODE[nextMode].duration,
    };
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

    const interval = setInterval(() => {
      setState((prev) => {
        const newTimeLeft = prev.timerLeft - 1;

        if (newTimeLeft <= 0) {
          return nextTimer(prev);
        }
        return {
          ...prev,
          timerLeft: newTimeLeft,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, nextTimer]);

  // Manual mode selection
  const selectMode = useCallback((mode: TimerModeKey) => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      activeMode: mode,
      timerLeft: TIMER_MODE[mode].duration,
    }));
  }, []);

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
