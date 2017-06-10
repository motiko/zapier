const baseUrl = require('../config').baseUrl

module.exports = {
  key: 'requirement',

  noun: 'Requirement',
  display: {
    label: 'Create Requirement',
    description: 'Creates a new requirements.'
  },

  operation: {
    inputFields: [
      {key: 'projectId', required: true, label: 'Project ID',  dynamic: 'projectList.id.name'},
      {key: 'name', required: true, type: 'string'},
      {key: 'description', required: false, type: 'text'},
      {key: 'authorId', required: true, type: 'integer', label: 'Author ID'},
      {key: 'assignedToId', required: false, type: 'text'},
      {key: 'version', required: false, type: 'text'},
      {key: 'priority', required: false, type: 'text'},
      {key: 'parentId', required: false, type: 'integer'},
      {key: 'traceability', required: false, type: 'integer'}
    ],
    perform: (z, bundle) => {
      const attributes = {
        name: bundle.inputData.name,
        description: bundle.inputData.description,
        "author-id": bundle.inputData.authorId,
        "assigned-to-id": bundle.inputData.assignedToId,
        version: bundle.inputData.version,
        priority: bundle.inputData.priority,
        "parent-id": bundle.inputData.parentId
      }
      var bodyObj = {
          data:{
            type: "requirements",
            attributes
          }
        }
      if(bundle.inputData.traceability) bodyObj.traceability = {"test-ids": bundle.inputData.traceability}
      const promise = z.request({
        url: `${baseUrl}/api/v2/projects/${bundle.inputData.projectId}/requirements.json`,
        method: 'POST',
        body: JSON.stringify(bodyObj),
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
      {key: 'author-id', label: 'Author ID'},
      {key: 'assignedToId', label: 'Assigned To'},
      {key: 'version', label: 'Version'},
      {key: 'priority', label: 'Priority'},
      {key: 'parentId', label: 'Parent ID'}
    ]
  }
};
