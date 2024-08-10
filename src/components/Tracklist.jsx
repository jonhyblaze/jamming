import Track from './Track'
import PropTypes from 'prop-types';

const Tracklist = ({ filteredTracks, handleAddTrack, handleRemoveTrack }) => {
	return (
		<div className="flex flex-col gap-0 text-left font-bold p-5 rounded-lg bg-slate-300">
			<h4 className='text-xl'>Search results</h4>
			{filteredTracks.map(track => 
				<Track 
					key={track.id}
					track={track}
					handleAddTrack={handleAddTrack}
					handleRemoveTrack={handleRemoveTrack} />)}
		</div>
		)
}

Tracklist.propTypes = {
	filteredTracks: PropTypes.array.isRequired,
	handleAddTrack: PropTypes.func.isRequired,
	handleRemoveTrack: PropTypes.func.isRequired
};

export default Tracklist