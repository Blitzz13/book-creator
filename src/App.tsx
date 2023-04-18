import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import GlobalStyle from './global';
import NavBar from './components/Nav/NavBar';
import { Services } from './Services';

function App() {
  const services = new Services();

  return (
    <div className="App">
      <GlobalStyle />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home bookService={services.bookService} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
