import './App.css';
import MainPage from './components/Main Page/main-page';
import UserPage from './components/User Page/user-page';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' exact component={MainPage} />
          <Route path='/:username' component={UserPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
