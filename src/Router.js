import React, { Component } from 'react';

import Home from './pages/Home';

import { BrowserRouter, Route } from 'react-router-dom';


class Router extends Component {
    render() {
        return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home}/>
            </div>
        </BrowserRouter>
        );
    }
}

export default Router;