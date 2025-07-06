import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

export default function Quesiton() {
  const { questions, index } = useQuiz();
  const currentQuestion = questions[index];
  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <Options />
    </div>
  );
}
