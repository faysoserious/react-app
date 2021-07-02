//import logo from './logo.svg';
import React from 'react';
import { render } from 'react-dom';
import './App.css';
import { SearchBar } from '../Searchbar/Searchbar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlists } from '../Playlists/Playlists';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [{ name: 'name1', artist: 'artist1', album: 'album1', id: 1 },
                      { name: 'name2', artist: 'artist2', album: 'album2', id: 2 },
                      { name: 'name3', artist: 'artist3', album: 'album3', id: 3 }],
      playlistName: 'any string',
      playlistTracks: [{ name: 'name1', artist: 'artist1', album: 'album1', id: 1 },
                       { name: 'name2', artist: 'artist2', album: 'album2', id: 2 },
                       { name: 'name3', artist: 'artist3', album: 'album3', id: 3 }]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.state.playlistTracks.push(track);
    }

  }

  removeTrack(track) {
    let deleted;
    deleted = this.state.playlistTracks.filter(deletedTrack => deletedTrack.id !== track.id);
    this.state.playlistTracks = deleted;
  }

  updatePlaylistName(name) {
    this.state.playlistName = name;
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlists 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName}
            /> 
          </div>
        </div>
      </div>
    );
  };

}



export default App;
