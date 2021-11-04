class Bird {
  constructor(brain) {
    this.bird = new Image();
    this.bird.src = "./images/bird.png";
    this.birdX = this.birdDY = this.score = this.bestScore = 0;
    this.interval = this.birdSize = this.pipeWidth = this.topPipeBottomY = 24;
    this.birdY = this.pipeGap = 200;
    this.canvasSize = this.pipeX = 400;
    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetWorks(5, 16, 2);
    }
  }
  save(path) {
    this.brain.model.save(path);
  }
  jump() {
    this.birdDY = 9;
    return this;
  }

  draw(ctx) {
    ctx.drawImage(
      this.bird,
      this.birdX,
      this.birdY,
      this.birdSize * (524 / 374),
      this.birdSize
    ); // Draw bird
  }
  update() {
    this.birdY -= this.birdDY -= 0.5; // Gravity
    this.score += 1;
  }
  mutate() {
    this.brain.mutate(0.1);
  }
  dispose() {
    this.brain.model.dispose();
  }
  think(topPipeBottomY, pipeWidth, pipeGap) {
    // let fuitPos = this.getNearFruit()
    // console.log(fuitPos);
    // this.nearFruit = fuitPos
    let inputs = [];
    inputs[0] = this.birdX / height;
    inputs[1] = this.birdY / width;
    inputs[2] = pipeGap / 200;
    inputs[3] = pipeWidth / 400;
    inputs[4] = topPipeBottomY / 400;
    // inputs[5] = this.bottomPipe.y / height;
    // inputs[6] = this.topPipe.y / height;

    // console.log(inputs);
    let ouput = this.brain.predict(inputs);
    // console.log(ouput);
    if (ouput[0] < ouput[1]) {
      this.jump();
    }
  }
}
