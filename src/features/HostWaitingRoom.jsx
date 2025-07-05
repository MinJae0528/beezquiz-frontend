import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import socket from "../socket";

import honeyBlob from "../assets/img/Honey.svg";
import logoImage from "../assets/img/BeezQuiz.svg";

export default function HostWaitingRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.emit("join-room", { roomCode: roomId, role: "teacher" });

    socket.on("room-member-count", (newCount) => {
      setCount(newCount);
    });

    return () => {
      socket.off("room-member-count");
    };
  }, [roomId]);

  const handleStart = () => {
    socket.emit("start-quiz", roomId);
    navigate(`/host/quiz/${roomId}`); // 퀴즈 화면으로 이동
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center gap-10">
      {/* 로고 이미지: 높이 20vh */}
      <img
        src={logoImage}
        alt="Beez Quiz"
        className="absolute top-4 left-4 h-[20vh] select-none pointer-events-none"
      />

      {/* 입장 인원: 글씨 크기 3rem, 줄간격 2rem */}
      <p className="absolute top-4 right-4 text-[3rem] leading-[2rem] font-extrabold text-[#81491c]">
        입장 인원: {count}
      </p>

      {/* 가운데 이미지 및 방 코드 */}
      <div className="relative flex items-center justify-center mt-[7vh]">
        <img
          src={honeyBlob}
          alt=""
          className="w-[55vw] max-w-[60vw] mt-[4vh] select-none pointer-events-none"
        />
        <span className="absolute inset-0 flex items-center justify-center text-[7rem] font-extrabold tracking-widest text-white">
          {roomId}
        </span>
      </div>

      {/* 시작하기 버튼: 텍스트 크기 및 padding 조정 */}
      <button
        onClick={handleStart}
        className="px-14 py-6 rounded-full bg-[#FECF4F] text-[#81491c] text-[3rem] leading-[2rem] font-extrabold border-4 border-[#81491c] hover:scale-105 active:scale-95 transition"
      >
        시작하기
      </button>
    </div>
  );
}
