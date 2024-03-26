import ok from "@/assets/sound/ok.mp3";
import cancel from "@/assets/sound/cancel.mp3";
import warn from "@/assets/sound/warn.mp3";

export default class Sound {
  private static audio: { [K in `ok` | `cancel` | `warn`]: HTMLAudioElement | null } = {
    ok: null,
    cancel: null,
    warn: null,
  };
  static {
    if (process.client) {
      this.audio.ok = new Audio(ok);
      this.audio.cancel = new Audio(cancel);
      this.audio.warn = new Audio(warn);
    }
  }
  public static play(type: keyof typeof Sound.audio): void {
    this.audio[type]?.play();
  }
  public static volume(volume: number): void {
    for (const audio of Object.values(this.audio)) {
      if (audio) {
        audio.volume = volume;
      }
    }
  }
}
