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
import { useQuiz } from "../context/QuizContext.js";
export default function QuizContent() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Quesiton />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
