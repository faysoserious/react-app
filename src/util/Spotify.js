import { SearchBar } from "../components/Searchbar/Searchbar";

let userAccessToken;
const clientID = '7365ee20eadf42b08cb2d3a018f42e2f';
const redirectURL = 'http://localhost:3000/';
const Spotify = {
    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }

        //the URL to see if it has just been obtained
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expireInMatch) {
            userAccessToken = accessTokenMatch[1];
            const expireIn = Number(expireInMatch[1]);
            window.setTimeout(() => userAccessToken = '', expireIn * 1000);
            window.history.pushState('Access token', null, '/');
            return userAccessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
            window.location = accessURL;
        }


    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    URI: track.uri

                }))
            }
        })
    },
    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;

        const response = await fetch('https://api.spotify.com/v1/me', { headers: headers }
        );
        const jsonResponse = await response.json();
        userID = jsonResponse.id;
        const response_1 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            }
        );
        const jsonResponse_1 = await response_1.json();
        const playListID = jsonResponse_1.id;
        return await fetch(`https://api.spotify.com/v1/playlists/${playListID}/tracks`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackURIs })
            });

    }

}
export default Spotify;