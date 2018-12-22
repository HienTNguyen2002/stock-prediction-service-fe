import React from 'react'
import thunk from 'redux-thunk';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
//import ModelBuilder from './screens/ModelBuilder'
import ModelBuilder from './screens/ModelBuilder'
import RealTimeChart from './screens/RealTimeChart'
import TeachnicalChartPage from './screens/TeachnicalAnalysisChart'


const store = createStore(
                    rootReducer,
                    applyMiddleware(thunk)
                    )

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ModelBuilder}/>
        <Route path="/RealTimeChart" component={RealTimeChart} />
        <Route path="/TeachnicalChartPage" component={TeachnicalChartPage} />
      </Route>
    </Router>
  </Provider>
 
), document.getElementById('app'))
