import NavBar from "./components/NavBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Slides from "./Pages/Slides/Slides";
import { Home } from "./Pages/Home/Home";
import { Ets } from "./Pages/ETS/Ets";
import Blog from "./Pages/Blog_new/Blog";
import Herramientas  from "./Pages/Herramientas/Herramientas";
import Precios from "./Pages/Precios/Precios";

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
          <Route path = "/Home"  component = {Home}/>
          <Route path = "/Herramientas"  component = {Herramientas}/>
          <Route path = "/Precios"  component = {Precios}/>
        </Switch>      
      </Router>
    </div>
  );
}

export default App;
