const baseUrl = require('../config').baseUrl

const parseJSON = response => JSON.parse(response.content)

function toDropDown(response){
  return response.data.map( user => ({id: user.id, name: user.attributes["display-name"]}))
}

module.exports = {
  key: 'user',
  noun: 'User',

  list: {
    display: {
      label: 'Users',
      description: 'Lists the users.'
    },
    operation: {
      perform: (z, bundle) => {
        return z.request({url:`${baseUrl}/api/v2/users.json`})
          .then(parseJSON).then(toDropDown)
      }
    }
  }
}
