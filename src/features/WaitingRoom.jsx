import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import socket from "../socket";

import honeyBlob from "../assets/img/Honey.svg";
import logoImage from "../assets/img/BeezQuiz.svg";

export default function WaitingRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.emit("join-room", { roomCode: roomId, role: "student" });

    socket.on("room-member-count", (newCount) => {
      setCount(newCount);
    });

    socket.on("start-quiz", () => {
      navigate(`/students/quiz/${roomId}`);
    });

    return () => {
      socket.off("room-member-count");
      socket.off("start-quiz");
    };
  }, [roomId, navigate]);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center gap-10">
      <img src={logoImage} alt="Beez Quiz" className="absolute top-4 left-4 h-[20vh] select-none pointer-events-none" />

      <p className="absolute top-4 right-[3rem] text-[3rem] leading-[2rem] font-extrabold text-[#81491c]">
        입장 인원: {count}
      </p>

      <div className="relative flex items-center justify-center">
        <img
          src={honeyBlob}
          alt=""
          className="w-[55vw] max-w-[60vw] mt-[4vh] select-none pointer-events-none"
        />
        <span className="absolute inset-0 flex items-center justify-center text-[7rem] font-extrabold tracking-widest text-white">
          {roomId}
        </span>
      </div>
    </div>
  );
}
