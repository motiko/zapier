// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
const baseUrl = 'http://edbe27ac.ngrok.io'

module.exports = {
  key: 'requirement',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Requirement',
  display: {
    label: 'Create Requirement',
    description: 'Creates a new requirements.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {key: 'name', required: true, type: 'string'},
      {key: 'authorId', required: true, type: 'integer', label: 'Author ID'},
      {key: 'projectId', required: true, type: 'integer', label: 'Project ID'},
      {key: 'description', required: false, type: 'text'}
    ],
    perform: (z, bundle) => {
      const promise = z.request({
        url: `${baseUrl}/api/v2/projects/${bundle.inputData.projectId}/requirements.json`,
        method: 'POST',
        body: JSON.stringify({
          data:{
            type: "requirements",
            attributes: {
              name: bundle.inputData.name,
              description: bundle.inputData.description,
              "author-id": bundle.inputData.authorId
            },
            traceability: {
              "test-ids": bundle.inputData.testIds
            }
          }

        }),
        headers: {
          'content-type': 'application/json'
        }
      });

      return promise.then((response) => JSON.parse(response.content));
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: 1,
      name: 'Login and Validation',
      authorId: 1,
      description: 'Test the login function and the user validation algoritm of the system'
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'},
      {key: 'description', label: 'Description'},
      {key: 'author-id', label: 'Author ID'}
    ]
  }
};
