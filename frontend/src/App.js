import './global.css';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tasks" component={Tasks} />
      </Switch>
    </Router>
  );
}

export default App;