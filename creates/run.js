const baseUrl = require('../config').baseUrl

module.exports = {
  key: 'run',

  noun: 'Test Run',
  display: {
    label: 'Create a Run',
    description: 'Create a run (Automated Test)'
  },

  operation: {
    inputFields: [
      {key: 'projectId', required: true, label: 'Project', dynamic: 'projectList.id.name'},
      {key: 'instance-id', required: true, label: 'Instance', dynamic: 'instanceList.id.name'},
      {key: 'exit-code', required: false, type: 'integer'},
      {key: 'run-duration', required: false, type: 'text'},
      {key: 'automated-execution-output', required: false, type: 'text'}
    ],
    perform: (z, bundle) => {
      const attributes = {
        "instance-id" : bundle.inputData["instance-id"],
        "exit-code" : bundle.inputData["exit-code"],
        "run-duration" : bundle.inputData["run-duration"],
        "automated-execution-output" : bundle.inputData["automated-execution-output"]
      }
      var bodyObj = {
          data:{
            type: "requirements",
            attributes
          }
        }
      if(bundle.inputData.traceability) bodyObj.traceability = {"test-ids": bundle.inputData.traceability}
      const promise = z.request({
        url: `${baseUrl}/api/v2/projects/${bundle.inputData.projectId}/runs.json`,
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
    "instance-id" : 1,
    "exit-code" : 1,
    "run-duration" : "00:01:30",
    "automated-execution-output" : "Test run passed"
  },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'instance-id'},
      {key: 'exit-code'},
      {key: 'run-duration'},
      {key: 'automated-execution-output'}
    ]
  }
};
