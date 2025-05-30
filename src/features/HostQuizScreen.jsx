import logoImage from "../assets/img/BeezQuiz.svg";
import { useEffect, useState } from "react";
import bgbgbg from "../assets/img/quizbgbgbg.svg";
import { useNavigate, useParams } from "react-router-dom";

export default function HostQuizScreen() {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetch(
      `https://beezquiz-f7gpc0fefpfzaph6.koreasouth-01.azurewebsites.net/rooms/${roomId}/quiz`
    )
      .then((res) => res.json())
      .then((data) => {
        setQuizList(data.questions || []);
      });
  }, [roomId]);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < quizList.length) {
      setCurrentIndex(nextIndex);
      setAnswer("");
    } else {
      navigate(`/host/result/${roomId}`); // 결과 페이지로 이동
    }
  };

  const currentQuiz = quizList[currentIndex];

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <img
        src={logoImage}
        alt="Beez Quiz"
        className="absolute top-4 left-4 w-24 select-none pointer-events-none"
      />

      <div>
        <button className="absolute top-4 right-5 w-[64px] h-[56px] bg-white rounded-lg ">
          다음
        </button>
      </div>
      <div className="flex flex-col">
        <div
          className="flex justify-center items-center w-[1000px] h-[500px] rounded-lg"
          style={{ backgroundImage: `url(${bgbgbg})` }}
        >
          <div className="w-[740px] h-[320px]">
            <p className="text-black text-3xl">
              {currentQuiz ? currentQuiz.question : "문제를 불러오는 중..."}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-[24px]">
          <p className="font-nunito font-semibold text-3xl mr-[12px]">정답 :</p>
          <input
            className="w-[800px] h-[72px] text-2xl px-4 border"
            value={answer || ""}
            placeholder="정답을 기다리는 중..."
            readOnly
          />
        </div>

        {quizList.length > 0 && (
          <button
            onClick={handleNext}
            className="mt-6 py-3 px-8 bg-yellow-400 rounded-lg text-xl"
          >
            {currentIndex === quizList.length - 1
              ? "결과 확인하기"
              : "다음 문제"}
          </button>
        )}
      </div>
    </div>
  );
}
