function basic(event){
  // party 
  confetti({
    angle: 120,
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: .95, x: .95}
  });
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}