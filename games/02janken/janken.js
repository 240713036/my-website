function changeGame(version) {
  const gameFrame = document.getElementById("game-frame");

  const gamePaths = {
    lesson: "./janken-lesson.html",
    self: "./janken-self.html",
    ai: "./janken-ai.html"
  };

  gameFrame.src = gamePaths[version];
}