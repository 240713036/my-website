function changeGame(version) {
  const gameFrame = document.getElementById("game-frame");

  const gamePaths = {
    lesson: "./tanakuji-lesson.html",
    self: "./tanakuji-self.html",
    ai: "./tanakuji-ai.html"
  };

  gameFrame.src = gamePaths[version];
}