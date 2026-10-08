let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function playCorrectBeep() {
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1100, c.currentTime + 0.06);
    gain.gain.setValueAtTime(0.12, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.18);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.18);
  } catch {}
}

export function playVictory() {
  try {
    const c = getCtx();
    const gain = c.createGain();
    gain.connect(c.destination);
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = c.createOscillator();
      osc.connect(gain);
      osc.type = "sine";
      const t = c.currentTime + i * 0.08;
      osc.frequency.setValueAtTime(freq, t);
      osc.start(t);
      osc.stop(t + 0.35);
    });
    gain.gain.setValueAtTime(0.0, c.currentTime);
    gain.gain.linearRampToValueAtTime(0.13, c.currentTime + 0.04);
    gain.gain.setValueAtTime(0.13, c.currentTime + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.55);
  } catch {}
}
