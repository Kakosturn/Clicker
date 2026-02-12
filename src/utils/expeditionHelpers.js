export function keyboardMovements(e, setPlayerPos) {
  e.preventDefault();
  if (e.key === "ArrowRight") {
    setPlayerPos((prev) => {
      return { ...prev, col: prev.col + 1 };
    });
  }
  if (e.key === "ArrowLeft") {
    setPlayerPos((prev) => {
      return { ...prev, col: prev.col - 1 };
    });
  }
  if (e.key === "ArrowDown") {
    setPlayerPos((prev) => {
      return { ...prev, row: prev.row + 1 };
    });
  }
  if (e.key === "ArrowUp") {
    setPlayerPos((prev) => {
      return { ...prev, row: prev.row - 1 };
    });
  }
}
