import ReactGA from "react-ga4";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function GoogleAnalytics() {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(()=>{
        if(!window.location.href.includes("localhost")) {
            ReactGA.initialize(process.env.REACT_APP_GA_ID);
            setInitialized(true);
        }
    }, []);

    useEffect(()=>{
        if(initialized) {
            ReactGA.set({path: location.pathname});
            ReactGA.send("pageview");
        }
    }, [initialized, location]);
}

export default GoogleAnalytics;