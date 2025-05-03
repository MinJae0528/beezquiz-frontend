import React, { useState } from 'react';
import '../style/CreateQuiz.css';
import honeyImage from '../img/Honey.svg';
import logoImage from '../img/BeezQuiz.svg';

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleStartQuiz = () => {
    console.log('퀴즈 시작:', questions);
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
