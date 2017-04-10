import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import ArtistOverview from './ArtistOverview';

export default class AppRoutes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <h1 className="page-title"><Link to="/">Gig App</Link></h1>

                    <Route exact path="/" component={Home}/>
                    <Route path="/artist/:id" component={ArtistOverview} />
                </div>
            </Router>
        );
    }
}