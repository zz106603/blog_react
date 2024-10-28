import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./routes/Home";
import BoardList from "./routes/Board/BoardList";
import BoardDetail from "./routes/Board/BoardDetail";
import BoardUpdate from "./routes/Board/BoardUpdate";
import BoardCreate from "./routes/Board/BoardCreate";
import UserLogin from "./routes/User/UserLogin";
import UserSignup from "./routes/User/UserSignup";
import OAuth2RedirectHandler from './routes/User/OAuth2RedirectHandler';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="board" element={<BoardList/>}/>
      <Route path="board/:postId" element={<BoardDetail/>}/>
      <Route path="board/update/:postId" element={<BoardUpdate/>}/>
      <Route path="board/create" element={<BoardCreate/>}/>
      <Route path="oauth2/redirect" element={<OAuth2RedirectHandler/>}/>
      <Route path="user/login" element={<UserLogin/>}/>
      <Route path="user/signup" element={<UserSignup/>}/>
    </Routes>
  );
}

export default App;


