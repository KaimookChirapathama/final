// Goal: Provide a function to create a new post in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {
  // get the two querystring parameters and store in memory
  let newChatroomName = event.queryStringParameters.chatroomname
  
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new chatroom
  await db.collection(`chatrooms`).add({
    roomName: newChatroomName
  })

  return {
    statusCode: 200
  }
}