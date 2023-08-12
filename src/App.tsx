import './App.css';
import { Route, Routes } from 'react-router-dom';
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

function App() {
  const services = new Services();
  const authContext = useAuthContext();
  return (
    <div id="App" className="App">
      <GlobalStyle />
      {!authContext.user && <span> You are not logged in however the book progress will be saved localy</span>}
      <NavBar bookService={services.bookService} userService={services.userService} />
      <Routes>
        <Route path="/" element={<Home bookService={services.bookService} userService={services.userService} />} />
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
