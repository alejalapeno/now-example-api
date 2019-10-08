const errors = {
	isNotZip: {
		code: 415,
		message: 'Invalid file type: Please make sure the file you selected is a `.zip`.',
	},
	tooBig: {
		code: 413,
		message: 'File is too large: Please select a file below 200KB.',
	},
	s3Error: {
		code: 504,
		message: 'There was a problem uploading the assets. Please try again later.',
	},
};

const error = (name) => {
	return errors[name] ? errors[name] : {
		code: 400,
		message: 'oops',
	};
};

export default error;
