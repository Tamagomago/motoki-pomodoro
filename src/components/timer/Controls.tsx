import { Button } from '@/components/ui/button';
import type { ComponentType, SVGProps } from 'react';

type ControlsProps = {
  controls: Control[];
};

type Control = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  action: () => void;
};

function Controls({ controls }: ControlsProps) {
  return (
    <div className={'flex justify-center gap-2'}>
      {controls.map(({ icon: Icon, action }, i) => (
        <Button
          key={i}
          variant={'ghost'}
          className={'btn h-16 w-16'}
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
