function changeGame(version) {
  const gameFrame = document.getElementById("game-frame");

  const gamePaths = {
    lesson: "./kazuate-lesson.html",
    self: "./kazuate-self.html",
    ai: "./kazuate-ai.html"
  };

  gameFrame.src = gamePaths[version];
}