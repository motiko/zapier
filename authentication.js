const baseUrl = require('./config').baseUrl
module.exports = {
  type: 'custom',
  fields: [
    {key: 'api_token', label: 'API Token', required: true, type: 'string'},
    {key: 'developer_email',label: 'Developer Email',required: true, type: 'string'}
  ],
  test: (z, bundle) => {
    const promise = z.request(`${baseUrl}/api/v2/projects.json?developer_email=${bundle.authData.developer_email}&api_token=${bundle.authData.api_token}`);
    return promise.then((response) => {
      if (response.status < 200 || response.status >= 400 ) {
        throw new Error('Invalid API Key');
      }
    });
  }
}
