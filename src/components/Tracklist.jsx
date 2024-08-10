import Track from './Track'
import PropTypes from 'prop-types';

const Tracklist = ({ filteredTracks, handleAddTrack, handleRemoveTrack }) => {
	return (
		<div className="flex flex-col gap-0 text-left font-bold p-5 rounded-[32px] bg-slate-300 bg-gradient-to-t from-yellow-600 to-cyan-600 ">
			<h4 className='text-xl text-slate-50'>Search results</h4>
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