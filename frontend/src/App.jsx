import { Routes, Route, Navigate } from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Lobby from "./components/Lobby";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/quiz/:roomCode"
        element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/results/:roomCode"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Lobby />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
    </Routes>
  );
}

export default App;
