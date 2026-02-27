// App related src
import './App.css';

// Presentational Components
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';

function App() {

  return (
    <>
      <Header className="header"/>
      <Main className="main"/>
      <Footer className="footer"/>
    </>
  );
}

export default App;
