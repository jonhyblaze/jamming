import Track from "./Track"
import PropTypes from 'prop-types';

const Playlist = ({ selectedTracks, handleRemoveTrack }) => {
	return (
		<div className="flex flex-col gap-0 text-left font-bold p-5 rounded-lg bg-slate-300">
			<h4 className='text-xl'>Selected tracks</h4>
			{selectedTracks.map((track, i) => 
				<Track 
					key={i}
					track={track}
					inPlaylist={true}
					handleRemoveTrack={handleRemoveTrack} />)}
			<button>
				<h4 className='text-xl justify-end self-end p-2 mt-16 rounded-full bg-lime-500'>Save playlist</h4>
			</button>
		</div>
	)
}

Playlist.propTypes = {
  selectedTracks: PropTypes.array.isRequired,
  handleRemoveTrack: PropTypes.func.isRequired,
};


export default Playlist