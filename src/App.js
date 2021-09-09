
import { BlogNews } from "./Sections/BlogNews";
import NavBar from "./Sections/NavBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Slides from "./Sections/Slides";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>         
          <Route path = "/blog"  component = {BlogNews}/>
          <Route path = "/slides"  component = {Slides}/>

        </Switch>      
      </Router>
    </div>
  );
}

export default App;
