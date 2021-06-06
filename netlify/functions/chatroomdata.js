// Goal: Provide a function to return all posts and their comments from Firebase.

// allows us to use firebase
let firebase = require(`./firebase`)
// /.netlify/functions/posts
exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnValue = []
  // establish a connection to firebase in memory
  let db = firebase.firestore()
  // perform a query against firestore for all posts, wait for it to return, store in memory
  let chatroomsQuery = await db.collection(`chatrooms`).get()

  // retrieve the documents from the query
  let chatrooms = chatroomsQuery.docs
  // loop through the post documents
  for (let i=0; i < chatrooms.length; i++) {
    // get the id from the document
    let chatroomId = chatrooms[i].id
    // get the data from the document
    let chatroomData = chatrooms[i].data()

    //Query messages for displaying number of posts
    let messagesQuery = await db.collection(`messages`).where("chatroom","==", chatroomData.roomName).get()

    // create an Object to be added to the return value of our lambda
    let chatroomObject = {
      id: chatroomId,
      roomName: chatroomData.roomName,
      numberOfPosts: messagesQuery.size
    }
    // add the Object to the return value
    returnValue.push(chatroomObject)
  }
  //console.log(returnValue)
  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}