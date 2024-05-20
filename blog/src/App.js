import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./routes/Home";
import BoardList from "./routes/BoardList";
import BoardDetail from "./routes/BoardDetail";
import BoardUpdate from "./routes/BoardUpdate";
import BoardCreate from "./routes/BoardCreate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="board" element={<BoardList/>}/>
      <Route path="board/:id" element={<BoardDetail/>}/>
      <Route path="board/update/:id" element={<BoardUpdate/>}/>
      <Route path="board/create" element={<BoardCreate/>}/>
    </Routes>
  );
}

export default App;

