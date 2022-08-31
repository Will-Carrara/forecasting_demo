function basic(){
  confetti({
    angle: 90,
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.8 }
  });
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}