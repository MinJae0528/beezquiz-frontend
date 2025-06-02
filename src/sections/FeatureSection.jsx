import FeatureBox from "../components/FeatureBox";
import coin from "../assets/img/CurrencyCircleDollar.svg";
import translateicon from "../assets/img/Translate.svg";
import shieldicon from "../assets/img/ShieldCheck.svg";
import ranking from "../assets/img/Ranking.svg";

export default function FeatureSection() {
  return (
    <section id="feature" className="pb-[40px] min-h-[60vh] bg-gray-100">
      {/* 고정 높이 제거하고 min-height 설정 */}
      <header className="bg-[#343330] h-[50px]"></header>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-black text-3xl pt-[80px] font-semibold mb-12">
          주요 특징 및 기능
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          <FeatureBox
            images={coin}
            context="선생님들을 위한 무료 퀴즈 플랫폼"
          />
          <FeatureBox
            images={shieldicon}
            context="로그인이나 회원가입 없이 이용"
          />
          <FeatureBox
            images={translateicon}
            context="국내 사용자들을 위한 한글 지원 플랫폼"
          />
          <FeatureBox
            images={ranking}
            context="대시보드를 통해 학생들의 학습 수준을 확인"
          />
        </div>
      </div>
    </section>
  );
}
