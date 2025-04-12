import MainButton from "./components/MainButton";
import logo from "./img/Logo.png";

export default function Home() {
  const createRoom = () => {
    alert("방을 생성하시겠습니까");
  };

  const joinRoom = () => {
    alert("방에 참여하시겠습니까?");
  };

  return (
    <div className="h-screen flex items-center justify-center px-4 bg-yellow-200">
      <div className="max-w-2xl w-full p-10 text-center">
        <img src={logo} className="mb-[160px]"></img>
        <div className="flex flex-col gap-10 md:flex-row md:justify-center md:gap-12">
          <MainButton
            label="방 만들기"
            onClick={createRoom}
            variant="primary"
          />
          <MainButton
            label="방 참여하기"
            onClick={joinRoom}
            variant="primary"
          />
        </div>
      </div>
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
*/
