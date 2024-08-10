import { PropTypes } from 'prop-types';


const SuccessModal = ({ isModalOpen, onModalClose, modalMessage }) => {
  
	if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm transition-all bg-gradient-to-l from-teal-500 via-purple-400 to-indigo-400  animated-background ">
        <div className="flex justify-end">
        
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-50 mt-4">{`Playlist ${modalMessage} saved!`}</h2>
          <button
            onClick={onModalClose}
            className="mt-6 px-10 py-2 bg-lime-600 text-white text-lg font-bold rounded-full w-full hover:bg-green-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
	isModalOpen: PropTypes.bool.isRequired,
	onModalClose: PropTypes.func.isRequired,
	modalMessage: PropTypes.string.isRequired,
}

export default SuccessModal;