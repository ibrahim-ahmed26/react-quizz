import { useQuiz } from "../context/QuizContext";

export default function Options() {
  const { questions, dispatch, answer, index } = useQuiz();
  const hasAnswered = answer !== null;
  const currentQuestion = questions[index];
  return (
    <div className="options">
      {currentQuestion.options.map((option, index) => (
        <button
          className={`btn btn-option fade-in-delayed fade-in-delayed-1 ${
            index === answer ? "answer" : ""
          } ${
            hasAnswered
              ? index === currentQuestion.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
