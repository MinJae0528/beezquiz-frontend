import JoinRoomBtn from "../components/JoinRoomBtn";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";

export default function JoinRoom({ onClose }) {
  const modalRef = useRef(); // 모달 내부를 참조하기 위한 ref
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 바깥 클릭 감지하는 이벤트 핸들러
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // 모달 외부 클릭 시 닫기
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;        // 빈 입력 방지
    navigate(`/room/${code.trim()}`); // 대기실 페이지로 이동
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} //  처음에 투명하게 시작
      animate={{ opacity: 1 }} //  점점 선명해지며 등장
      exit={{ opacity: 0 }} //  사라질 때 다시 투명해지며 퇴장
      transition={{ duration: 0.3 }} //  위의 애니메이션들에 0.3초 동안 적용
      className="fixed inset-0 z-50 flex justify-center items-center"
    >
      {/* 어두운 배경 */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* 모달 안쪽 콘텐츠 영역 (section)을 슬라이드 + fade-in/out 처리 */}
      <motion.section
        ref={modalRef} // 클릭된 위치가 이 영역 안에 있는지 확인
        initial={{ y: 100, opacity: 0 }} //  시작 위치: 아래 + 투명
        animate={{ y: 0, opacity: 1 }} //  도착 위치: 제자리 + 불투명
        exit={{ y: 100, opacity: 0 }} //  퇴장 시: 다시 아래로 내려가며 사라짐
        transition={{ duration: 0.4, ease: "easeOut" }} //  부드럽게 easeOut으로 0.4초 동안 실행
        className="relative bg-white rounded-xl px-[80px] pt-[120px] pb-[100px] shadow-lg h-[500px] w-[500px] z-10"
      >
        <h1 className="font-jua mb-[110px] text-4xl">방 코드를 입력하세요!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-[20px]">
            <label htmlFor="code" className="font-jua text-lg mr-3">
              방 코드 :
            </label>
            <input
              id="code"
              value={code}
              type="text"
              autoComplete="off"
              required
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="mr-5 border-b-2 border-black w-58 h-[35px]"
            />
          </div>
          <div className="flex flex-col items-center space-y-1">
            <JoinRoomBtn type="submit" text={"입장하기"} variant="second" />
            <JoinRoomBtn
              onClick={onClose}
              text={"뒤로가기"}
              variant="primary"
            />
          </div>
        </form>
      </motion.section>
    </motion.div>
  );
}
