import { QuizProvider } from "../context/QuizContext";
import QuizContent from "./QuizContent";

export default function App() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
}
