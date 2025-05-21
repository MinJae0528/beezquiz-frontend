import beeicon from "../assets/img/BeeiconR.svg";

export default function Header() {
  return (
    <header className="flex items-center mt-[36px] px-[5%] h-[60px] gap-[32px]">
      <img src={beeicon} className="w-[64px]" alt="smallLogo" />
      <div>
        <p className="font-nunito font-thin text-3xl text-black">BeezQuiz.</p>
        <p className="font-nunito text-[8px] text-black text-opacity-90 ml-[30%] md::ml-[20px]">
          made by Team. Monster'
        </p>
      </div>
      <div className="flex justify-between w-full">
        <hr className="border border-black w-full sm:w-[80%] mx-auto"></hr>
      </div>
      <hr className="border-2 border-black ml-[-20px]"></hr>
    </header>
  );
}
