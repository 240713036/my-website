function changeGame(version) {
  const gameFrame = document.getElementById("game-frame");

  const gamePaths = {
    lesson: "./dungeon3-lesson.html",
    self: "./dungeon3-self.html",
    ai: "./dungeon3-ai.html"
  };

  gameFrame.src = gamePaths[version];
}