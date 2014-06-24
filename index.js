var fs = require('fs');
var merge = require('deepmerge');

module.exports = config;

// main entry
function config(file, env) {
	if (!file) file = process.env.NODE_CONFIG_FILE || './config.json';
	if (!env) env = process.env.NODE_ENV || 'dev';
	
	var data = fs.readFileSync(file);
	var json = JSON.parse(data);
	
	return buildConfig(env, json);
}

// helper functions
function buildConfig(key, json) {
	function walkTree(obj) {
		var parentKey = obj.extends;
		
		if (parentKey) {
			checkKey(parentKey, json);
			
			tree.push(parentKey);
			config = merge(json[parentKey], config);
			
			walkTree(json[parentKey]);
		}
	}
	
	// start
	checkKey(key, json);
	
	var tree = [];
	var config = json[key];
	
	walkTree(json[key]);
	
	if (tree.length > 1) {
		// supplement the relationship tree
		config.extends = tree;
	}
	
	return config;
}

function checkKey(key, json) {
	if (!json[key]) {
		throw new Error(key + ' key not found');
	}
}