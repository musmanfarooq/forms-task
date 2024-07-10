import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { completeQuiz } from "../store/store";
import Button from "./Button";

function Quiz() {
  const { id } = useParams();
  const quizzes = useSelector((state) => state.quizzes);
  const completedQuizzes = useSelector((state) => state.completedQuizzes);
  const dispatch = useDispatch();
  const quiz = quizzes[id];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (completedQuizzes[id] !== undefined) {
      setIsQuizCompleted(true);
    }
  }, [completedQuizzes, id]);

  const handleAnswerChange = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        calculatedScore += 1;
      }
    });
    dispatch(completeQuiz({ quizId: id, score: calculatedScore }));
    setIsQuizCompleted(true);
  };

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  if (isQuizCompleted) {
    return (
      <div>
        <h1 className="text-2xl">{quiz.title}</h1>
        <h2 className="text-lg mb-4">
          Your Score: {completedQuizzes[id]} / {quiz.questions.length}
        </h2>
        <p></p>
        <Button buttonText="Back To Home" onClick={() => navigate("/")} />
      </div>
    );
  }

  const question = quiz.questions[currentQuestionIndex];
  const isAnswerSelected = userAnswers[currentQuestionIndex] !== undefined;

  return (
    <div>
      <h1  className="mb-2 text-2xl text-gray-900 ">Quiz Name: {quiz.title}</h1>
      <div>
        <label className="mb-2 text-xl text-gray-900 ">Question:</label>
        <p>{question.question}</p>
        {question.type === "mcq" ? (
          <div>
            {question.options.map((option, index) => (
              <div key={index}>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={userAnswers[currentQuestionIndex] === option}
                  onChange={handleAnswerChange}
                  required
                />
                <label className="mb-2 text-lg text-gray-900 ">{option}</label>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value="true"
                checked={userAnswers[currentQuestionIndex] === "true"}
                onChange={handleAnswerChange}
                required
              />
              <label>True</label>
            </div>
            <div>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value="false"
                checked={userAnswers[currentQuestionIndex] === "false"}
                onChange={handleAnswerChange}
                required
              />
              <label className="mb-2 text-lg text-gray-900 ">False</label>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center mt-4">
        {currentQuestionIndex > 0 && <Button buttonText="Previous" onClick={handlePreviousQuestion} />}
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <Button buttonText="Next" onClick={handleNextQuestion} disabled={!isAnswerSelected} />
        ) : (
          <Button buttonText="Submit" onClick={handleSubmitQuiz} disabled={!isAnswerSelected} />
        )}
      </div>
    </div>
  );
}

export default Quiz;
