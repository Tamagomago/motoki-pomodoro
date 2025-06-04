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
import SettingsDialog from '@/components/SettingsDialog';

interface ControlButton {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  action: () => void;
}

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

  const controls: ControlButton[] = [
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
