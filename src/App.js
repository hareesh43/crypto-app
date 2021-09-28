import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import {
  Navbar,
  HomePage,
  Exchanges,
  CryptoDetails,
  News,
  Cryptocurrencies,
} from "./components";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>

                <Route exact path="/cryptocurrencies">
                  <Cryptocurrencies />
                </Route>

                <Route exact path="/exchanges">
                  <Exchanges />
                </Route>

                <Route exact path="/crypto/:coinId">
                  <CryptoDetails />
                </Route>

                <Route exact path="/news">
                  <News />
                </Route>
              </Switch>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Title
              level={3}
              style={{ color: "white", textAlign: "center" }}
            >
              Crypto app <br /> All rights received
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchange</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
