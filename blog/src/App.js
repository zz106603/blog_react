import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./routes/Home";
import BoardList from "./routes/Board/BoardList";
import BoardDetail from "./routes/Board/BoardDetail";
import BoardUpdate from "./routes/Board/BoardUpdate";
import BoardCreate from "./routes/Board/BoardCreate";
import UserLogin from "./routes/User/UserLogin";
import UserSignup from "./routes/User/UserSignup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="board" element={<BoardList/>}/>
      <Route path="board/:id" element={<BoardDetail/>}/>
      <Route path="board/update/:id" element={<BoardUpdate/>}/>
      <Route path="board/create" element={<BoardCreate/>}/>
      <Route path="user/login" element={<UserLogin/>}/>
      <Route path="user/signup" element={<UserSignup/>}/>
    </Routes>
  );
}

export default App;


