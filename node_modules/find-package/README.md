# find-package
Find the nearest package.json in your current node module.

## How does it works?
The find-package module will look upstream in every paren directory until it finds a package.json file or return null.
If it finds a package.json, it wild require it and return it as an object.

## Install

```
npm install find-package

```

## Usage

If you need to access the information in the package.json of your module, simply require the find-package module and pass either `__dirname` or `process.cwd()` as the directory from where to look:

```
var findPackage = require('find-package');

console.log(findPackage(__dirname).name);
//Should return the name of the current module
//as appears in the package.json

```

## addPaths option

If you pass true as the second argument of find-package, the module will add paths object to the package.json. This object will have a `relative` and an `absolute` properties, with the correspondent relative and absolute paths to the package.json. The relative path is relative to the script calling the find-package module:

```
var package = require('find-package')(__diname, true);

package.paths.relative //string with the relative path to package.json
package.paths.absolute //string with the absolute path to package.json

```

## Disclaimer

This modules has been tested only in a UNIX environment. Although, theoretically, it should also work with Windows. If that is not the case, please let me know.
