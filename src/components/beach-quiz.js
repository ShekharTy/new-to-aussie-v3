import React, { useState } from 'react';
import '../styles/beach-quiz.css';
import sign2Image from '../data/sign2.png';
import redFlagImage from '../data/red_flag.png';
import yellowFlagImage from '../data/yellow_flag.png';
import noSwimmingImage from '../data/no_swimming.png';
import noCampingImage from '../data/no_camping.png';
import ripImage from '../data/rip.png';
import stingersImage from '../data/stingers.png';
import guttersImage from '../data/gutters.png';

const questions = [
  { 
    imageSrc: sign2Image,
    questionText: 'What do red and yellow flags at the beach signify?',
    answerOptions: [
      { answerText: 'Water skiing area', isCorrect: false },
      { answerText: 'Safe swimming area', isCorrect: true },
      { answerText: 'Fishing zone', isCorrect: false },
      { answerText: 'Camping area', isCorrect: false },
    ],
  },
  {
    imageSrc: redFlagImage,
    questionText: 'What does a red flag on the beach indicate?',
    answerOptions: [
      { answerText: 'Safe to swim', isCorrect: false },
      { answerText: 'Strong winds', isCorrect: false },
      { answerText: 'Dangerous conditions, no swimming', isCorrect: true },
      { answerText: 'Water skiing permitted', isCorrect: false },
    ],
  },
  {
    imageSrc: yellowFlagImage,
    questionText: 'If you see a yellow flag at the beach, what does it mean?',
    answerOptions: [
      { answerText: 'Sharks have been spotted', isCorrect: false },
      { answerText: 'Safe for water skiing', isCorrect: false },
      { answerText: 'Caution - moderate surf and/or currents', isCorrect: true },
      { answerText: 'Perfect conditions for swimming', isCorrect: false },
    ],
  },
  {
    imageSrc: noSwimmingImage,
    questionText: 'What does this sign at the beach signify?',
    answerOptions: [
      { answerText: 'Swimming is advised', isCorrect: false },
      { answerText: 'The presence of dangerous marine life', isCorrect: false },
      { answerText: 'Water is too shallow for swimming', isCorrect: false },
      { answerText: 'Swimming is prohibited due to dangerous conditions', isCorrect: true },
    ],
  },
  {
    imageSrc: noCampingImage,
    questionText: 'You notice a sign like this." What does this mean?',
    answerOptions: [
      { answerText: 'Camping is allowed during the day', isCorrect: false },
      { answerText: 'Camping is permitted with a permit', isCorrect: false },
      { answerText: 'No camping is allowed on the beach', isCorrect: true },
      { answerText: 'Camping is allowed outside of swimming areas', isCorrect: false },
    ],
  },
  {
    imageSrc: ripImage,
    questionText: 'Which sign indicates that there are dangerous currents that could carry swimmers away from the shore?',
    answerOptions: [
      { answerText: 'Long Beach', isCorrect: false },
      { answerText: 'Rip', isCorrect: true },
      { answerText: 'Shallow Water', isCorrect: false },
      { answerText: 'Large Waves', isCorrect: false },
    ],
  },
  {
    imageSrc: stingersImage,
    questionText: 'What does a sign warning of "Marine Stingers" imply?',
    answerOptions: [
      { answerText: 'The water is safe for swimming', isCorrect: false },
      { answerText: 'There are dangerous jellyfish in the water', isCorrect: true },
      { answerText: 'The beach is closed for swimming', isCorrect: false },
      { answerText: 'Fishing is prohibited', isCorrect: false },
    ],
  },
  {
    imageSrc: guttersImage,
    questionText: 'Why should you be cautious of if there\'s a sign indicating "Sudden Drop Off"?',
    answerOptions: [
      { answerText: 'Sharks in the vicinity', isCorrect: false },
      { answerText: 'A rapid increase in water depth', isCorrect: true },
      { answerText: 'High winds affecting the beach', isCorrect: false },
      { answerText: 'Prohibition of water skiing', isCorrect: false },
    ],
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerButtonClick = (isCorrect, answerText) => {
      const newUserAnswers = [...userAnswers, { 
          question: questions[currentQuestion].questionText, 
          answer: answerText,
          isCorrect: isCorrect,
          correctAnswer: questions[currentQuestion].answerOptions.find(option => option.isCorrect).answerText
      }];
      setUserAnswers(newUserAnswers);

      if (isCorrect) {
          setScore(score + 1);
      }

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
      } else {
          setShowScore(true);
      }
  };

  const restartQuiz = () => {
      setScore(0);
      setCurrentQuestion(0);
      setShowScore(false);
      setUserAnswers([]);
  };

  const progressWidth = ((currentQuestion + 1) / questions.length) * 100 + '%';

  return (
      <div>
          <h1>Beach Quiz</h1>
          <div className='quiz-rs'>
              {showScore ? (
                  <div className='score-section-rs'>
                      <div>You scored {score} out of {questions.length}</div>
                      <ul className='answers-list-rs'>
                          {userAnswers.map((userAnswer, index) => (
                              <li key={index} className={`user-answer-rs ${userAnswer.isCorrect ? 'correct' : 'incorrect'}`}>
                                  <p><strong>Q:</strong> {userAnswer.question}</p>
                                  <p>Your answer: {userAnswer.answer}</p>
                                  {!userAnswer.isCorrect && <p>Correct answer: {userAnswer.correctAnswer}</p>}
                              </li>
                          ))}
                      </ul>
                      <button onClick={restartQuiz} className="restart-button-rs">Restart Quiz</button>
                  </div>
              ) : (
                  <>
                      <div className='progress-bar-rs' style={{ width: progressWidth }}></div>
                      <div className='question-section-rs'>
                          <div className='question-count-rs'>
                              <span>Question {currentQuestion + 1}</span>/{questions.length}
                          </div>
                          {questions[currentQuestion].imageSrc && (
                              <img src={questions[currentQuestion].imageSrc} alt="Beach Sign" className="question-image-rs" />
                          )}
                          <div className='question-text-rs'>{questions[currentQuestion].questionText}</div>
                      </div>
                      <div className='answer-section-rs'>
                          {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                              <button key={index} onClick={() => handleAnswerButtonClick(answerOption.isCorrect, answerOption.answerText)} className="answer-option-rs">
                                  {answerOption.answerText}
                              </button>
                          ))}
                      </div>
                  </>
              )}
          </div>
      </div>
  );
};

export default Quiz;