import Track from "./Track"
import PropTypes from 'prop-types';

const Playlist = ({ 
	selectedTracks, 
	handleRemoveTrack, 
	playlistName, 
	setPlaylistName, 
	handleSavePlaylist }) => {
	
	return (
		<div className="flex flex-col h-fit gap-0 text-left font-bold p-5 pb-10 rounded-[32px] bg-slate-300 bg-gradient-to-tr from-rose-500 to-cyan-600 ">
			<input  className="bg-transparent outline-none text-xl focus:border-none focus:ring-0 focus:border-transparent text-slate-50 ring-0"  value={playlistName} onChange={e => setPlaylistName(e.target.value)}/> 
			{selectedTracks.map((track, i) => 
				<Track 
					key={i}
					track={track}
					inPlaylist={true}
					handleRemoveTrack={handleRemoveTrack} />)}
			<button onClick={handleSavePlaylist}>
				<h4 className='text-xl justify-end self-end p-2 mt-16 rounded-full transition-all bg-slate-50 hover:bg-slate-300'>Save playlist</h4>
			</button>
		</div>
	)
}

Playlist.propTypes = {
  selectedTracks: PropTypes.array.isRequired,
  handleRemoveTrack: PropTypes.func.isRequired,
	playlistName: PropTypes.string.isRequired,
	setPlaylistName: PropTypes.func.isRequired,
	handleSavePlaylist: PropTypes.func.isRequired,
};


export default Playlist