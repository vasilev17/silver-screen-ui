import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './components/Login/Login';
import Notifications from './components/Notifications/Notifications';
import MovieInfo from './components/MovieInfo/MovieInfo';
import Register from './components/Register/Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/movieInfo" element={<MovieInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
