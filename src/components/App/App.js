//import logo from './logo.svg';
import React from 'react';
import { render } from 'react-dom';
import './App.css';
import { SearchBar } from '../Searchbar/Searchbar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlists } from '../Playlists/Playlists';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      /* searchResults: [{ name: 'name1', artist: 'artist1', album: 'album1', id: 11 },
      { name: 'name2', artist: 'artist2', album: 'album2', id: 22 },
      { name: 'name3', artist: 'artist3', album: 'album3', id: 33 }], */
      playlistName: 'any string',
      playlistTracks: []
        /* { name: 'name1', artist: 'artist1', album: 'album1', id: 1 },
      { name: 'name2', artist: 'artist2', album: 'album2', id: 2 },
      { name: 'name3', artist: 'artist3', album: 'album3', id: 3 } */
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      console.log('hello');
      return;
    } else {
      //let added = this.state.playlistTracks;
      //console.log(added);
      //console.log(track);
      //added=added.concat(track);
      //console.log(added);
      this.setState({ playlistTracks: this.state.playlistTracks.concat(track) });
      //console.log(this.playlistTracks);
    }

  }

  removeTrack(track) {
    //let deleted;
    //deleted = this.state.playlistTracks.filter(deletedTrack => deletedTrack.id !== track.id);
    this.setState(
      {
        playlistTracks: this.state.playlistTracks.filter(deletedTrack => deletedTrack.id !== track.id)
      }
    );
  }

  updatePlaylistName(name) {
    this.setState(
      {
        playlistName: name
      }
    );
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    }

    )
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    })
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlists
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  };

}



export default App;
