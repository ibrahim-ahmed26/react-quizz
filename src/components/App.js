import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Quesiton from "./Question.js";
import NextButton from "./NextButton.js";
import Progress from "./progress.js";
import FinishScreen from "./FinishScreen.js";
import Timer from "./Timer.js";
import Footer from "./Footer.js";
const initalState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: Number(localStorage.getItem("highScore")),
  secondsRemaining: null,
};
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
export default function App() {
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
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              totalPoints={totalPoints}
              points={points}
              index={index}
              answer={answer}
            />
            <Quesiton
              questions={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
