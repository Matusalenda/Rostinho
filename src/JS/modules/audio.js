const sounds = {
  error: new Audio("src/audio/error.wav"),
  scan: new Audio("src/audio/scan.wav"),
  successSound: new Audio("src/audio/success.wav"),
};

function playSound(sound) {
  try {
    sound.currentTime = 0;
    void sound.play();
  } catch (error) {
    console.warn("Nao foi possivel tocar o som:", error);
  }
}

export function playErrorSound() {
  playSound(sounds.error);
}

export function playScanSound() {
  playSound(sounds.scan);
}

export function playSuccessSound() {
  playSound(sounds.successSound);
}
