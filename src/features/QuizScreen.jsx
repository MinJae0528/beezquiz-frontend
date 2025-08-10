import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../socket";
import logoImage from "../assets/img/BeezQuiz.svg";
import bgbgbg from "../assets/img/quizbgbgbg.svg";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

export default function StudentQuizScreen() {
  const { roomId } = useParams();
  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const answersRef = useRef([]);

  useEffect(() => {
    // 문제 불러오기
    fetch(`${API_BASE}/room/${roomId}/questions`)
      .then((res) => res.json())
      .then((data) => {
        const questions = (data.questions || []).map((q) => {
          // 백엔드에서 전달하는 필드명과 일치
          return {
            text: q.text || "", // 백엔드에서 text로 전달
            type: q.type || "subjective", // 백엔드에서 type으로 전달
            options: Array.isArray(q.options) ? q.options.filter((o) => o?.trim()) : [],
            correctAnswer: q.correctAnswer || "",
          };
        });

        console.log("[퀴즈 전체 데이터] quizList:", questions);
        setQuizList(questions);
        setHasSubmitted(new Array(questions.length).fill(false));
      })
      .catch((error) => {
        console.error("❌ 문제 불러오기 실패:", error);
      });

    socket.on("start-quiz", () => {
      setCurrentIndex(0);
    });

    socket.on("next-question", (nextIndex) => {
      setCurrentIndex(nextIndex);
      setAnswer("");
      setSelectedOption("");
      setIsSubmitting(false);
    });

    socket.on("quiz-finished", () => {
      fetch(`${API_BASE}/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomCode: roomId,
          nickname: localStorage.getItem("nickname") || "익명",
          answers: answersRef.current,
          role: "student",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(`제출 완료! 점수: ${data.score}`);
          navigate(`/result/${roomId}`);
        })
        .catch(() => {
          alert("결과 저장에 실패했지만 결과 페이지로 이동합니다.");
          navigate(`/result/${roomId}`);
        });
    });

    return () => {
      socket.off("start-quiz");
      socket.off("next-question");
      socket.off("quiz-finished");
    };
  }, [roomId, navigate]);

  const currentQuiz = quizList[currentIndex];
  const totalQuestions = quizList.length;
  
  // 문제 유형 판단 로직 수정 - 더 정확하게
  const hasOptions = currentQuiz?.options && Array.isArray(currentQuiz.options) && currentQuiz.options.length > 0;
  const isObjective = currentQuiz?.type === "objective" || hasOptions;
  const isSubjective = currentQuiz?.type === "subjective" || (!isObjective && !hasOptions);

  // 디버깅을 위한 상세 로그
  console.log("=== 문제 디버깅 정보 ===");
  console.log("현재 문제:", currentQuiz);
  console.log("문제 유형 (type):", currentQuiz?.type);
  console.log("옵션 배열:", currentQuiz?.options);
  console.log("옵션 개수:", currentQuiz?.options?.length || 0);
  console.log("hasOptions:", hasOptions);
  console.log("isObjective:", isObjective);
  console.log("isSubjective:", isSubjective);
  console.log("==========================");

  const handleSubmit = () => {
    if (hasSubmitted[currentIndex] || isSubmitting) return;
    const currentAnswer = isObjective ? selectedOption : answer;
    if (!currentAnswer.trim()) {
      alert("답변을 입력하거나 선택해주세요!");
      return;
    }
    setIsSubmitting(true);
    answersRef.current[currentIndex] = currentAnswer;
    socket.emit("submit-answer", {
      roomCode: roomId,
      questionIndex: currentIndex,
    });
    setHasSubmitted((prev) => {
      const updated = [...prev];
      updated[currentIndex] = true;
      return updated;
    });
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const handleOptionSelect = (optionIndex) => {
    if (hasSubmitted[currentIndex]) return;
    setSelectedOption((optionIndex + 1).toString()); // "1", "2", "3", "4"
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-start pt-20">
      <img
        src={logoImage}
        alt="Beez Quiz"
        className="absolute top-4 left-4 w-24"
      />

      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-40 text-white px-4 py-2 rounded text-xl">
        {totalQuestions > 0
          ? `${currentIndex + 1} / ${totalQuestions}`
          : "로딩 중..."}
      </div>

      <div className="absolute top-6 right-6 bg-black bg-opacity-40 text-white px-4 py-2 rounded text-lg">
        제출: {hasSubmitted[currentIndex] ? "O" : "X"}
      </div>

      <div
        className="flex justify-center items-center w-[1000px] h-[500px] rounded-lg mt-8"
        style={{ backgroundImage: `url(${bgbgbg})` }}
      >
        <div className="w-[740px] h-[320px] text-3xl text-[#ffffff] text-center flex items-center justify-center">
          {currentQuiz ? currentQuiz.text : "문제를 불러오는 중..."}
        </div>
      </div>

      {/* 객관식 옵션 표시 - 조건 수정 */}
      {isObjective && hasOptions && (
        <div className="mt-6 w-[1000px]">
          <div className="grid grid-cols-2 gap-4">
            {currentQuiz.options.map((option, idx) => {
              const optionKey = String.fromCharCode(65 + idx); // A, B, C, D...
              const isSelected = selectedOption === (idx + 1).toString();
              return (
                <button
                  key={optionKey}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={hasSubmitted[currentIndex]}
                  className={`p-6 text-lg border-2 rounded-lg transition-colors text-left w-full min-h-[70px] flex items-center gap-3
                    ${
                      isSelected
                        ? "bg-yellow-400 border-yellow-600 text-black shadow-lg"
                        : "bg-white border-gray-300 text-black hover:bg-gray-100 hover:shadow-md"
                    }
                    ${
                      hasSubmitted[currentIndex]
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                >
                  <span className="font-bold mr-3 text-xl">{optionKey}.</span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              disabled={
                !selectedOption || hasSubmitted[currentIndex] || isSubmitting
              }
              className={`px-8 py-3 text-xl font-semibold rounded-lg transition-colors
                ${
                  selectedOption && !hasSubmitted[currentIndex] && !isSubmitting
                    ? "bg-yellow-400 text-black hover:bg-yellow-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
                ${hasSubmitted[currentIndex] ? "opacity-60" : ""}`}
            >
              제출
            </button>
          </div>
        </div>
      )}

      {/* 서술형 입력 - 조건 수정 */}
      {isSubjective && !hasOptions && (
        <div className="mt-[24px] flex w-[1000px] h-[72px]">
          <input
            className="w-full h-full text-2xl px-4 border"
            placeholder="정답을 입력해주세요.."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={hasSubmitted[currentIndex]}
          />
          <button
            onClick={handleSubmit}
            className={`w-[150px] h-full bg-yellow-400 text-xl font-semibold border-l border-gray-300 ${
              hasSubmitted[currentIndex] ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={hasSubmitted[currentIndex]}
          >
            제출
          </button>
        </div>
      )}

      {/* 디버깅용 정보 표시 */}
      <div className="mt-4 text-sm text-gray-600 bg-gray-100 p-4 rounded">
        <p><strong>문제 유형:</strong> {currentQuiz?.type || "undefined"}</p>
        <p><strong>옵션 개수:</strong> {currentQuiz?.options?.length || 0}</p>
        <p><strong>hasOptions:</strong> {hasOptions ? "true" : "false"}</p>
        <p><strong>isObjective:</strong> {isObjective ? "true" : "false"}</p>
        <p><strong>isSubjective:</strong> {isSubjective ? "true" : "false"}</p>
        <p><strong>표시되는 화면:</strong> {isObjective && hasOptions ? "객관식" : isSubjective && !hasOptions ? "서술형" : "없음"}</p>
      </div>
    </div>
  );
}
