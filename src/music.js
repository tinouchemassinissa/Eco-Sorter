export let audioCtx;
let oscillators = [];
export let isPlaying = false;
let timeoutId = null;

export const playBackgroundMusic = () => {
  if (isPlaying) return;
  
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  
  const chords = [
    [261.63, 329.63, 392.00], // C4, E4, G4 (C major)
    [220.00, 261.63, 329.63], // A3, C4, E4 (A minor)
    [174.61, 220.00, 261.63], // F3, A3, C4 (F major)
    [196.00, 246.94, 293.66], // G3, B3, D4 (G major)
  ];
  
  let currentChord = 0;
  isPlaying = true;
  
  const playNextChord = () => {
    if (!isPlaying) return;
    const now = audioCtx.currentTime;
    
    chords[currentChord].forEach((freq) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      // Use a triangle wave for a softer, warmer, "classic" ambient sound
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      // Connect through gain to destination
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      // Soft ambient fade in and fade out (Douce / Gentle)
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 2); // Slow attack
      gain.gain.linearRampToValueAtTime(0, now + 6);    // Slow release
      
      osc.start(now);
      osc.stop(now + 6);
      oscillators.push(osc);
      
      // Cleanup old oscillators to save memory
      osc.onended = () => {
        oscillators = oscillators.filter(o => o !== osc);
      };
    });
    
    currentChord = (currentChord + 1) % chords.length;
    timeoutId = setTimeout(playNextChord, 4000); // Play next chord every 4 seconds
  };
  
  playNextChord();
};

export const stopBackgroundMusic = () => {
  isPlaying = false;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  oscillators.forEach(osc => {
    try { 
      // Ramp down quickly to avoid clicking
      // osc.stop(); 
      // Actually we just let them fade out naturally or stop them safely
    } catch(e) {}
  });
  
  if (audioCtx) {
    audioCtx.suspend(); // Best way to instantly silence Web Audio
  }
};
