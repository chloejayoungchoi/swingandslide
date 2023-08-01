import { BiHome, BiSearch, BiInfoCircle} from "react-icons/bi";
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
          <img src="images/logo.png" alt="Swing & Slide logo" className="logo-image"></img>
        </div>
      </nav>
      <Outlet />
      <div className="fixed-bottom-nav fs-3">
        <div className="cursor-pointer"><Link to="/" className="text-gray"><BiHome /></Link></div>
        <div className="cursor-pointer"><Link to="/search" className="text-gray"><BiSearch /></Link></div>
        <div className="cursor-pointer"><Link to="/contact" className="text-gray"><BiInfoCircle /></Link></div>
      </div>
    </div>
  );
}

export default App;
