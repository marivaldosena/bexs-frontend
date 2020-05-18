import React, { useEffect } from 'react';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './Routes';

import axios from 'axios';
window.axios = axios;

function App() {
  useEffect(() => {
    M.AutoInit();

    document.addEventListener('DOMContentLoaded', function () {
      const elems = document.querySelectorAll('.sidenav');
      const instances = M.Sidenav.init(elems, {});
    });
  });

  const doOpenSidebar = (event) => {
    event.preventDefault();
    const elem = document.querySelector('#slide-out');
    const instance = M.Sidenav.getInstance(elem);
    instance.open();
  }

  return (
    <div className="App">
      <>
        <Router>
          <nav>
            <div className="nav-wrapper green lighten-2">
              <Link to="/" data-testid="brand-logo" className="brand-logo">Bexs</Link>
              <ul className="left hide-on-med-and-down">
                <li>
                  <a data-testid="open-sidebar" href="#" data-target="slide-out" onClick={doOpenSidebar}>
                    <i className="material-icons">menu</i>
                  </a>
                </li>
                <li>
                  <a href="#" data-target="slide-out" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <ul data-testid="slide-out" id="slide-out" className="sidenav">
            <li><Link to="/">Home</Link></li>
            <li><a href="https://www.linkedin.com/in/marivaldo-sena-6b65b3105/" target="_blank">My LinkedIn</a></li>
            <li><a href="https://github.com/marivaldosena/" target="_blank">My Github</a></li>
            <li><a href="https://www.bexs.com.br/" target="_blank">About Bexs</a></li>
            <li><a href="https://bitbucket.org/bexstech/bexs-full-stack-exam/src/master/" target="_blank">Test Info</a></li>
          </ul>
          <div className="container">
            <Routes />
          </div>
        </Router>
      </>
    </div>
  );
}

export default App;
