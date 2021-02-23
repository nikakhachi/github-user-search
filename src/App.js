import './App.css';
import MainPage from './components/Main Page/main-page';
import UserPage from './components/User Page/user-page';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/:username' component={UserPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
