const baseUrl = require('../config').baseUrl

const parseJSON = response => JSON.parse(response.content)

function toDropDown(response){
  return response.data.map( proj => ({id: proj.id, name: proj.attributes.name}))
}

module.exports = {
  key: 'instance',
  noun: 'Instance',

  list: {
    display: {
      label: 'Instances',
      description: 'Lists the instances.'
    },
    operation: {
      perform: (z, bundle) => {
        return z.request({url:`${baseUrl}/api/v2/projects/${bundle.inputData.projectId}/instances.json`})
          .then(parseJSON).then(toDropDown)
      }
    }
  }
}
