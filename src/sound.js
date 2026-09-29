// Simple Web Audio API synthesizer for game sounds without needing external assets
const AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx;

const initAudio = () => {
  if (!ctx) {
    ctx = new AudioContext();
  }
};

export const playPop = () => {
  initAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
  
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
};

export const playBuzzer = () => {
  initAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
  
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
};

export const playTap = () => {
  initAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
};

export const playPowerUp = () => {
  initAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'square';
  
  // Arpeggio effect
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1);
  osc.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
  osc.frequency.setValueAtTime(1200, ctx.currentTime + 0.3);
  
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.5);
};
