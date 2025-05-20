import logo from "../img/BeeiconR.svg";

export default function FooterSection() {
  return (
    <section className="bg-[#343330] h-[200px]">
      <div className="flex flex-col items-start ml-[120px] pt-[40px] pb-[12px]">
        <div className="flex justify-center items-center">
          <img src={logo} alt="logo" className="w-[48px]" />
          <p className="font-nunito text-3xl text-white pl-[16px]">BeezQuiz.</p>
        </div>
        <p className="font-nunito text-[8px] text-white text-opacity-90 ml-[108px]">
          made by Team. Monster'
        </p>
        <hr className="border-[-1px] border-gray-300 w-[1200px] mt-[48px]"></hr>
        <a
          href="https://dept.daelim.ac.kr/com/index.do"
          className="font-nunito text-xs text-white text-opacity-75 pt-[20px]"
        >
          https://dept.daelim.ac.kr/com/index.do
        </a>
      </div>
    </section>
  );
}
