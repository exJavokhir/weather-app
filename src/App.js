import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import {
  HomePage,
  SingleCityPage
} from './pages';

import Header from './containers/Header';

import './assets/main.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>

        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/city/:cityName" component={SingleCityPage}/>
        </Switch>
      </Router>
    </div>
  )
}
export default App