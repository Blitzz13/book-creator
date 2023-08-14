import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import GlobalStyle from './global';
import NavBar from './components/Nav/NavBar';
import Services from './Services';
import WriteBook from './components/WriteBook/WriteBook';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ReadBook from './components/ReadBook/ReadBook';
import Search from './components/Search/Search';
import Profile from './components/Profile/Profile';
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect } from 'react';
import { isTokenCloseToExpired, isTokenExpired } from './helpers/helpFunctions';

function App() {
  const services = new Services();
  const authContext = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    function checkTokenExpiration() {
      if (authContext.user && authContext.user.token) {
        const isExpired = isTokenExpired(authContext.user.token);
        if (isExpired) {
          console.warn("Session expired");
          services.userService.logout();
          navigate("/");
          return;
        }
        
        const isCloseToExpired = isTokenCloseToExpired(authContext.user.token)
        if (isCloseToExpired) {
          console.log("Session extended");
          services.userService.refreshToken();
        }
      }
    };

    checkTokenExpiration();

    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 40 * 1000); // 40 seconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [authContext.user, navigate, services.userService]);

  return (
    <div id="App" className="App">
      <GlobalStyle />
      {!authContext.user && <span> You are not logged in however the book progress will be saved locally</span>}
      <NavBar bookService={services.bookService} userService={services.userService} />
      <Routes>
        <Route path="/" element={<Home bookService={services.bookService} userService={services.userService}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/write/:bookId" element={<WriteBook chapterService={services.chapterService} bookService={services.bookService} />} />
        <Route path="/read/:bookId" element={<ReadBook chapterService={services.chapterService} bookService={services.bookService} noteService={services.noteService} userService={services.userService} />} />
        <Route path="/search" element={<Search bookService={services.bookService} />} />
        <Route path="/profile/:userId" element={<Profile userService={services.userService} bookService={services.bookService} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
