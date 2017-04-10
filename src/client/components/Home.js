import React from 'react';
import ArtistTile from './ArtistTile'

import { getArtists } from '../stores/artistStore';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: []
        };
    }

    componentDidMount() {
        var self = this;
        getArtists().then(response => {
            self.setState({
                artists: response.data
            });
        });
    }

    render() {
        return (
            <div className="row">
                { this.state.artists.map(x => (<ArtistTile key={x.id} id={x.id} name={x.name} /> ) ) }
            </div>
        );
    }
}