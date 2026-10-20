function changeGame(version) {
  const gameFrame = document.getElementById("canvas-frame");

  const gamePaths = {
    lesson: "./canvas-lesson.html",
    self: "./canvas-self.html",
    ai: "./canvas-ai.html"
  };

  gameFrame.src = gamePaths[version];
}