import { SearchBar } from "../components/Searchbar/Searchbar";

let userAccessToken;
const clientID = '7365ee20eadf42b08cb2d3a018f42e2f';
const redirectURL = 'http://localhost:3000/';
const Spotify = {
    getAccessToken() {
        if(userAccessToken) {
            return userAccessToken;
        }

        //the URL to see if it has just been obtained
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expireInMatch) {
            userAccessToken = accessTokenMatch[1];
            const expireIn = Number(expireInMatch[1]);
            window.setTimeout(() => userAccessToken='', expireIn * 1000);
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
            if(!jsonResponse.tracks) {
                return [];
            } else {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    URL: track.url

                }))
            }
        })
    }

}
export default Spotify;