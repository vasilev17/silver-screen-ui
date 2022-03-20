import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Switch} from "react-router-dom";
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import MyList from './components/MyList/MyList';
import Login from './components/Login/Login';
import NotificationBox from './components/Notifications/Notifications/NotificationBox/NotificationBox';
import NotificationAPITest from './components/Notifications/NotificationAPITest/NotificationAPITest';
import MovieInfo from './components/MovieInfo/MovieInfo';
import Register from './components/Register/Register';
import FriendList from './components/FriendList/FriendList';
import AddFriend from './components/AddFriend/AddFriend';
import Unauthorized from './components/Unauthorized/Unauthorized';
import Administration from './components/Administration/Administration';
import Series from './components/Series/Series';
import Movies from './components/Movies/Movies';
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/series" element={<Series />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notificationsAPITest" element={<NotificationAPITest />} />
        <Route path="/title/:id" element={<MovieInfo />} />
        <Route path="/friendslist" element={<FriendList />} />
        <Route path="/addfriend" element={<AddFriend />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/administration" element={<Administration />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
