function changeGame(version) {
  const gameFrame = document.getElementById("game-frame");

  const gamePaths = {
    lesson: "./lack-number-search-lesson.html",
    self: "./lack-number-search-self.html",
    ai: "./lack-number-search-ai.html"
  };

  gameFrame.src = gamePaths[version];
}