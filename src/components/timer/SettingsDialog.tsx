import type { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Settings } from '@/types/types';

type SettingsDialogProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  handleSettingsUpdate: ({
    pomodoro,
    shortBreak,
    longBreak,
    interval,
  }: Settings) => void;
};

function SettingsDialog({
  open,
  onOpenChange,
  handleSettingsUpdate,
}: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={'dialog'}>
        <DialogHeader>
          <DialogTitle>Modify Timer</DialogTitle>
          <DialogDescription>
            Make changes to the Pomodoro Timer here. Enter duration in minutes.
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Submitting...');
            const formData = new FormData(e.currentTarget);
            handleSettingsUpdate({
              pomodoro: Number(formData.get('Pomodoro')),
              shortBreak: Number(formData.get('ShortBreak')),
              longBreak: Number(formData.get('LongBreak')),
              interval: Number(formData.get('Interval')),
              autorun: formData.get('AutoRun') === 'on',
            });
            const autorun = formData.get('AutoRun') === 'on';
            console.log('Checkbox checked?', autorun);
            onOpenChange(false);
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="grid gap-2">
              <Label>Pomodoro Duration</Label>
              <Input
                id="Pomodoro"
                name="Pomodoro"
                defaultValue="25"
                className={'input'}
                type={'number'}
                step={'any'}
              />
            </div>
            <div className="grid gap-2">
              <Label>Short Break Duration</Label>
              <Input
                id="ShortBreak"
                name="ShortBreak"
                defaultValue="5"
                className={'input'}
                type={'number'}
                step={'any'}
              />
            </div>
            <div className="grid gap-2">
              <Label>Long Break Duration</Label>
              <Input
                id="LongBreak"
                name="LongBreak"
                defaultValue="15"
                className={'input'}
                type={'number'}
                step={'any'}
              />
            </div>
            <div className="grid gap-2">
              <Label>Long Break Interval</Label>
              <Input
                id="Interval"
                name="Interval"
                defaultValue="4"
                className={'input'}
                type={'number'}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="AutoRun"
                name="AutoRun"
                className={
                  'border-white/50 data-[state=checked]:bg-white/50 data-[state=checked]:border-white/50 data-[state=checked]:text-white'
                }
              />
              <Label htmlFor="AutoRun">Auto Run Timer</Label>
            </div>
          </div>
          <DialogFooter className={'mt-4'}>
            <DialogClose asChild>
              <Button variant="ghost" className={'btn'}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className={'bg-white/10 btn'}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
