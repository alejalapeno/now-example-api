import multerMiddleware from './utilities/multerMiddleware.js';
import unzip from './utilities/unzip.js';
import uploadToStorage from './utilities/uploadToStorage.js';
import getError from '../../../utilities/errors.js';

const upload = async({files}, res) => {
	try {
		await Promise.all(files.map(async({buffer: file}) => {
			const zipEntries = unzip(file);
			await uploadToStorage(zipEntries);
		}));
	} catch (e) {
		const error = getError(e.message);
		res.status(error.code).json({error: error.message});

		return;
	}
	res.json({success: true});

	return;
};

// disable bodyParser in order for our middleware to work.
export const config = {api: {bodyParser: false}};

export default multerMiddleware(upload);
