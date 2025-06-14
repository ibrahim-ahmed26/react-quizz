import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
const initalState = { questions: [], status: "loading" };
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, status: "Error" };
    default:
      throw new Error("Action Unknown");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initalState);
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
      <Main>{state.questions}</Main>
    </div>
  );
}
