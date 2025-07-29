// src/pages/ResultPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResultChart from "../features/ResultChart";

import logoImage from "../assets/img/Logo.png";
import honeyImage from "../assets/img/quizbgbgbg.svg"; // 칠판 배경
import backgroundImage from "../assets/img/quizBackground.svg"; // 전체 배경

export default function ResultPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/result/summary/${roomId}`);
        const text = await res.text();
        console.log("📦 백엔드 응답 원문:", text);

        if (!res.ok) {
          console.error("❌ 서버 응답 실패:", res.status);
          return;
        }

        const data = JSON.parse(text);
        console.log("✅ 파싱된 JSON:", data);
        setSummary(data);
      } catch (err) {
        console.error("❌ 결과 요약 불러오기 실패:", err);
      }
    };

    const timer = setTimeout(fetchSummary, 500);
    return () => clearTimeout(timer);
  }, [roomId]);

  if (!summary) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fff7db] text-[#81491c] text-2xl font-bold">
        결과를 기다리는 중입니다...
      </div>
    );
  }

  // 방어적 처리
  const participants = Array.isArray(summary.participants) ? summary.participants : [];
  const totalQuestions = typeof summary.totalQuestions === 'number' ? summary.totalQuestions : 0;
  const averageScore = typeof summary.averageScore === 'number' ? summary.averageScore : 0;

  console.log("[결과] participants:", participants);
  console.log("[결과] totalQuestions:", totalQuestions);
  console.log("[결과] averageScore:", averageScore);

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div
      className="flex flex-col min-h-screen w-screen bg-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* 상단 로고 */}
      <div className="flex justify-center pt-8 pb-4">
        <img src={logoImage} alt="BeezQuiz Logo" className="w-[240px]" />
      </div>

      {/* 칠판 결과 박스 */}
      <div
        className="relative mx-auto w-[950px] min-h-[500px] bg-no-repeat bg-center bg-contain px-10 py-10"
        style={{ backgroundImage: `url(${honeyImage})` }}
      >
        <div className="flex justify-between px-2 text-[#81491c] font-extrabold text-xl mb-6">
          <span>참여인원 : {participants.length}</span>
          <span>평균 정답 개수 : {averageScore.toFixed(1)}개</span>
        </div>

        <ResultChart participants={participants} totalQuestions={totalQuestions} />
      </div>

      {/* 나가기 버튼 - 칠판 밖 하단 */}
      <div className="flex justify-center mt-8 mb-12">
        <button
          onClick={handleExit}
          className="bg-yellow-400 px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:brightness-110 transition"
        >
          나가기
        </button>
      </div>
    </div>
  );
}
