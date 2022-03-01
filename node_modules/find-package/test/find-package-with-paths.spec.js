var findPackage = require('../index');
var packageJSON = require('../package.json');
var expect = require('chai').expect;
var path = require('path');

describe('A test suite for the find-package module with paths option', function() {
  before(function(){
    this.packageFound = findPackage(__dirname, true);
  });

  it('should have the same properties as the package.json', function() {
    expect(this.packageFound.name).to.equal(packageJSON.name);
    expect(this.packageFound.version).to.equal(packageJSON.version);
  });

  it('should have the paths property', function() {
    var absolutePath = this.packageFound.paths.absolute;
    var actualPath = __dirname + '/package.json';
    expect(this.packageFound).to.have.property('paths');
    expect(this.packageFound.paths.relative).to.equal(path.relative(__dirname, absolutePath));
    expect(absolutePath).to.equal(actualPath);
  });
});
