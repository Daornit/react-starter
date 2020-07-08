import {applyMiddleware, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import createRootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

const createBrowserHistory = require('history').createBrowserHistory;


export const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);

const middlewares = [routeMiddleware];


export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middlewares
      ),
    ),
    
  );
  return store;
}
