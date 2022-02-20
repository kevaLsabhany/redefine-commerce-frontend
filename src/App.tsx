import React from "react";
import "./App.css";
import Navbar from "./common/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Employee from "./components/employee/Employee";
import Department from "./components/department/Department";
import { paths } from "./common/constant";
import AddEmployee from "./components/employee/AddEmployee";
import AddDepartment from "./components/department/AddDepartment";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar paths={paths} />
        <Switch>
          <Route path="/" exact component={Employee} />
          <Route path="/department" component={Department} />
          <Route path="/add-employee/:id" exact component={AddEmployee} />
          <Route path="/add-employee" exact component={AddEmployee} />
          <Route path="/add-department" exact component={AddDepartment} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
