import { TIMER_MODE } from '@/components/timer/timerConfig';
import { Button } from '@/components/ui/button';
import type { TimerModeKey } from '@/types/types';

type ModeProps = {
  activeMode: TimerModeKey;
  selectedMode: (mode: TimerModeKey) => void;
};

function ModeSelector({ activeMode, selectedMode }: ModeProps) {
  return (
    <div className={'flex justify-center gap-1'}>
      {Object.entries(TIMER_MODE).map(([key, mode]) => (
        <Button
          key={key}
          variant="ghost"
          className={`btn ${activeMode === key ? 'active' : ''}`}
          onClick={() => {
            selectedMode(key as TimerModeKey);
          }}
        >
          {mode.label}
        </Button>
      ))}
    </div>
  );
}

export default ModeSelector;
