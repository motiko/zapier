// const RequirementResource = require('./resources/requirement');
const RequirementCreate = require('./creates/requirement')
const includeApiKeyHeader = (request, z, bundle) => {
  if (bundle.authData.api_key) {
    request.params = request.params || {};
    request.params.api_key = bundle.authData.api_key;
  }
  return request;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: {
    type: 'custom',
    fields: [
      {key: 'api_token', label: 'API Token', required: true, type: 'string'},
      {key: 'developer_email',label: 'Developer Email',required: true, type: 'string'}
    ],
    test: (z, bundle) => {
      const promise = z.request(`http://edbe27ac.ngrok.io/api/v2/projects.json?developer_email=${bundle.authData.developer_email}&api_token=${bundle.authData.api_token}`);
      return promise.then((response) => {
        if (response.status < 200 || response.status >= 400 ) {
          throw new Error('Invalid API Key');
        }
      });
    }
  },

  beforeRequest: [
    includeApiKeyHeader
  ],

  afterResponse: [
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
    // [RequirementResource.key]: RequirementResource,
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [RequirementCreate.key]: RequirementCreate
  }
};

// Finally, export the app.
module.exports = App;
