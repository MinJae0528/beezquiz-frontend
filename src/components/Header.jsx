import logo from "../img/LogoJin.png";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center h-[60px] bg-white gap-[20px] border-b border-black shadow-lg z-50">
      <img src={logo} className="w-[52px] ml-[48px] mb-2" alt="smallLogo" />
      <p className="font-sans font-bold text-black pr-[60px] border-r">
        BeezQuiz - 비즈퀴즈!
      </p>
    </header>
  );
}
