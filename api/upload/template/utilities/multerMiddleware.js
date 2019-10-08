import multer from 'multer';

const multerMiddleware = (options, fn) => {
	if (!fn) {
		fn = options;
		options = {};
	}

	// Don't let multer write files to disk, keep them in memory (lamda => object storage)
	Object.assign(options, {storage: multer.memoryStorage()});

	const upload = multer(options).any();

	return (req, res) => {
		return new Promise((resolve) => {
			return upload(req, res, resolve);
		})
			.then(() => {
				return fn(req, res);
			});
	};
};

export default multerMiddleware;
