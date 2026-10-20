function changeGame(version) {
  const gameFrame = document.getElementById("game-frame");

  const gamePaths = {
    lesson: "./dungeon2-lesson.html",
    self: "./dungeon2-self.html",
    ai: "./dungeon2-ai.html"
  };

  gameFrame.src = gamePaths[version];
}