import backgroundimgg from "../assets/img/aboutbgbg.svg";

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-[700px] mt-[80px] border-t-2">
      <div className="relative z-10 p-10 text-center text-black bg-gray-50  py-[60px]">
        <h1 className="font-nunito font-semibold text-3xl">About Us.</h1>
        <p className="font-NotoSansKR text-md pt-[5%]">
          비즈퀴즈는 어린 시절, 수업에 퀴즈를 활용하기 위해 PPT를 사용해 직접
          퀴즈를 만들어오시던 선생님들을 떠올리며 대학생들이 직접 제작한 퀴즈
          플랫폼입니다.
          <br />
          비싼 구독료와 외국어 플랫폼에 고민하고 계신 선생님들께 도움이 되고
          싶습니다.
        </p>
      </div>
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${backgroundimgg})`,
        }}
      ></div>
    </section>
  );
}
