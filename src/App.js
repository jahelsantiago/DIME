import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Slides from "./Pages/Slides/Slides";
import { Home } from "./Pages/Home/Home";
import { Ets } from "./Pages/ETS/Ets";
import Blog from "./Pages/Blog_new/Blog";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>         
          <Route path = "/blog"  component = {Blog}/>
          <Route path = "/blog_new"  component = {Blog}/>
          <Route path = "/slides"  component = {Slides}/>
          <Route path = "/ETS"  component = {Ets}/>
          <Route path = "/"  component = {Home}/>

        </Switch>      
      </Router>
    </div>
  );
}

export default App;
