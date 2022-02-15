var packageJSON = require('../package.json');
var expect = require('chai').expect;

describe('A test suite for the find-package module without paths option', function() {
  before(function() {
    this.packageFound = require('../index')(__dirname);
  });

  it('should have the same properties as the package.json', function() {
    expect(this.packageFound.name).to.equal(packageJSON.name);
    expect(this.packageFound.version).to.equal(packageJSON.version);
    expect(this.packageFound).to.deep.equal(packageJSON);
  });

  it('should not have the paths property', function() {
    expect(this.packageFound).to.not.have.property('paths');
  });
});
