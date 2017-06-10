const baseUrl = require('../config').baseUrl

const parseJSON = response => JSON.parse(response.content)

function toDropDown(response){
  return response.data.map( proj => ({id: proj.id, name: proj.attributes.name}))
}

module.exports = {
  key: 'project',
  noun: 'Project',

  list: {
    display: {
      label: 'Projects',
      description: 'Lists the projects.'
    },
    operation: {
      perform: (z, bundle) => {
        return z.request({url:`${baseUrl}/api/v2/projects.json`})
          .then(parseJSON).then(toDropDown)
      }
    }
  }
}
