/**
 * Procedural Web Audio API Sound Engine for Hacktoberfest Hack Day (Jaunpur × PIT)
 * Melodic cyber-ambient BGM, high-tech UI clicks, futuristic chimes, and warp transitions.
 * By default OFF (muted) per user request, user can toggle ON at any time.
 * Zero external audio downloads needed, 100% offline & instantaneous.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // By default OFF
  private masterGain: GainNode | null = null;
  private bgmInterval: NodeJS.Timeout | null = null;
  private isBgmPlaying: boolean = false;

  constructor() {}

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.15, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.initContext();
    const next = !this.isMuted;
    this.setMuted(next);
    return next;
  }

  /**
   * Cyber Lounge / Lo-Fi Hackathon Synth Soundtrack (Procedural)
   * Plays a progression: Am7 -> Fmaj7 -> Cmaj7 -> Gsus4 with soft filter sweep
   */
  public startAmbient() {
    this.initContext();
    if (!this.ctx || this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    const chords = [
      [220, 261.63, 329.63, 392], // Am7
      [174.61, 220, 261.63, 329.63], // Fmaj7
      [130.81, 164.81, 196, 246.94], // Cmaj7
      [196, 246.94, 293.66, 392], // G
    ];

    let chordIndex = 0;

    const playChordStep = () => {
      if (this.isMuted || !this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const currentChord = chords[chordIndex % chords.length];
      chordIndex++;

      currentChord.forEach((freq, idx) => {
        try {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          const filter = this.ctx!.createBiquadFilter();

          osc.type = idx === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(350 + idx * 80, now);
          filter.frequency.exponentialRampToValueAtTime(700 + idx * 120, now + 1.8);
          filter.frequency.exponentialRampToValueAtTime(320 + idx * 60, now + 3.8);

          // Gentle ambient envelope
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.045, now + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 3.9);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain!);

          osc.start(now);
          osc.stop(now + 4.0);
        } catch {}
      });
    };

    playChordStep();
    this.bgmInterval = setInterval(playChordStep, 4000);
  }

  /**
   * Crisp digital synthesizer tone for UI achievements
   */
  public playTempleBell(pitchMultiplier = 1.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const baseFreq = 520 * pitchMultiplier;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.6);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.7);
  }

  /**
   * Subtle modern UI click
   */
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }
}

export const soundEngine = new SoundEngine();
