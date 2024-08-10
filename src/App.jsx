import './App.css'
import { useState, useEffect } from 'react'
import Tracklist from './components/Tracklist'
import Playlist from './components/Playlist';


function App() {
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRequest, setSearchRequest] = useState('');
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);

  
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

  console.log("Filtered Tracks", filteredTracks)
  console.log("Selected Tracks", selectedTracks)

  return (
    <div>
      <div className='text-3xl font-bold text-emerald-600 bg-emerald-100 p-5 rounded-lg h-full flex flex-col gap-8'>
        Spotify Jamming
        
        <form 
          className='flex flex-col gap-4 w-48 h-full mx-auto'
          onSubmit={handleSearchRequest}>
          <input 
            type='text' 
            value={searchQuery}
            onChange={handleSearch}
            placeholder='Search...'
            className='w-full h-full rounded-lg bg-gray-100 p-1 text-black text-center'
          />
          <button 
            type='submit'
            className='w-full h-full rounded-lg bg-emerald-600 p-2 text-white text-center'>
              Search
          </button>
        </form>
      </div>
      <div className='grid grid-cols-2 gap-1 h-full mt-10'>
        <Tracklist filteredTracks={filteredTracks} handleAddTrack={handleAddTrack} handleRemoveTrack={handleRemoveTrack} />
        <Playlist selectedTracks={selectedTracks} handleRemoveTrack={handleRemoveTrack} />
      </div>
    </div>
  )
}

export default App
