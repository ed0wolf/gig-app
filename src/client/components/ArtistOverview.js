import React from 'react';
import {getArtistById} from '../stores/artistStore';

import GigsFilter from './GigsFilter';

export default class ArtistOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: null
        };
    }

    componentDidMount() {
        var self = this;
        getArtistById(self.props.match.params.id).then(response => {
            self.setState({
                artist: response.data
            });
        });
    }

    render() {
        if(!this.state.artist) {
            return (<div>Loading artist information...</div>)
        }
        return (
            <div className="artistOverview">
                <h2>{this.state.artist.name}</h2>
                <GigsFilter artistId={this.state.artist.id} />
            </div>
        );
    }
}