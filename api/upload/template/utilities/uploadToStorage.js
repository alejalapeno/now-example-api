import filterFilesAgainstBlacklist from './filterFilesAgainstBlacklist.js';
import {S3} from 'aws-sdk';

const uploadToStorage = (files) => {
	const filteredFiles = filterFilesAgainstBlacklist(files);

	// Create S3 service object
	const s3 = new S3({
		apiVersion: '2006-03-01',
		accessKeyId: process.env.NOW_AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.NOW_AWS_SECRET_ACCESS_KEY,
	});

	const upload = Promise.all(filteredFiles.map((file) => {
		const params = {
			Bucket: process.env.NOW_AWS_BUCKET_NAME,
			Key: file.entryName,
			Body: file.getData(),
		};

		return s3.upload(params).promise();
	})).catch(() => {
		throw new Error('s3Error');
	});

	return upload;
};

export default uploadToStorage;
