import PropTypes from 'prop-types';

const Track = ({ track, handleAddTrack, inPlaylist, handleRemoveTrack }) => {
	
	
	if (track.id) {
		return (
				<div className="flex flex-row gap-2 items-center justify-between">
					<div className="flex flex-col text-lg text-left font-bold p-5 rounded-lg bg-slate-300 h-full">
						<h5>{track.name}</h5>
						<h6 className="text-sm text-slate-700">{track.artist}</h6>
					</div>
						{!inPlaylist ? (
							<button 
								onClick={handleAddTrack}
								value={Number(track.id)}
								type='button'
								className="bg-emerald-600 text-white text-sm p-3 rounded-full">
							Add to playlist
						</button>
						) : (
							<button 
								onClick={handleRemoveTrack}
								value={Number(track.id)}
								type='button'
								className="bg-emerald-600 text-white text-sm p-3 rounded-full">
							Remove from playlist
							</button>
						)}
				</div>
			)
	}
}

Track.propTypes = {
	track: PropTypes.shape({
		name: PropTypes.string,
		artist: PropTypes.string,
		id: PropTypes.string
	}),
	handleAddTrack: PropTypes.func.isRequired,
	handleRemoveTrack: PropTypes.func.isRequired,
	inPlaylist: PropTypes.bool
};

export default Track