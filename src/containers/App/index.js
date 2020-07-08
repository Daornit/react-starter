import React, {memo, useEffect} from "react";
import {Redirect, Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import { ConfigProvider } from 'antd';
import {IntlProvider} from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";

const RestrictedRoute = ({component: Component, location, authUser, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: {from: location}
          }}
        />}
  />;


const App = (props) => {

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    if (location.pathname === '/') {
      // if (authUser === null) {
      //   history.push('/signin');
      // } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
      //   history.push('/main/dashboard/crypto');
      // } else {
      //   history.push(initURL);
      // }
    }
  }, [location, history]);

  const currentAppLocale = AppLocale['en'];

  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}>

        <Switch>
          <Route exact path='/signin' component={null}/>
          <Route exact path='/signup' component={null}/>
          <RestrictedRoute path={`${match.url}`} authUser={{}} location={location}
                           component={MainApp}/>
        </Switch>
      </IntlProvider>
    </ConfigProvider>
  )
};

export default memo(App);
