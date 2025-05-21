import { Link } from "react-router-dom";
import TypeIt from "typeit-react";
import "../styles/App.css";
import heroimg from "../assets/img/heroimg.svg";

export default function HeroSection() {
  return (
    <section>
      <div className="flex justify-between w-full min-h-[60vh] py-[90px] mt-[60px] pt-[160px]">
        {/* 첫 번째 div: 텍스트 내용 영역 */}
        <div className="flex flex-col items-start pl-[5%] md:pl-[120px] ">
          <TypeIt
            as="h1"
            options={{
              strings: ["BeezQuiz."],
              speed: 50,
              waitUntilVisible: true,
              loop: false,
              cursor: false,
            }}
            className="font-nunito text-4xl mb-5 text-black"
          />
          <TypeIt
            as="h1"
            options={{
              strings: "퀴즈를 만들거나, 퀴즈에 참여하세요.",
              speed: 30,
              waitUntilVisible: true,
              loop: false,
              cursor: true,
              startDelay: 1500,
            }}
            className="font-NotoSansKR text-md text-black mb-8"
          />
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
        </div>

        {/* 두 번째 div: 이미지 영역 */}
        <div className="">
          <img
            src={heroimg}
            alt="herobg"
            className="lg:w-[700px] md:w-[700px] mt-[-120px]" // 반응형 이미지 처리
          />
        </div>
      </div>
    </section>
  );
}
