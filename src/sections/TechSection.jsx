import TailWindLogo from "../img/Tailwind_CSS_logo.svg";
import reacticon from "../img/reactlogo.png";
import figmaicon from "../img/figmalogo2.png";
import unsplashicon2 from "../img/unsplashlogo.png";
import githubicon from "../img/github-icon-1.svg";
import githubicon2 from "../img/github-2.svg";
import azure from "../img/azureicon.png";

export default function TechSection() {
  return (
    <section className="relative w-full h-[40px] bg-gray-200">
      <div className="absolute inset-0 flex items-center justify-center gap-[48px] space-x flowing-icon animate-flow-x">
        <div className="">
          <img src={TailWindLogo} alt="twlogo" className="w-[136px]"></img>
        </div>
        <div className="">
          <img src={reacticon} alt="ralogo" className="w-[80px]"></img>
        </div>
        <div className="">
          <img src={figmaicon} alt="fglogo" className="w-[80px]"></img>
        </div>
        <div className="">
          <img src={unsplashicon2} alt="uslogo" className="w-[92px]"></img>
        </div>
        <div className="flex gap-[8px]">
          <img src={githubicon} alt="ghlogo" className="w-[24px]"></img>
          <img src={githubicon2} alt="ghlogo" className="w-[48px]"></img>
        </div>
        <div className="">
          <img src={azure} alt="azlogo" className="w-[64px]"></img>
        </div>
      </div>
    </section>
  );
}
