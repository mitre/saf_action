var parents = require('parents');
var fs = require('fs');
var path = require('path');

function findPath(dir) {
  var parentsArr = parents(dir);
  var i;
  for(i = 0; i < parentsArr.length; i++) {
    var config = parentsArr[i] + '/package.json';
    try {
      if(fs.lstatSync(config).isFile()) {
        return config;
      }
    }catch(e) {}
  }
  return null;
}

module.exports = function(dir, addPaths) {
  var pathToConfig = findPath(dir);
  var configJSON = null;
  if(pathToConfig !== null) configJSON = require(pathToConfig);
  if(configJSON && addPaths) {
    configJSON['paths'] = {
      'relative': path.relative(dir, pathToConfig),
      'absolute': pathToConfig
    };
  } else if(configJSON !== null) {
    delete configJSON.paths;
  }

  return configJSON;
};
