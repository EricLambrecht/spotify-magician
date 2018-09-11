const fs = require('fs');
const packageJson = require('../package.json');
const version = packageJson.version;

const stream = fs.createWriteStream("src/version.json");
stream.once('open', function() {
  stream.write('{\n');
  stream.write(`  "version": "${version}"\n`);
  stream.write('}\n');
  stream.end();
});