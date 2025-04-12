const variants = {
  primary: {
    base: "bg-yellow-700 text-white",
    active: "active:bg-yellow-400",
  },
};

export default function MainButton({ label, onClick, variant = "primary" }) {
  const style = variants[variant];
  return (
    <button onClick={onClick} className={`${style.base} ${style.active}`}>
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
