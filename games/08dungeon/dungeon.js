function changeGame(version) {
  const gameFrame = document.getElementById("game-frame");

  const gamePaths = {
    lesson: "./dungeon-lesson.html",
    self: "./dungeon-self.html",
    ai: "./dungeon-ai.html"
  };

  gameFrame.src = gamePaths[version];
}