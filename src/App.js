import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import "./style.scss";
function App() {
  const { currentUser } = useContext(AuthContext);
  const ProctectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    return children;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route
              index
              element={
                <ProctectedRoute>
                  <Home />
                </ProctectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
