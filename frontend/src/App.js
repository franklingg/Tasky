import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tasks" component={Tasks} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;