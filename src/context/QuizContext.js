import { createContext, useContext, useEffect, useReducer } from "react";
const QuizContext = createContext();
const initalState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: Number(localStorage.getItem("highScore")),
  secondsRemaining: null,
};
function QuizProvider({ children }) {
  const SEC_PER_QUESTION = 30;
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataError":
        return { ...state, status: "Error" };
      case "start":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * SEC_PER_QUESTION,
        };
      case "newAnswer":
        const questions = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === questions.correctOption
              ? state.points + questions.points
              : state.points,
        };
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "finished":
        return {
          ...state,
          status: "finished",
          highScore:
            state.points > state.highScore ? state.points : state.highScore,
        };
      case "restart":
        return { ...state, status: "ready", answer: null, index: 0, points: 0 };
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
        };
      default:
        throw new Error("Action Unknown");
    }
  }
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initalState);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (perv, current) => perv + current.points,
    0
  );
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const result = await fetch("http://localhost:8000/questions");
        if (!result.ok) {
          console.error("Response is not ok");
          return;
        }
        const data = await result.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataError", payload: err.message });
      }
    }

    fetchQuestions();
  }, []);
  useEffect(() => {
    localStorage.setItem("highScore", highScore);
  }, [highScore]);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("There An Error Using The Provider");
  return context;
}
export { QuizProvider, useQuiz };
