import JoinRoomBtn from "../components/JoinRoomBtn";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function JoinRoom({ onClose }) {
  const modalRef = useRef();
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedCode = code.trim().toUpperCase();
    const trimmedNickname = nickname.trim();
    if (!trimmedCode || !trimmedNickname) return;

    try {
      await axios.post(`${API_BASE_URL}/rooms/join`, {
        roomCode: trimmedCode,
        nickname: trimmedNickname,
        role: "student"
      });

      // ✅ 닉네임 로컬 스토리지에 저장
      localStorage.setItem("nickname", trimmedNickname);

      navigate(`/room/${trimmedCode}`);
    } catch (error) {
      alert("❌ 해당 방이 존재하지 않거나 참가할 수 없습니다.");
      console.error("방 참가 실패:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex justify-center items-center"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <motion.section
        ref={modalRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative bg-white rounded-xl px-[80px] pt-[80px] pb-[100px] shadow-lg h-[550px] w-[500px] z-10"
      >
        <h1 className="font-jua mb-[60px] text-4xl">방 참가</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-[20px]">
            <label htmlFor="code" className="font-jua text-lg mr-3">
              방 코드:
            </label>
            <input
              id="code"
              value={code}
              type="text"
              autoComplete="off"
              required
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="mr-5 border-b-2 border-black w-58 h-[35px]"
            />
          </div>
          <div className="mb-[30px]">
            <label htmlFor="nickname" className="font-jua text-lg mr-3">
              닉네임:
            </label>
            <input
              id="nickname"
              value={nickname}
              type="text"
              autoComplete="off"
              required
              onChange={(e) => setNickname(e.target.value)}
              className="mr-5 border-b-2 border-black w-58 h-[35px]"
            />
          </div>
          <div className="flex flex-col items-center space-y-1">
            <JoinRoomBtn type="submit" text={"입장하기"} variant="second" />
            <JoinRoomBtn
              onClick={onClose}
              text={"뒤로가기"}
              variant="primary"
            />
          </div>
        </form>
      </motion.section>
    </motion.div>
  );
}
