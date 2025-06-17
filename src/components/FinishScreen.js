export default function FinishScreen({
  points,
  totalPoints,
  highScore,
  dispatch,
}) {
  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🏆";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "👍";
  else if (percentage > 0) emoji = "🤔";
  else emoji = "😢";
  return (
    <>
      <p className="result">
        {emoji} you Scored {points} out of {totalPoints} (
        {Math.ceil(percentage)}
        %)
      </p>
      <p className="highscore">Your High Score Is {highScore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
