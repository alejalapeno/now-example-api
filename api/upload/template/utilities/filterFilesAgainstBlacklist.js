const filterFilesAgainstBlacklist = (files) => {
	const blacklist = [
		'__MACOSX',
		'Thumbs.db',
	];

	const filteredFiles = files.filter(({entryName}) => {
		return !blacklist.some((item) => {
			return entryName.includes(item);
		});
	});

	return filteredFiles;
};

export default filterFilesAgainstBlacklist;
