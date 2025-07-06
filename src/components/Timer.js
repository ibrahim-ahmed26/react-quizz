import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
export default function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;
  useEffect(() => {
    if (secondsRemaining <= 0) {
      dispatch({ type: "finished" });
      return;
    }
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch, secondsRemaining]);
  return (
    <div className="timer">
      <p>
        {mins < 10 && "0"}
        {mins}:{sec < 10 && "0"}
        {sec}
      </p>
    </div>
  );
}
