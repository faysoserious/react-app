import React from 'react';
import './TrackLists.css';
import { Track } from '../Track/Track';

export class TrackLists extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return (
                            <Track
                                track={track}
                                key={track.id}
                                onAdd={this.props.onAdd}
                                onRemove={this.props.onRemove}
                                isRemoval={this.props.isRemoval}
                            />
                        );
                    })
                }
            </div>
        )
    }
}

