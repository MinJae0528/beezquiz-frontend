import polygonImg1 from "../img/Polygon1.png";

const variants = {
  primary: {
    base: "text-white border-blue-400",
    hover: "hover:text-black",
    active: "active:text-red-700",
  },
};

export default function MainButton({
  label,
  onClick,
  variant = "primary",
  backgroundImage = polygonImg1,
}) {
  const style = variants[variant];
  return (
    <button
      onClick={onClick}
      className={`font-jua text-xl py-5 px-10 w-[300px] h-[180px] ${style.base} ${style.hover} ${style.active} transform transition-all duration-200 ease-in-out hover:scale-105 `}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {label}
    </button>
  );
}

// *코드 설명*

// 버튼의 tailwind css 부분에서 쌍따옴표("") 대신 백틱(``)을 쓴 이유 ↙

// 일반적인 정적인 요소(단순한 색 지정이나 hover태그)에는 쌍따옴표를 사용하지만
// isActive ? : 나 props를 이용해 색을 그때그때 변경하는 동적인 부분에서는 백틱을 사용
// 중괄호와 백틱으로 감싸서 사용

// variants를 이용해서 primary라는 속성을 만들었음
// 그 안에는 일반상태의 스타일인 base와 버튼 활성화 상태의 스타일인 acitve가 있음

// variant = "primary" : 사용자가 variant를 안넘기면 기본값으로 "primary" 사용함(props임)
// variants[variant] : variants["primary"]의 스타일을 꺼냄

// transform transition-all duration-200 ease-in-out:
//  transform: css변환속성, 버튼에 크기 변환을 적용
//  transition-all: 모든 스타일 변화에 대해 부드러운 전환 효과 적용
//  duration-200: 전환효과 지속시간은 200ms로 설정
//  ease-in-out: 전환효과의 타이밍 함수, 부드럽게 시작하고 끝나는 효과

// hover:scale-105
//  마우스를 올렸을 때 버튼의 크기를 5% 정도 확장
