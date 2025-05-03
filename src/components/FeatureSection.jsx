import teacher from "../img/teaching.png";
import browser from "../img/browser.png";
import badge from "../img/badge.png";
import charticon from "../img/chart.png";
import FeatureBox from "./FeatureBox";

export default function FeaturesSection() {
  return (
    <section className="pb-[40px] bg-white">
      <header className="bg-white h-[50px]"></header>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-black text-4xl pt-[80px] font-semibold mb-12">
          주요 특징 및 기능
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 ">
          <FeatureBox
            images={teacher}
            context="선생님들을 위한 무료 퀴즈 플랫폼"
          />
          <FeatureBox
            images={browser}
            context="노트북, 태블릿, 컴퓨터 모두 이용가능한 플랫폼"
          />
          <FeatureBox
            images={badge}
            context="퀴즈 결과로 볼 수 있는 학업 성취도"
          />
          <FeatureBox
            images={charticon}
            context="대시보드를 통한 학생들의 학업 수준 확인"
          />
        </div>
      </div>
    </section>
  );
}
