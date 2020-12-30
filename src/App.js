import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NewUser from "./components/users/NewUser";
import User from "./components/users/User";
import EditUser from "./components/users/EditUser";

function App() {


  return (
      <div className="container">
        <div className="row">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <User/>
                    </Route>
                    <Route path="/new">
                        <NewUser/>
                    </Route>
                    <Route path="/edit/:id">
                        <EditUser/>
                    </Route>
                </Switch>
            </Router>
        </div>
      </div>
  );
}

export default App;
