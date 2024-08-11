import './App.css'
import { useState, useEffect } from 'react'
import Tracklist from './components/Tracklist'
import Playlist from './components/Playlist';
import SuccessModal from './components/SucessModal';
import { getSpotifyToken, searchSpotify, savePlaylist } from './utils/spotify';
import Redirect from './components/Redirect';


function App() {
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRequest, setSearchRequest] = useState('');
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [savedPlaylists, setSavedPlaylists] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  
  useEffect(() => {
    const initialize = async () => {
      await getSpotifyToken(setToken);
    };
    initialize();
  }, []);

  
  useEffect(() => {
    if (searchRequest.length > 0) {
    fetch('/data/tracks.json')
      .then(response => response.json())
      .then(data => {
        setTracks(data)
        setFilteredTracks(data)
      })
      .catch(error => console.error('Error fetching data:', error));
    }
  }, [searchRequest.length]);

  useEffect(() => {
    const results = tracks.filter(track => 
      track.name.toLowerCase().includes(searchRequest.toLowerCase())||
      track.artist.toLowerCase().includes(searchRequest.toLowerCase()) ||
      track.album.toLowerCase().includes(searchRequest.toLowerCase()) ||
      track.year.toString().includes(searchRequest.toLowerCase())
    )

    setFilteredTracks(results)
    
  }, [tracks, searchRequest]);
  
  const handleSearch = e => setSearchQuery(e.target.value)

  const handleSearchRequest = e => {
    e.preventDefault()
    
    if (searchQuery.length > 0) {
      setSearchRequest(searchQuery)
    }

    const performSearch = async () => {
      await searchSpotify(token, searchQuery, setFilteredTracks);
    };
    
    performSearch();

  }

  const handleAddTrack = e => {
    e.preventDefault()

    const dataObjectString = e.currentTarget.getAttribute('data-object');
    const dataObject = JSON.parse(dataObjectString);
  
    if (!selectedTracks.find(track => track.id === dataObject.id)) {
      setSelectedTracks([...selectedTracks, dataObject])
      console.log("Track added to playlist")
    }
  }

  const handleRemoveTrack = e => {
    e.preventDefault() 

    const dataObjectString = e.currentTarget.getAttribute('data-object');
    const dataObject = JSON.parse(dataObjectString);

    setSelectedTracks(selectedTracks.filter(track => track.id !== dataObject.id))
  }

  const handleSavePlaylist = e => {
    e.preventDefault()

    if (selectedTracks.length === 0) {
      alert("Please select at least one track to save")
      return
    }
    if (selectedTracks.length > 0 && playlistName.length > 0) {
      setSavedPlaylists({[playlistName]: selectedTracks})
      savePlaylist(token, playlistName, selectedTracks, setSavedPlaylists)
      console.log ("Saved Playlists", savedPlaylists)
    }

    setTimeout(() => {
      setPlaylistName('New Playlist')
      setSelectedTracks([])
      setTracks([])
      setFilteredTracks([])
      setSearchQuery('')
      setIsModalOpen(true)
    }, 100)
  }

  const onModalClose = () => {
    setIsModalOpen(false)
  }

  const onRedirect = () => {
    setIsRedirect(true)
  }

  return (
    <div>
      <div className='bg-teal-400 bg-gradient-to-r from-teal-400 to-lime-600 p-5 rounded-[32px] h-full flex flex-col gap-8'>
      
        <form 
          className='flex flex-col gap-3 w-48 h-full mx-auto'
          onSubmit={handleSearchRequest}>
          <h1 className='text-4xl font-bold text-slate-50 mx-auto w-96 text-left pb-4'>
            Spotify Jamming
          </h1> 
          <input 
            type='text' 
            value={searchQuery}
            onChange={handleSearch}
            placeholder='Track name, artist, etc...'
            className='w-64 h-10 text-lg font-bold rounded-lg bg-emerald-900 p-1  text-slate-50 text-center'
          />
          <button 
            type='submit'
            className='w-64 h-10 text-xl font-bold rounded-lg bg-slate-50 text-slate-900 px-24 text-center transition-all hover:bg-slate-300'>
              Search
          </button>
        </form>
      </div>
      <div className='grid grid-cols-2 gap-16 h-full mt-10'>
        <Tracklist 
          filteredTracks={filteredTracks} 
          handleAddTrack={handleAddTrack} 
          handleRemoveTrack={handleRemoveTrack} />
        <Playlist 
          selectedTracks={selectedTracks} 
          handleRemoveTrack={handleRemoveTrack} 
          playlistName={playlistName} 
          setPlaylistName={setPlaylistName}
          handleSavePlaylist={handleSavePlaylist} />
      </div>
      <SuccessModal 
        onModalClose={onModalClose} 
        isModalOpen={isModalOpen} 
        modalMessage={playlistName} />
      <Redirect 
        setToken={setToken}
        isRedirect={isRedirect}
        onRedirect={onRedirect} />
    </div>
  )
}

export default App
