import PropTypes from 'prop-types';
import TailwindSpinner from './Spinner';

const Track = ({ track, handleAddTrack, inPlaylist, handleRemoveTrack }) => {


  if (!track || !track.name || !track.artists || !track.artists.length) {
    return (
		<div className="flex flex-col gap-2 items-center justify-between pr-4">
			<TailwindSpinner />
		</div>
	); // or return a loading spinner or placeholder
  }

		return (
			<div className="flex flex-row gap-2 items-center justify-between pr-4">
				<div className="flex  flex-col text-lg text-left font-bold p-5 rounded-lg  h-full ">
					<h5 className='text-slate-50'>{track.name}</h5>
					<h6 className="text-sm text-slate-300">{track?.artists[0]?.name}</h6>
				</div>
					{!inPlaylist ? (
						<button 
							onClick={handleAddTrack}
							data-object={JSON.stringify(track)} 
							type='button'
							className="flex flex-col items-center bg-slate-300 opacity-75 text-black w-10 h-10 font-bold text-xl p-1 text-center rounded-full transition-all hover:bg-lime-500 ">
						+
					</button>
					) : (
					<button 
						onClick={handleRemoveTrack}
						data-object={JSON.stringify(track)} 
						type='button'
						className="flex flex-col items-center bg-slate-300 opacity-75 text-black  w-10 h-10 font-bold text-xl p-1 text-center rounded-full transition-all hover:bg-rose-500 ">	
						<div className='text-center self-center'>-</div>
					</button>
					)}
			</div>
		)
}

Track.propTypes = {
	track: PropTypes.shape({
		name: PropTypes.string,
		artists: PropTypes.array,
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	}),
	handleAddTrack: PropTypes.func,
	handleRemoveTrack: PropTypes.func,
	inPlaylist: PropTypes.bool
};

export default Track