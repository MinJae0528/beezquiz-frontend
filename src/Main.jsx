import honeycomb from './img/honeycomb.jpg';

export default function Home() {
    return (
        <div style={{
            backgroundImage: `url(${honeycomb})`, // 이미지 경로를 백틱으로 감싸서 사용
            backgroundSize: 'cover',             // 배경 이미지가 div를 덮도록
            backgroundPosition: 'center center', // 이미지가 div의 중앙에 위치하도록
            height: '100vh'                      // 배경 이미지가 전체 화면을 차지하도록 설정
        }}>
            <h1 style={{color:'blue'}}>hello, it's me, Mario!!</h1>
            <h1 style={{color:'red'}}>BeezQuiz!</h1>
            <h1 className='bg-blue-400'>TailwindCSS Test!</h1>
        </div>
    )
}