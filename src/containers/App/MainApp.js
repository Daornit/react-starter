import React from "react";
import {Layout} from "antd";

import App from "routes/index";
import {useRouteMatch} from "react-router-dom";

const {Content, Footer} = Layout;

const MainApp = () => {

  const match = useRouteMatch();

  return (
    <Layout className="gx-app-layout">
      <Layout>
        <Content className={`gx-layout-content`}>
          <App match={match}/>
          <Footer>
            <div className="gx-layout-footer-content">
              2020 powered by Batorgil
            </div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  )
};
export default MainApp;

