import { useParams } from "react-router-dom";
import { useState, useEffect  } from "react";

import honeyBlob from "../assets/img/Honey.svg";
import logoImage from "../assets/img/BeezQuiz.svg";

export default function HostWaitingRoom() {
  const { roomId } = useParams();
  const [count] = useState(1); // 소켓 연결 후 인원수 가져와야함

  const handleStart = () => {
    // 소켓 emit("start-quiz") + 페이지 이동 로직
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center gap-10">
      {/* 로고 */}
      <img
        src={logoImage}
        alt="Beez Quiz"
        className="absolute top-4 left-4 w-24 select-none pointer-events-none"
      />

      {/* 인원 수 */}
      <p className="absolute top-4 right-4 text-2xl font-extrabold text-[#81491c]">
        입장 인원: {count}
      </p>

      {/* 꿀 이미지 + 방 코드 */}
      <div className="relative flex items-center justify-center">
        <img
          src={honeyBlob}
          alt=""
          className="w-[600px] max-w-[80vw] select-none pointer-events-none"
        />
        <span className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl font-extrabold tracking-widest text-white">
          {roomId}
        </span>
      </div>

      {/* 시작하기 버튼 */}
      <button
        onClick={handleStart}
        className="px-14 py-4 rounded-full bg-[#FECF4F] text-[#81491c] text-2xl font-extrabold border-4 border-[#81491c] hover:scale-105 active:scale-95 transition"
        >
        시작하기
      </button>
    </div>
  );
}
