const variants = {
  primary: {
    base: " border-black text-black",
    hover: "hover:bg-white hover:text-black",
    active: "active:bg-gray-400 text-black",
  },
  second: {
    base: "border-black bg-black text-white",
    hover: "hover:bg-white hover:text-black",
    active: "active:bg-gray-400 text-white",
  },
};

export default function JoinRoomBtn({
  text,
  variant = "primary",
  onClick,
  type = "button",
}) {
  const style = variants[variant] || variants.primary;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-jua border-2 rounded-xl cursor-pointer ${style.base} ${
        style.hover || ""
      } ${style.active || ""} w-[300px] h-[50px]`}
    >
      {text}
    </button>
  );
}

// 버튼의 텍스트 내용을 수정하기 위해 text props사용
// 두가지 타입의 버튼을 사용하기 위해 type props사용(제출,,뒤로가기)
// ||를 사용해서 혹시 모를 상황에 대비해서 빈 문자열이나 기본 primary속성이 적용되게 함.
