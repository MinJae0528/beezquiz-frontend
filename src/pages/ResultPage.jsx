import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultChart from "../features/ResultChart";

import logoImage from "../assets/img/Logo.png";
import honeyImage from "../assets/img/Honey.svg";
import backgroundImage from "../assets/img/quizBackground.svg";

export default function ResultPage() {
  const { roomId } = useParams();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        // ✅ 1초 지연 후 요청
        console.log("⏳ 결과 요청 1초 지연 중...");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/result/summary/${roomId}`
        );

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

    fetchSummary();
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

      {/* 꿀 배경 결과 박스 */}
      <div
        className="relative mx-auto w-[850px] min-h-[460px] bg-no-repeat bg-center bg-contain px-12 py-12"
        style={{ backgroundImage: `url(${honeyImage})` }}
      >
        {/* 상단 통계 텍스트 */}
        <div className="flex justify-between text-[#81491c] font-extrabold text-2xl mb-6">
          <span>참여인원 : {participants.length}</span>
          <span>평균 정답 갯수 : {averageScore.toFixed(1)}개</span>
        </div>

        {/* 차트 삽입 */}
        <ResultChart
          participants={participants}
          totalQuestions={totalQuestions}
        />
      </div>
    </div>
  );
}
