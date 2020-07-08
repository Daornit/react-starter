import React from "react";
import {Route, Switch} from "react-router-dom";

import Public from './public'

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}public`} component={Public}/>
    </Switch>
  </div>
);

export default App;
