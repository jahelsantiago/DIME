
import { BlogNews } from "./Sections/BlogNews";
import NavBar from "./Sections/NavBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Slides from "./Sections/Slides";
import { Home } from "./Sections/Home";
import { Ets } from "./Sections/Ets";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>         
          <Route path = "/blog"  component = {BlogNews}/>
          <Route path = "/slides"  component = {Slides}/>
          <Route path = "/ETS"  component = {Ets}/>
          <Route path = "/"  component = {Home}/>

        </Switch>      
      </Router>
    </div>
  );
}

export default App;
