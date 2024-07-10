import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Button from "./Button";

function QuizList() {
  const quizzes = useSelector((state) => state.quizzes);
  const navigate = useNavigate();

  return (
    <div>
      <>
        <h2 class="text-4xl font-extrabold">Avaliable Quizzes</h2>
        <p class="text-lg">Please Click on any Quiz to Start</p>
        <p class="text-sm">Remember you can only solve quiz once</p>
        <ul className="flex gap-2 flex-wrap">
          {quizzes.map((quiz, index) => (
            <li key={index}>
              <div className="flex">
                <a
                  href={`/quiz/${index}`}
                  class="block max-w-sm mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {quiz.title || "No Title Avaliable"}
                  </h5>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </>
      <div className="absolute top-5 right-1">
        <Button buttonText="Create New Quiz" onClick={() => navigate("/add")} />
      </div>
      <p className="absolute bottom-5 right-1 uppercase">
        I was unable to implement all the use Cases but the basic functionality is there.
      </p>
    </div>
  );
}

export default QuizList;
