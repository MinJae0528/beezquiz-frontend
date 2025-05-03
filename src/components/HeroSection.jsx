import { Link } from "react-router-dom";
import browser from "../img/browser.png";
import teaching from "../img/teaching.png";
import chart1 from "../img/chart.png";

export default function HeroSection() {
  return (
    <section className="h-[900px] py-[90px] mt-[60px] pt-[180px] max-w-4xl mx-auto px-8 text-center mb-[120px]">
      <h1
        className="font-sans text-5xl font-bold mb-5 text-white"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
      >
        비즈퀴즈 - Beez Quiz!
      </h1>
      <p className="text-lg text-white mb-8">
        비즈퀴즈는 퀴즈를 학생들과의 수업에 사용하는 선생님들을 위한 퀴즈
        플랫폼입니다.
      </p>
      <div className="flex justify-center gap-4 mb-[80px]">
        <Link
          to="/quiz" // 퀴즈 시작 페이지로
          className="flex items-center px-6 py-3 font-bold bg-yellow-400 text-white rounded-lg hover:bg-yellow-600"
        >
          퀴즈 시작하기
        </Link>
        <a
          href="/getting-started"
          className="px-6 py-3 border-4 bg-white border-yellow-400 text-yellow-700 rounded-lg hover:bg-blue-50"
        >
          비즈퀴즈는?
        </a>
      </div>
      <div className="flex justify-between items-center">
        <img src={teaching} className="w-[200px]" alt="teacing"></img>
        <img src={browser} className="w-[160px] h-[160px]" alt="broser"></img>
        <img src={chart1} className="w-[200px] h-[200px]" alt="chart"></img>
      </div>
    </section>
  );
}
