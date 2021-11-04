let gene = 1;
function nextGeneration() {
  gene++;
  console.log("geração ", gene);
  // console.log('generation', gene, 'next generation', gene + 1);

  calculateFitness();
  for (let i = 0; i < population; i++) {
    // console.log(saveitems[i]);
    birds[i] = pickOne();
  }
  for (let i = 0; i < population; i++) {
    saveitems[i][0].dispose();
  }
  saveitems = [];
  birds.sort((e) => e.score)[0].save("localstorage://my-model-1");
}

function pickOne() {
  let index = 0;
  let r = Math.random(1);
  //   console.log(saveitems);
  while (r > 0) {
    // console.log(saveitems[index]);
    r = r - saveitems[index][0].fitness;
    index++;
  }
  index--;
  let bird = saveitems[index][0];
  // console.log(bird);
  let child = new Bird(bird.brain);
  child.fitness = bird.fitness ? bird.fitness : 0;
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bird of saveitems) {
    let b = bird[0].score;

    sum += b;
  }
  for (let bird of saveitems) {
    bird[0].fitness = bird[0].score / sum;
    // console.log(bird[0].fitness, bird[0].score, sum);
  }
}
