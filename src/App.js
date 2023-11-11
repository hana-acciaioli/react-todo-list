import './App.css';
import Auth from './components/Auth/Auth.js';
import Footer from './components/layout/Footer/Footer.js';
import Header from './components/layout/Header/Header.js';
import Todo from './components/Todo/Todo.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/auth/:type" component={Auth} />
        <Route path="/todos" component={Todo} />
        <Route exact path="/">
          <>
            {!user && <Redirect to="/auth/sign-in" />}
            {user && <Redirect to="/todos" />}
          </>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
