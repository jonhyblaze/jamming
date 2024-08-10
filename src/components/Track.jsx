import PropTypes from 'prop-types';
import { useState } from 'react';

const Track = ({ track, handleAddTrack, inPlaylist, handleRemoveTrack }) => {
	const [isAdded, setIsAdded] = useState(false);

	const handleAddTrackClick = (e) => {
		handleAddTrack(e,track)
		setIsAdded(true)
	}

	const handleRemoveTrackClick = (e) => {
		handleRemoveTrack(e, track)
		setIsAdded(false)
	}

		return (
				<div className="flex flex-row gap-2 items-center justify-between">
					<div className="flex  flex-col text-lg text-left font-bold p-5 rounded-lg bg-slate-300 h-full">
						<h5>{track.name}</h5>
						<h6 className="text-sm text-slate-700">{track.artist}</h6>
					</div>
						{!isAdded && !inPlaylist && (
							<button 
								onClick={handleAddTrackClick}
								data-object={JSON.stringify(track)} 
								type='button'
								className="bg-slate-600 text-white w-10 h-10 font-bold text-xl p-1 text-center rounded-full">
							+
						</button>
						)}  
						
						{isAdded && !inPlaylist && (
							<button 
								onClick={handleRemoveTrackClick}
								data-object={JSON.stringify(track)} 
								type='button'
								className="bg-slate-600 text-white w-10 h-10 font-bold text-xl p-1 text-center rounded-full">	
							-
							</button>
						)}
				</div>
			)
}

Track.propTypes = {
	track: PropTypes.shape({
		name: PropTypes.string,
		artist: PropTypes.string,
		id: PropTypes.number
	}),
	handleAddTrack: PropTypes.func.isRequired,
	handleRemoveTrack: PropTypes.func.isRequired,
	inPlaylist: PropTypes.bool
};

export default Track