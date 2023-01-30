import './App.css';
import Auth from './components/Auth/Auth.js';
import Footer from './components/layout/Footer/Footer.js';
import Header from './components/layout/Header/Header.js';
import Todo from './components/Todo/Todo.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Auth />
      <Todo />
      <Footer />
    </div>
  );
}

export default App;
