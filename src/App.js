import { BiHome, BiSearch, BiInfoCircle, BiMapAlt} from "react-icons/bi";
import { Outlet, Link } from "react-router-dom";
import GoogleAnalytics from "./components/GoogleAnalytics";
// import logo from "/images/logo.png";

function App() {
  // console.log('this is app at ' + new Date());
  GoogleAnalytics();

  return (
    <div className="container-lg px-0">
      <nav className="navbar fixed-top ">
        <div className="container-fluid d-flex justify-content-center">
        <Link to="/"><img src="images/logo.png" alt="Swing & Slide logo" className="logo-image"></img></Link>
        </div>
      </nav>
      <Outlet />
      <div className="fixed-bottom-nav fs-3">
        <Link to="/"><div className="cursor-pointer px-4"><BiHome  className="text-gray"/></div></Link>
        <Link to="/map"><div className="cursor-pointer px-4"><BiMapAlt  className="text-gray"/></div></Link>
        <Link to="/search"><div className="cursor-pointer px-4"><BiSearch  className="text-gray"/></div></Link>
        <Link to="/contact"><div className="cursor-pointer px-4"><BiInfoCircle  className="text-gray"/></div></Link>
      </div>
    </div>
  );
}

export default App;
