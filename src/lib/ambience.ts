/** Original synthesis for this fan site. No copyrighted audio assets. */
export class Ambience {
  private context: AudioContext;
  private output: GainNode;
  private rainGain: GainNode;
  private timer: ReturnType<typeof setInterval> | null = null;
  private volume: number;
  constructor(volume: number) {
    this.context = new AudioContext(); this.volume = volume;
    this.output = this.context.createGain(); this.output.gain.value = volume * .35; this.output.connect(this.context.destination);
    this.rainGain = this.context.createGain(); this.rainGain.gain.value = 0; this.rainGain.connect(this.output);
    const buffer = this.context.createBuffer(1, this.context.sampleRate * 3, this.context.sampleRate);
    const samples = buffer.getChannelData(0); let last = 0;
    for (let i = 0; i < samples.length; i++) { last = (last + (Math.random() * 2 - 1) * .025) / 1.025; samples[i] = last * 4; }
    const rain = this.context.createBufferSource(); rain.buffer = buffer; rain.loop = true;
    const filter = this.context.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1800;
    rain.connect(filter); filter.connect(this.rainGain); rain.start();
  }
  setVolume(value: number) { this.volume = value; this.output.gain.setTargetAtTime(value * .35, this.context.currentTime, .1); }
  setRain(enabled: boolean) { this.rainGain.gain.setTargetAtTime(enabled ? .7 : 0, this.context.currentTime, .4); }
  async note(frequency: number, offset = 0) {
    if (this.context.state === 'closed') return;
    await this.context.resume();
    const when = this.context.currentTime + offset;
    for (const [multiplier, level] of [[1, .5], [2, .11], [3, .035]]) {
      const oscillator = this.context.createOscillator(); oscillator.type = 'sine'; oscillator.frequency.value = frequency * multiplier;
      const envelope = this.context.createGain(); envelope.gain.setValueAtTime(.0001, when); envelope.gain.exponentialRampToValueAtTime(level, when + .02); envelope.gain.exponentialRampToValueAtTime(.0001, when + 2.7);
      oscillator.connect(envelope); envelope.connect(this.output); oscillator.start(when); oscillator.stop(when + 3);
      oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
    }
  }
  async start(rain: boolean) {
    await this.context.resume(); this.setVolume(this.volume); this.setRain(rain);
    const phrase = () => [261.63, 392, 329.63, 440, 293.66, 392].forEach((frequency, i) => void this.note(frequency, i * .72));
    phrase(); this.timer = setInterval(phrase, 5600);
  }
  stop() { if (this.timer) clearInterval(this.timer); this.timer = null; if (this.context.state !== 'closed') void this.context.close(); }
}
