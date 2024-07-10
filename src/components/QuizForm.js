import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuiz } from "../store/store";
import Button from "./Button";

function QuizForm() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", type: "mcq", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = (e) => {
    e.preventDefault();
    setQuestions([...questions, { question: "", type: "mcq", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuiz = { title, questions };
    dispatch(addQuiz(newQuiz));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-end">
        <Button buttonText="Back to Home" onClick={() => navigate("/")} />
      </div>
      <h4 className="text-2xl mb-4">Please Create a Quiz</h4>
      <div className="flex gap-2 items-center">
        <label className="mb-2 text-lg text-gray-900 ">Quiz Title:</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {questions.map((q, index) => (
        <div key={index} className="mt-3">
          <label className="mb-2 text-lg text-gray-900 mr-3">Question:</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
          />
          <label className="ml-3 mb-2 text-lg text-gray-900 mr-3">Type:</label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
            value={q.type}
            onChange={(e) => handleQuestionChange(index, "type", e.target.value)}
          >
            <option value="mcq">Multiple Choice</option>
            <option value="truefalse">True/False</option>
          </select>
          {q.type === "mcq" && (
            <>
              {q.options.map((option, oIndex) => (
                <div key={oIndex} className="mt-3">
                  <label className="mb-2 text-lg text-gray-900 mr-3">Option {oIndex + 1}:</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                    value={option}
                    onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                  />
                </div>
              ))}
            </>
          )}
          <div className="mt-3">
            <label className="text-lg text-gray-900 mr-3">Correct Answer:</label>
            {q.type === "mcq" ? (
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
              >
                <option value="">Select Correct Answer</option>
                {q.options.map((option, oIndex) => (
                  <option key={oIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
              >
                <option value="">Select Correct Answer</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            )}
          </div>
          <div className="mt-3">
            <Button buttonText="Remove Question" onClick={() => removeQuestion(index)} />
          </div>
        </div>
      ))}
      <div className="flex gap-2 items-center mt-5">
        <Button buttonText="Add Question" onClick={addQuestion} />
        <Button buttonText="Save Quiz" type="submit" />
      </div>
    </form>
  );
}

export default QuizForm;
