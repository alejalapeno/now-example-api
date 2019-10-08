import AdmZip from 'adm-zip';

const unzip = (file) => {
	let zip;
	try {
		zip = new AdmZip(file);
	} catch (e) {
		throw new Error('isNotZip');
	}
	const zipEntries = zip.getEntries();

	return zipEntries;
};

export default unzip;
