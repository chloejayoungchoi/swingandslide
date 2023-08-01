import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './custom.scss';
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/js/bootstrap.min.js';
// import {BiHome, BiSearch, BiHelpCircle} from "react-icons/bi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlaygroundList from './PlaygroundList';
import Search from './Search';
import Contact from './Contact';
import ScrollToTop from './components/ScrollToTop';
import Privacy from './Privacy';
import Terms from './Terms';
import ImageAttribution from './ImageAttribution';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<PlaygroundList />} />
        <Route path="/playground" element={<PlaygroundList />} />
        <Route path="search" element={<Search />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="images" element={<ImageAttribution />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
