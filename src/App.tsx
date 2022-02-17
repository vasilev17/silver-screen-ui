import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './components/Login/Login';
import Register from './components/Register/Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
