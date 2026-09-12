/**
 * sound.ts
 *
 * Ultra-lightweight, zero-dependency Web Audio synthesizer for delightful UI micro-interactions.
 * Synthesizes tailored, pleasing acoustic clicks & chimes without external audio assets.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

/**
 * Play a satisfying tactile micro-sound when switching themes:
 * - "light": Crisp, bright, ascending chime pop (radiant, cheerful)
 * - "dark": Warm, velvety, descending soft "thock" (calm, cozy)
 */
export function playThemeSound(mode: "light" | "dark") {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (mode === "light") {
      // --- SUN CHIME: Radiant, crisp upward acoustic pop ---
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      osc1.type = "sine";
      // Rise smoothly from C5 (523Hz) to G5 (784Hz)
      osc1.frequency.setValueAtTime(520, now);
      osc1.frequency.exponentialRampToValueAtTime(800, now + 0.07);

      // Fast, smooth envelope (no popping click)
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.09, now + 0.012);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // High glass shimmer harmonic (E6 / 1318Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1040, now);
      osc2.frequency.exponentialRampToValueAtTime(1400, now + 0.06);

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.linearRampToValueAtTime(0.035, now + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.13);
      osc2.stop(now + 0.09);
    } else {
      // --- MOON THOCK: Warm, cozy, soft mechanical shutter ---
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      // Gentle downward pitch from ~380Hz to ~190Hz
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.08);

      // Lowpass filter removes any harsh digital harmonics
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(750, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.09);

      // Snappy, subtle envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch {
    // Fail-safe: audio will not interrupt execution if disabled by browser
  }
}
