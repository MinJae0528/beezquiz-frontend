import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CreateQuiz.css';
import honeyImage from '../assets/img/Honey.svg';
import logoImage from '../assets/img/BeezQuiz.svg';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleStartQuiz = async () => {
    if (!API_BASE_URL) {
      alert("❌ API 주소가 설정되지 않았습니다.");
      return;
    }

    try {
      // 1. 방 생성
      const roomRes = await axios.post(`${API_BASE_URL}/rooms/create`, {
        questions: [] // 방 생성 시 빈 문제 배열
      });

      const { roomCode } = roomRes.data;

      // 2. 문제 저장 - 전송 전 로그 확인
      const formattedQuestions = questions.map((q) => ({
        text: q.question,
        correctAnswer: q.answer
      }));

      console.log("✅ 서버에 전송할 문제 리스트:", formattedQuestions);

      await axios.post(`${API_BASE_URL}/room/${roomCode}/questions`, {
        questions: formattedQuestions
      });

      // 3. 성공 시 페이지 이동
      navigate(`/host/room/${roomCode}`);
    } catch (error) {
      console.error("❌ 네트워크 오류:", error);
      alert("퀴즈 시작 중 네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div className="quiz-container">
      <img src={logoImage} alt="BeezQuiz Logo" className="logo" />

      {questions.map((q, index) => (
        <div
          className="quiz-box"
          style={{ backgroundImage: `url(${honeyImage})` }}
          key={index}
        >
          <div className="quiz-inputs">
            <div className="form-group">
              <label>{`문제 ${index + 1}`}</label>
              <textarea
                value={q.question}
                onChange={(e) => handleChange(index, 'question', e.target.value)}
                className="question-input"
                placeholder="문제를 입력하세요"
              />
            </div>
            <div className="form-group">
              <label>정답</label>
              <input
                value={q.answer}
                onChange={(e) => handleChange(index, 'answer', e.target.value)}
                className="answer-input"
                placeholder="정답을 입력하세요"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="quiz-buttons">
        <button onClick={handleAddQuestion} className="add-question-btn">
          문제 추가
        </button>
        <button onClick={handleStartQuiz} className="start-btn">
          시작
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
