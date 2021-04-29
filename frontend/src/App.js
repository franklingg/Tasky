import './global.css';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";
import Forbidden from "./pages/Error";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/forbidden" component={Forbidden} />
      </Switch>
    </Router>
  );
}

export default App;