import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { getSpotifyTokenFromCode } from '../utils/spotify';

const Redirect = ({	setToken, isRedirect }) => {
	useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code'); // Extract the authorization code

    if (code) {
      getSpotifyTokenFromCode(code).then(token => {
        setToken(token);
				console.log('Access token:', token);
      });
    }
  }, [setToken]);

	if (!isRedirect) return null;

  return <div>Redirecting...</div>;
};

Redirect.propTypes = {
	setToken: PropTypes.func.isRequired,
	isRedirect: PropTypes.bool.isRequired,
};

export default Redirect;
