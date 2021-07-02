import React from 'react';
import './SearchResults.css';
import { TrackLists } from '../TrackLists/TrackLists';

export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackLists
                    tracks={this.props.searchResults}
                    onAdd={this.props.onAdd}
                    isRemoval={false}
                />

            </div>
        );
    }
}

