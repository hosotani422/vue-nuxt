import ok from '@/assets/sound/ok.mp3';
import cancel from '@/assets/sound/cancel.mp3';
import warn from '@/assets/sound/warn.mp3';

export default class Sound {
  private static audio = {
    ok: new Audio(ok),
    cancel: new Audio(cancel),
    warn: new Audio(warn),
  };
  public static play(type: keyof typeof Sound.audio): void {
    this.audio[type].play();
  }
  public static volume(volume: number): void {
    for (const audio of Object.values(this.audio)) {
      audio.volume = volume;
    }
  }
}
