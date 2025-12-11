class AudioManager {
  constructor() {
    this.audio = null;
    this.url = null;
  }

  async loadAudio(path) {
    const audioData = await window.api.loadAudio(path);
    const blob = new Blob([new Uint8Array(audioData)], {
      type: "audio/mpeg",
    });
    this.url = URL.createObjectURL(blob);
    this.audio = new Audio(this.url);
    return this.audio;
  }

  play() {
    if (this.audio) this.audio.play();
  }

  pause() {
    if (this.audio) this.audio.pause();
  }
}

export const audioManager = new AudioManager();
