import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { classNames, scopedClassMaker } from "@/utils";
import { SignIn, SignUp } from "./page/sign";
import "./app.scss";

const sc = scopedClassMaker("web-im");

const App: React.FunctionComponent = ({}) => {
  return (
    <div className={classNames(sc("container"))}>
      <Router>
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
      </Router>
    </div>
  );
};

export default App;
