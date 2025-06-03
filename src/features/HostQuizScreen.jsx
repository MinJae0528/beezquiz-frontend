import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoImage from "../assets/img/BeezQuiz.svg";
import bgbgbg from "../assets/img/quizbgbgbg.svg";
import socket from "../socket";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function HostQuizScreen() {
  const navigate = useNavigate();
  const { roomId: roomCode } = useParams();

  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    if (!roomCode || !API_BASE_URL) return;

    fetch(`${API_BASE_URL}/room/${roomCode}/questions`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ 응답이 { questions: [...] } 형태일 경우
        if (Array.isArray(data.questions)) {
          setQuizList(data.questions);
        } else {
          console.error("문제 형식이 올바르지 않습니다:", data);
          setQuizList([]);
        }
      });

    socket.on("submit-count", (count) => {
      setSubmitCount(count);
    });

    return () => {
      socket.off("submit-count");
    };
  }, [roomCode]);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < quizList.length) {
      setCurrentIndex(nextIndex);
      socket.emit("next-question", { roomCode, nextIndex });
    } else {
      socket.emit("quiz-finished", roomCode);
      navigate(`/result/${roomCode}`);
    }
  };

  const currentQuiz = quizList[currentIndex];

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-start pt-20">
      <div className="absolute top-4 left-4">
        <img src={logoImage} alt="Beez Quiz" className="w-24" />
      </div>

      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-40 text-white px-4 py-2 rounded text-xl">
        {quizList.length > 0
          ? `${currentIndex + 1} / ${quizList.length}`
          : "문제를 불러오는 중..."}
      </div>

      <div className="absolute top-6 right-6 bg-black bg-opacity-40 text-white px-4 py-2 rounded text-lg">
        제출: {submitCount}명
      </div>

      <div
        className="flex justify-center items-center w-[1000px] h-[500px] rounded-lg mt-20"
        style={{ backgroundImage: `url(${bgbgbg})` }}
      >
        <div className="w-[740px] h-[320px] text-3xl text-black text-center">
          {currentQuiz ? currentQuiz.question : "문제를 불러오는 중..."}
        </div>
      </div>

      {quizList.length > 0 && (
        <button
          onClick={handleNext}
          className="mt-10 py-3 px-8 bg-yellow-400 rounded-lg text-xl font-semibold"
        >
          {currentIndex === quizList.length - 1
            ? "결과 확인하기"
            : "다음 문제"}
        </button>
      )}
    </div>
  );
}