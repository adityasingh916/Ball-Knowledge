import React, { useState } from 'react';
import { quizData } from '../data/quizData';

const TeamQuiz = (props) => {
  const teamId = props.teamId;
  const teamName = props.teamName;
  const onExit = props.onExit;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = quizData[teamId];

  if (questions === undefined || questions.length === 0) {
    return (
      <div className="quiz-box">
        <h2 className="title">No quiz available for {teamName} yet!</h2>
        <p style={{marginBottom: '2rem'}}>Check back later for more Ball Knowledge challenges.</p>
        <button onClick={onExit} className="button">Return to Profile</button>
      </div>
    );
  }

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000); 
  };

  const getKnowledgeLevel = (finalScore) => {
    if (finalScore <= 4) {
      return "Beginner";
    } else if (finalScore <= 9) {
      return "Good Ball Knower";
    } else if (finalScore <= 14) {
      return "Elite Ball Knower";
    } else {
      return "God Level Ball Knower";
    }
  };

  if (showResult === true) {
    return (
      <div className="quiz-box">
        <div className="result-box">
          <h2 className="title">{teamName} Quiz Results</h2>
          <div className="score">
            You scored {score} out of {questions.length}
          </div>
          <div className="level">
            Your Rank: <span className="rank">{getKnowledgeLevel(score)}</span>
          </div>
          <button onClick={onExit} className="button" style={{marginTop: "1rem"}}>Return to Profile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-box">
      <div className="playing-box">
        
        <div className="header">
          <h2 className="title">{teamName} Ball Knowledge Quiz</h2>
          <span className="progress">Question {currentQuestion + 1} / {questions.length}</span>
        </div>
        
        <div className="question">
          {questions[currentQuestion].question}
        </div>
        
        <div className="grid">
          {questions[currentQuestion].options.map((option, index) => {
            let btnClass = "button-option";
            
            if (selectedAnswer !== null) {
              if (option === questions[currentQuestion].answer) {
                btnClass = "button-option correct";
              } else if (option === selectedAnswer) {
                btnClass = "button-option incorrect";
              }
            }
            
            return (
              <button 
                key={index} 
                className={btnClass} 
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            );
          })}
        </div>
        
        <button onClick={onExit} className="button-small">Quit Quiz</button>
      </div>
    </div>
  );
};

export default TeamQuiz;
