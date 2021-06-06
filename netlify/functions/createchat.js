// Goal: Provide a function to create a new comment in Firebase

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/createchat?userName=xxxxxxxxx&body=dogsaresocute&chatroomname=dogs

exports.handler = async function(event) {
  // get the three querystring parameters and store in memory
  let chatroomName = event.queryStringParameters.chatroomname
  let userName = event.queryStringParameters.userName
  let body = event.queryStringParameters.body

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new post, wait for it to return
  await db.collection(`messages`).add({
    chatroom: chatroomName,
    userName: userName,
    body: body,
    time: firebase.firestore.FieldValue.serverTimestamp()
  })

  return {
    statusCode: 200
  }
}