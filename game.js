let c = document.getElementById("canvas");
let context = c.getContext("2d");
const bird = new Bird();

let birds = [];
let saveitems = [];
let height = 400;
let width = 400;
let population = 500;
tf.setBackend("cpu");
let popu = function () {
  for (let index = 0; index < population; index++) {
    birds[index] = new Bird();
  }
};
popu();
c.onclick = () => (birds[0].birdDY = 9);
let score = (bestScore = 0);
let interval = (birdSize = pipeWidth = topPipeBottomY = 50);
let birdY = (pipeGap = 200);
let canvasSize = (pipeX = 400);
let total = 0;

let main = (show = false) => {
  if (show) {
    context.clearRect(0, 0, c.width, c.height);
  }
  //   bird.update();
  if (show) {
    context.fillStyle = "green";
  }
  pipeX -= 8; // Move pipe
  pipeX < -pipeWidth && // Pipe off screen?
    ((pipeX = canvasSize), (topPipeBottomY = pipeGap * Math.random())); // Reset pipe and randomize gap.
  bestScore = bestScore < score ? score : bestScore; // New best score?
  if (show) {
    context.fillRect(pipeX, 0, pipeWidth, topPipeBottomY); // Draw top pipe
    context.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSize); // Draw bottom pi

    context.fillText(score++, 9, 25); // Increase and draw score

    context.fillText(`Best: ${bestScore}`, 9, 50); // Draw best sco
    context.fillText(`Vivos: ${total}`, 9, 60); // Draw best sco
    context.fillText(`Generation: ${gene}`, 9, 70); // Draw best sco
  }

  birds.forEach((bird, i) => {
    bird.update();
    bird.think(topPipeBottomY, pipeWidth, pipeGap);
    let wallCol =
      bird.birdY < topPipeBottomY || bird.birdY > topPipeBottomY + pipeGap;
    let wallB = pipeX < bird.birdSize * (524 / 374);

    (wallCol && wallB) || // Bird hit pipe?
      bird.birdY > canvasSize; // Bird falls off screen // Bird died

    if ((wallCol && wallB) || bird.birdY > canvasSize) {
      saveitems.push(birds.splice(i, 1));
    }
  });
  if (birds.length == 0) {
    console.log("Game Over");
    nextGeneration();
    birds.forEach((bird) => {
      bird.birdDY = 0;
      bird.birdY = 200;
      pipeX = canvasSize;
      score = 0;
    });
  } else {
    if (show) {
      birds.sort((a, b) => a.score + b.score)[0].draw(context);
    }
  }

  total = birds.length;
};
let show = false;
setInterval(() => {
  main(show);
  if (gene == 1) show = true;
}, 1000 / 60);
