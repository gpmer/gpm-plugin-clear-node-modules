/**
 * Created by axetroy on 17-3-10.
 */

const process = require('process');
const path = require('path');

const co = require('co');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs-extra'));

function existDir(dir) {
  return fs.readdirAsync(dir).then(() => Promise.resolve(true), () => Promise.resolve(false));
}

function clearNodeModule(done) {
  const cwd = process.cwd();
  const NODE_MODULES = path.join(cwd, 'node_modules');
  co(function *() {
    const existNodeModules = yield existDir(NODE_MODULES);
    if (existNodeModules == true) {
      yield fs.emptyDirAsync(NODE_MODULES);
      yield fs.removeAsync(NODE_MODULES);
    }
    done();
  }).catch((err) => done(err));
}

exports.foreach = clearNodeModule;