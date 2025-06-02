/**
 * Main component that displays the Pomodoro timer, mode selector, and controls.
 */

import {
  ArrowPathIcon,
  ForwardIcon,
  PlayIcon,
  PauseIcon,
} from '@heroicons/react/24/solid';
import useTimer from '@/components/hooks/useTimer';
import ModeSelector from '@/components/timer/ModeSelector';
import Controls from '@/components/timer/Controls';

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
  } = useTimer();

  const controls: ControlButton[] = [
    { icon: ArrowPathIcon, action: resetTimer },
    { icon: isRunning ? PauseIcon : PlayIcon, action: toggleTimer },
    { icon: ForwardIcon, action: skipTimer },
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
    </div>
  );
}

export default Timer;
