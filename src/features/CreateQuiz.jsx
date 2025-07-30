// src/pages/CreateQuiz.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CreateQuiz.css';
import honeyImage from '../assets/img/Honey.svg';
import logoImage from '../assets/img/BeezQuiz.svg';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const defaultQuestion = () => ({
  question_text: '',
  type: 'subjective', // 처음 기본값은 서술형
  correct_answer: '',
  options: ['', '', '', ''] // 객관식일 때만 사용
});

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([defaultQuestion()]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, defaultQuestion()]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleStartQuiz = async () => {
    if (!API_BASE_URL) {
      alert("❌ API 주소가 설정되지 않았습니다.");
      return;
    }

    try {
      const formattedQuestions = questions.map((q) => {
        if (q.type === 'objective') {
          return {
            question_text: q.question_text,
            correct_answer: q.correct_answer || '1',
            type: 'objective',
            options: q.options
          };
        } else {
          return {
            question_text: q.question_text,
            correct_answer: q.correct_answer.trim(),
            type: 'subjective'
          };
        }
      });

      const roomRes = await axios.post(`${API_BASE_URL}/rooms/create`, {
        questions: formattedQuestions
      });

      const { roomCode } = roomRes.data;
      console.log("✅ 방 생성 완료, 코드:", roomCode);
      navigate(`/host/room/${roomCode}`);
    } catch (error) {
      console.error("❌ 퀴즈 시작 오류:", error);
      alert("퀴즈 시작 중 오류가 발생했습니다.");
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
            {/* 문제 입력 */}
            <div className="form-group">
              <label>{`문제 ${index + 1}`}</label>
              <textarea
                value={q.question_text}
                onChange={(e) => handleChange(index, 'question_text', e.target.value)}
                className="question-input"
                placeholder="문제를 입력하세요"
              />
            </div>

            {/* 문제 유형 선택 */}
            <div className="form-group">
              <label>문제 유형</label>
              <select
                value={q.type}
                onChange={(e) => handleChange(index, 'type', e.target.value)}
              >
                <option value="objective">객관식</option>
                <option value="subjective">서술형</option>
              </select>
            </div>

            {/* 객관식 보기 입력 */}
            {q.type === 'objective' && (
              <>
                <div className="options-grid">
                  {[0, 1, 2, 3].map((optIndex) => (
                    <div className="form-group option-half" key={optIndex}>
                      <label>{`보기 ${optIndex + 1}`}</label>
                      <input
                        value={q.options[optIndex]}
                        onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                        className="answer-input"
                        placeholder={`${optIndex + 1}번 보기`}
                      />
                    </div>
                  ))}
                </div>

                {/* 객관식 정답 선택 */}
                <div className="form-group">
                  <label>정답 선택</label>
                  <select
                    value={q.correct_answer || '1'}
                    onChange={(e) => handleChange(index, 'correct_answer', e.target.value)}
                  >
                    <option value="1">1번</option>
                    <option value="2">2번</option>
                    <option value="3">3번</option>
                    <option value="4">4번</option>
                  </select>
                </div>
              </>
            )}

            {/* 서술형 정답 입력 */}
            {q.type === 'subjective' && (
              <div className="form-group">
                <label>정답 입력</label>
                <input
                  value={q.correct_answer}
                  onChange={(e) => handleChange(index, 'correct_answer', e.target.value)}
                  className="answer-input"
                  placeholder="정답을 입력하세요"
                />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 버튼 영역 */}
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
