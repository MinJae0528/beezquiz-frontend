import logoImage from "../assets/img/BeezQuiz.svg";
import { useState, useEffect } from "react";
import bgbgbg from "../assets/img/quizbgbgbg.svg";

export default function StudentQuizScreen() {
  const [answer, setAnswer] = useState("");
  // UI
  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <img
        src={logoImage}
        alt="Beez Quiz"
        className="absolute top-4 left-4 w-24 select-none pointer-events-none"
      />
      <div className="flex flex-col">
        <div
          className="flex justify-center items-center w-[1000px] h-[500px] rounded-lg"
          style={{ backgroundImage: `url(${bgbgbg})` }}
        >
          <div className=" w-[740px] h-[320px]">
            <p className="text-black text-3xl">
              문제의 내용이 표시될 부분입니다.
            </p>
          </div>
        </div>
        <div className="mt-[24px]">
          <input
            className="w-[1000px] h-[72px] text-2xl px-4 border"
            placeholder="정답을 입력해주세요.."
          />
        </div>
      </div>
    </div>
  );
}
