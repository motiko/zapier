// const RequirementResource = require('./resources/requirement');
const RequirementCreate = require('./creates/requirement')
const ProjectResource = require('./resources/project')
const UserResource = require('./resources/user')
const Authentication = require('./authentication')

const includeAuthenticationData = (request, z, bundle) => {
  if (bundle.authData.api_token) {
    request.params = request.params || {};
    request.params.api_token = bundle.authData.api_token;
    request.params.developer_email = bundle.authData.developer_email;
  }
  return request;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: Authentication,

  beforeRequest: [
    includeAuthenticationData
  ],

  afterResponse: [
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
    [ProjectResource.key]: ProjectResource,
    [UserResource.key]: UserResource
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
