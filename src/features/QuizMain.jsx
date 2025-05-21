import { AnimatePresence } from "framer-motion";
import JoinRoom from "./JoinRoom.jsx";
import MainButton from "../components/MainButton.jsx";
import logo from "../assets/img/Logo.png";
import MainBg from "../assets/img/MainBg2.png";
import { useState } from "react";
import polygonImg1 from "../assets/img/Polygon1.png";
import polygonImg2 from "../assets/img/Polygon2.png";

import { useNavigate } from "react-router-dom";

export default function QuizMain() {
  const [isJoinRoomOpen, setIsJoinRoomOpen] = useState(false);
  const navigate = useNavigate();

  const createRoom = () => {
    // alert("방을 생성하시겠습니까?");
    navigate("/createQuiz")
  };

  const joinRoom = () => {
    setIsJoinRoomOpen(true);
  };

  return (
    <div
      className="h-screen flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${MainBg})` }}
    >
      <div className="max-w-2xl w-full p-10 text-center">
        <img src={logo} className="mb-[160px]" alt="logo"></img>
        <div className="flex flex-col md:flex-row md:justify-center md:gap-[130px]">
          <MainButton
            label="방 만들기"
            onClick={createRoom}
            variant="primary"
            backgroundImage={polygonImg1}
          />
          <MainButton
            label="방 참여하기"
            onClick={joinRoom}
            variant="primary"
            backgroundImage={polygonImg2}
          />
        </div>
      </div>
      <AnimatePresence>
        {/* 🔹 조건부로 JoinRoom 컴포넌트를 렌더링 */}
        {isJoinRoomOpen && (
          <JoinRoom key="join-room" onClose={() => setIsJoinRoomOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/*  코드 설명  */

/*
    // h-screen : 100vh - 화면 채우기
    // items-center : 세로 방향 가운데 정렬(교차축)
    // justify-center : 가로 방향 가운데 정렬(주축)

    // max-w-2xl: 가로 최대 너비를 672px로 제한 (콘텐츠가 너무 넓어지지 않도록)
    // w-full: 부모 너비에 맞춰 가득 차도록 설정 (최대값은 max-w-2xl에 의해 제한됨)

    // flex-col : 세로 방향으로 나열
    // md:flex-row : md(화면 너비768px) 이상일 때 가로 방향 정렬
    // md:justify-center: md 이상일 때 가로 방향 가운데 정렬
    // md:gap-12: md 이상일 때 요소 사이 간격을 3rem(48px)으로 설정

    // variant = "primary" : 버튼 속성에서 primary 속성을 사용
    //  -primary안에는 base라는 기본상태의 스타일과 active라는 버튼 활성화 상태의 스타일이 있음


    // 참여하기 버튼을 클릭하면 JoinRoom 컴포넌트를 화면에 표시
    // useState를 사용해서 상태를 추가했음
    // isJoinRoomOpen이라는 상태를 만들어서 조건부 렌더링에 사용
    // joinRoom 함수는 isJoinRoomOpen을 true로 바꿈
*/
