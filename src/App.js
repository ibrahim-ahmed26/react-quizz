import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Quesiton from "./Question.js";
const initalState = { questions: [], status: "loading", index: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, status: "Error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error("Action Unknown");
  }
}
export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initalState
  );
  const numQuestions = questions.length;
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

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && <Quesiton questions={questions[index]} />}
      </Main>
    </div>
  );
}
