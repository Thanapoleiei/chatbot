import React, { Component } from "react";
import Login from "./Component/Admin/Login";
import Create from './Component/CreateIntent/Fields';
import getIntent from './Component/GetIntent/getIntent'
import getFileIntent from './Component/GetIntent/getFileIntent'
import getData from './Component/GetIntent/getData'
import getFile from './Component/GetIntent/getFile'
import updateData from './Component/GetIntent/editData'
import Manual from "./Component/Admin/Manual/Manual";
import MLine from "./Component/Admin/Manual/MLine";
import MDialogflow from "./Component/Admin/Manual/MDialogflow.js";
import MAdmin from "./Component/Admin/Manual/MAdmin.js";
import Chatmain from "./Component/Main/Chatmain";
import Reducer from './Component/Redux/Reducer';
import Main from "./Component/Home/Main";
import FeedBack from "./Component/Admin/FeedBack";
import FallBack from "./Component/Admin/FallBack";
import SignUp from "./Component/Admin/SignUp";
import ResetPass from "./Component/Admin/ResetPass";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const store = createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/admin/create" component={Create} />
              <Route exact path="/admin/download" component={getData} />
              <Route exact path="/admin/getintent" component={getFile} />
              <Route exact path="/admin/intent" component={getIntent} />
              <Route exact path="/admin/fileintent" component={getFileIntent} />
              <Route exact path="/admin/edit" component={updateData} />
              <Route exact path="/admin/manual" component={Manual} />
              <Route exact path="/admin/manual/line" component={MLine} />
              <Route exact path="/admin/manual/dialogflow" component={MDialogflow} />
              <Route exact path="/admin/manual/admin" component={MAdmin} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/admin/signup" component={SignUp} />
              <Route exact path="/repassword" component={ResetPass} />
              <Route exact path="/admin/feedback" component={FeedBack} />
              <Route exact path="/admin/fallback" component={FallBack} />
            </Switch>
          </Router>
          <Chatmain />
        </div>
      </Provider>
    );
  }
}

export default App;
