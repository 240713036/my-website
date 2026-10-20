function changeGame(version) {
  const gameFrame = document.getElementById("game-frame");

  const gamePaths = {
    lesson: "./mapEdit-lesson.html",
    self: "./mapEdit-self.html",
    ai: "./mapEdits-ai.html"
  };

  gameFrame.src = gamePaths[version];
}