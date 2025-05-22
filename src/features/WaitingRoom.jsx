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
      navigate(`/quiz/${roomId}`);
    });

    return () => {
      socket.off("room-member-count");
      socket.off("start-quiz");
    };
  }, [roomId, navigate]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <img src={logoImage} alt="Beez Quiz" className="absolute top-4 left-4 w-24 select-none pointer-events-none" />

      <p className="absolute top-4 right-4 text-2xl font-extrabold text-[#81491c]">
        입장 인원: {count}
      </p>

      <div className="relative flex items-center justify-center">
        <img src={honeyBlob} alt="code board" className="w-[600px] max-w-[80vw] select-none pointer-events-none" />
        <span className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl font-extrabold tracking-widest text-white">
          {roomId}
        </span>
      </div>
    </div>
  );
}
