/**
 * take gp-repo-config.json and change relevant files
 */

const fs = require('fs');
const path = require('path');
const config = require('./gp-repo-config.json');
const cypress = require('./cypress.json');
// set the CODEOWNERS file

/**
use the format
```
# Maintainers for gp-${config.SERVICE_NAME}-service repository
 * ${config.CODEOWNERS}
```
 */
const codeowners = `# Maintainers for gp-${config.SERVICE_NAME}-service repository
* ${config.CODEOWNERS.join(' ')}`;

// write the file to .github/CODEOWNERS
fs.writeFileSync(path.join(process.cwd(), '.github/CODEOWNERS'), codeowners);

// replace the url in README.md

// replace the url in any templates ?

// read package.json file and replace the url `gp-template-nodejs-service` with config.SERVICE_NAME

const package = require('./package.json');
package.repository.url = `git+https://github.com/globalization-partners/gp-${config.SERVICE_NAME}-service.git`;
// change description
package.description = `package for ${config.SERVICE_NAME} service`;
package.name = `@globalization-partners/${config.SERVICE_NAME}`;
// change keywords
package.keywords = ['globalization', 'partners', 'service', 'nodejs', 'javascript', 'typescript', 'react', config.SERVICE_NAME];
// save package

// for each service in config.SERVICES add to dependencies

const dependencies = {};
config.SERVICES.forEach((service) => {
  // get version from package.json defined in ../${service}/package.json
  // assumes all repos needed are in parent directory

  const version = require(path.join(process.cwd(), '../', service, 'package.json')).version;
  dependencies[`${service}`] = version;
});

// change cypress baseUrl
cypress.baseUrl = config.TEAM_URL;

// write cypress json
fs.writeFileSync(path.join(process.cwd(), 'cypress.json'), JSON.stringify(cypress, null, 2));

// write package json
fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(package, null, 2));

// search all files in current folder for gp-template-nodejs-service and replace with config.SERVICE_NAME
fs.readdirSync(process.cwd()).forEach((file) => {
  // exclude node_modules gp-setup.js and gp-repo-config.json
  if (file !== 'node_modules' && file !== 'gp-setup.js' && file !== 'gp-repo-config.json') {
    const data = fs.readFileSync(path.join(process.cwd(), file)).toString('utf-8');
    if (data.includes('gp-template-nodejs-service')) {
      fs.writeFileSync(
        path.join(process.cwd(), file),
        data.replace('gp-template-nodejs-service', config.SERVICE_NAME)
      );
    }
  }
});
