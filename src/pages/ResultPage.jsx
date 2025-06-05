// src/pages/ResultPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultChart from "../features/ResultChart";

import logoImage from "../assets/img/Logo.png";
import honeyImage from "../assets/img/quizbgbgbg.svg"; // 기존보다 적절한 칠판 배경
import backgroundImage from "../assets/img/quizBackground.svg";

export default function ResultPage() {
  const { roomId } = useParams();
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

    // 500ms 지연 후 fetch 실행
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

  const { averageScore, totalQuestions, participants } = summary;

  return (
    <div
      className="min-h-screen w-screen bg-repeat"
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
        {/* 통계 텍스트 */}
        <div className="flex justify-between px-2 text-[#81491c] font-extrabold text-xl mb-6">
          <span>참여인원 : {participants.length}</span>
          <span>평균 정답 개수 : {averageScore.toFixed(1)}개</span>
        </div>

        {/* 차트 삽입 */}
        <ResultChart participants={participants} totalQuestions={totalQuestions} />
      </div>
    </div>
  );
}
