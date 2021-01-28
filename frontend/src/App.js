import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {useAuth} from './util/authProvider'
// import { Button } from 'react-bootstrap';

import LoginView from './components/login/LoginView';
import HomeView from './components/homeView/HomeView';


function App() {
    const [logged] = useAuth();

    

    return (
        <div className="wrapper">
            {!logged && <>
                <LoginView />
            </>}
            {logged && <>
                <HomeView/>
            </>}
        </div>
    );
}

export default App;