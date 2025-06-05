import { Button } from '@/components/ui/button';
import type { Control } from '@/types/types';

type ControlsProps = {
  controls: Control[];
};

function Controls({ controls }: ControlsProps) {
  return (
    <div className={'flex justify-center gap-2'}>
      {controls.map(({ icon: Icon, action }, i) => (
        <Button
          key={i}
          variant={'ghost'}
          className="btn h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16"
          onClick={action}
        >
          <Icon
            className={'text-white/50'}
            style={{ width: '100%', height: '100%' }}
          />
        </Button>
      ))}
    </div>
  );
}

export default Controls;
