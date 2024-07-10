import React from "react";
import { Route, Routes } from "react-router-dom";
import QuizForm from "./components/QuizForm";
import QuizList from "./components/QuizList";
import Quiz from "./components/Quiz";

const App = () => {
  return (
    <>
      <div className="px-5 mt-4">
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/add" element={<QuizForm />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
