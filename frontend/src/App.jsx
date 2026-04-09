import { Routes, Route, Navigate } from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Lobby from "./components/Lobby";
import Quiz from "./components/Quiz";
import Results from "./components/Results";


function App() {
  return (
    <Routes>
       <Route path="/quiz/:roomCode" element={<Quiz />} />
        <Route path="/results/:roomCode" element={<Results />} />
        <Route path="/" element={<Lobby />} />
        <Route path="/register" element={<Register />} />
     <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
