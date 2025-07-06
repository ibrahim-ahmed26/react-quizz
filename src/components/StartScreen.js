import { useQuiz } from "../context/QuizContext";

export default function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2 className="typing-subtitle">Welcome to the React Quiz!</h2>
      <h3 className="fade-in-delayed fade-in-delayed-1">
        {numQuestions} questions to test your React Mastery
      </h3>
      <button
        className="btn btn-ui fade-in-delayed fade-in-delayed-2"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
