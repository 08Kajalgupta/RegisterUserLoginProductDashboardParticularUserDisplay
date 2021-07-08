import React from "react";
import Product from "./Component/Product";
import DisplayAllProduct from "./Component/DisplayAllProduct";
import { BrowserRouter } from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AdminDashBoard from "./Component/AdminDashBoard";
import SignUpForm from "./Component/SignUpForm";
import Login from "./Component/Login";

function App(props) {
  return (
   <div>
     <Router>
       <Route
       strict
       exact
       component={Product}
       path='/product'
       history={props.history}
       />
       <Route
       strict
       exact
       component={DisplayAllProduct}
       path='/displayallproduct'
       history={props.history}
       />
       <Route
       strict
       exact
       component={AdminDashBoard}
       path='/admindashboard'
       history={props.history}
       />
       <Route
       strict
       exact
       component={SignUpForm}
       path='/signupform'
       history={props.history}
       />
       <Route
       strict
       exact
       component={Login}
       path='/login'
       history={props.history}
       />
     </Router>
   </div>
  );
}

export default App;
