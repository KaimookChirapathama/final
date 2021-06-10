// Goal: Provide a function to return all posts from Firebase.

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnValue = []
  // establish a connection to firebase in memory
  let db = firebase.firestore()
  //Get the chatroom name from the querystring parameter
  let chatroomName = event.queryStringParameters.chatroomname
  // perform a query against firestore for all messages from our particular chatroom, wait for it to return, store in memory
  let messagesQuery = await db.collection(`messages`).where('chatroom', '==', chatroomName).get()
  // retrieve the documents from the query
  let messages = messagesQuery.docs

  // loop through the messages documents
  for (let i=0; i < messages.length; i++) {
    // get the id from the document
    let messageId = messages[i].id
    // get the data from the document
    let messageData = messages[i].data()
    // create an Object to be added to the return value of our lambda
    let messagesObject = {
      id: messageId,
      body: messageData.body,
      chatroom: messageData.chatroom,
      time: messageData.time,
      userName: messageData.userName
    }
    // add the Object to the return value
    returnValue.push(messagesObject)
    //sorts returnValue so messages will populate in order on page
    returnValue.sort((firstItem, secondItem) => firstItem.time - secondItem.time)
  }
  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}