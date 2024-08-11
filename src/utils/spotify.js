import axios from 'axios';

export const redirectToSpotifyAuth = () => {
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const redirect_uri = import.meta.env.VITE_CLIENT_REDIRECT_URI; // This should be the same as the one registered in your Spotify App
  const scopes = 'playlist-modify-public playlist-modify-private';

  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  window.location.href = authUrl;
};


export const getSpotifyToken = async (setToken) => {
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const client_secret = import.meta.env.VITE_CLIENT_SECRET;

	try {
		const response = await axios.post('https://accounts.spotify.com/api/token', 
		'grant_type=client_credentials',
			{
				headers: {
					'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		);
		setToken(response.data.access_token);
	} catch (error) {
		console.error('Error fetching the token:', error);
	}
}

export const getSpotifyTokenFromCode = async (code) => {
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const client_secret = import.meta.env.VITE_CLIENT_SECRET;
  const redirect_uri = 'YOUR_REDIRECT_URI';

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirect_uri)}`, 
      {
        headers: {
          'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error('Error fetching the token:', error);
  }
};


export const searchSpotify = async (token, query, setFilteredTracks) => {
	if (!token) {
		await getSpotifyToken();
	}

	if (query.length === 0) {
		return;
	}

	if (query.length > 0) {
		try {
			const response = await axios.get('https://api.spotify.com/v1/search', {
				headers: {
					'Authorization': 'Bearer ' + token
				},
				params: {
					q: query,
					type: 'track,artist',
					limit: 20// Adjust the limit as needed
				}
			});
			setFilteredTracks(response.data.tracks.items);
			console.log(response.data);
		} catch (error) {
			console.error('Error searching Spotify:', error);
		}
	}
};

export const getArtist = async (token, artistId, setArtist) => {
	if (!token) {
		await getSpotifyToken();
	}

	try {
		const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		});
		setArtist(response.data);
	} catch (error) {
		console.error('Error fetching artist:', error);
	}
}

export const savePlaylist = async (token, playlistName, selectedTracks, setSavedPlaylists) => {
	
	if (!token) {
		console.error('Failed to retrieve token.');
		await getSpotifyToken();
		alert('Failed to retrieve token. Please try again.');
		return;
	}


	const data = {
		name: playlistName,
		public: false,
		collaborative: false,
		description: '',
		tracks: {
			items: selectedTracks.map(track => ({
				uri: `spotify:track:${track.id}`
			}))
		}
	};

	try {
		const response = await axios.post('https://api.spotify.com/v1/users/me/playlists', data, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		setSavedPlaylists({[playlistName]: selectedTracks})
		console.log ("Saved Playlists", response.data)
	} catch (error) {
		if (error.response && error.response.status === 401) {
				console.error('Unauthorized: Check your token and scopes.');
		} else {
				console.error('Error saving playlist:', error);
		}
	}
}