const config = {

	env: () => {
		return process.env;
	},

	get: (name) => {
		const env = config.env();
		return env[name];
	},

	getList: (prefix) => {
		const map = config.getMap(prefix);
		return Object.keys(map)
			.filter(key => /^[1-9][0-9]*$/.test(key))
			.map(key => ({ sort: parseInt(key), val: map[key] }))
			.sort((a, b) => a.sort - b.sort)
			.map(config => config.val)
	},

	getMap: (prefix) => {
		return Object.keys(config.env())
			.filter(key =>
				key.substr(0, prefix.length + 1) === prefix + '_'
				&& key.length > prefix.length + 1
			)
			.reduce((prevVal, currVal) => {
				prevVal[currVal.substr(prefix.length + 1)] = config.get(currVal);
				return prevVal;
			}, {})
	}

}

module.exports = config;
