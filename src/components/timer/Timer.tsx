/**
 * Main component that displays the Pomodoro timer, mode selector, and controls.
 */

import {
  ArrowPathIcon,
  ForwardIcon,
  PlayIcon,
  PauseIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import useTimer from '@/components/timer/hooks/useTimer';
import ModeSelector from '@/components/timer/ModeSelector';
import Controls from '@/components/timer/Controls';
import { useState } from 'react';
import SettingsDialog from '@/components/timer/SettingsDialog';
import type { Control } from '@/types/types';
import alarm from '@/assets/audio/alarm.mp3';
import bgMusic from '@/assets/audio/bg-music.mp3';
import useAudioPlayer from '@/components/timer/hooks/useAudioPlayer';

function Timer() {
  const {
    activeMode,
    timerLeft,
    isRunning,
    resetTimer,
    toggleTimer,
    skipTimer,
    formatTimer,
    selectedMode,
    handleSettingsUpdate,
  } = useTimer();

  const [showSettings, setShowSettings] = useState<boolean>(false);

  useAudioPlayer(bgMusic, isRunning, 0.3);
  useAudioPlayer(alarm, timerLeft <= 7, 1, (audio) => {
    audio.pause();
    audio.currentTime = 0;
  });

  const controls: Control[] = [
    { icon: ArrowPathIcon, action: resetTimer },
    { icon: isRunning ? PauseIcon : PlayIcon, action: toggleTimer },
    { icon: ForwardIcon, action: skipTimer },
    { icon: Cog6ToothIcon, action: () => setShowSettings(true) },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <ModeSelector activeMode={activeMode} selectedMode={selectedMode} />
      <h1
        className={
          'font-timer flex items-center justify-center py-2 text-9xl text-white/50'
        }
      >
        {formatTimer(timerLeft)}
      </h1>
      <Controls controls={controls} />
      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        handleSettingsUpdate={handleSettingsUpdate}
      />
    </div>
  );
}

export default Timer;
