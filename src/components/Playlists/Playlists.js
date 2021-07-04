import React from 'react';
import './Playlists.css';
import { TrackLists } from '../TrackLists/TrackLists';

export class Playlists extends React.Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(event) {
        const name = event.target.value;
        this.props.onNameChange(name);
    }
    render() {

        return (
            <div
                className="Playlist"
                onChange={this.handleNameChange}
            >
                <input defaultValue={'New Playlist'} />
                <TrackLists
                    tracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}

                />
                <button
                    className="Playlist-save"
                    onClick={this.props.onSave}
                > SAVE TO SPOTIFY </button>
            </div >
        );

    }
}