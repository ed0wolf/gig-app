import React from 'react';
import { Link } from 'react-router-dom';

export default class BandList extends React.Component {
    render() {
        return (
            <div className="col-md-4">
                <Link to={`/artist/${this.props.id}`} ><strong>{this.props.name}</strong></Link>
            </div>
        );
    }
}