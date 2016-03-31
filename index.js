'use strict';
var fs = require('fs');
var path = require('path');
var debug = require('debug')('link-directories');
var root = process.cwd();
var nodeModules = path.join(root, 'node_modules');
var packageJSON = path.join(root, 'package.json');
var json;
var links;
try {
  fs.statSync(packageJSON);
} catch(x) {
  debug('package.json does not exist here: %s', packageJSON);
  process.exit(1);
}

try{
  json = require(packageJSON);
} catch(x) {
  debug('failed to parse package.json from here: %s', packageJSON);
  process.exit(1);
}

links = json['link-directories'];
if (!Array.isArray(links)) {
  debug('links does not seem to an array: %j', links);
  process.exit(1);
}

try {
  fs.statSync(nodeModules);
} catch(x) {
  debug('does not exist %s, exiting', nodeModules);
  process.exit(0);
}

links.forEach(function(opts) {
  link(opts.src, opts.dest, {
    root: root
  });
});


function link(src, dest, options) {
  var parent = path.normalize(path.join(dest, '..'));
  var relSrc = path.relative(parent, src);
  try{
    debug('stating %s', dest);
    fs.statSync(dest);
  } catch(x) {
    if (x.code === 'ENOENT') {
      debug('link %s to %s', relSrc, dest);
      fs.symlinkSync(relSrc, dest, 'dir');
      return;
    }
    process.exit(1);
  }
}