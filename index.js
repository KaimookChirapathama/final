// standard event listener for Firebase auth
firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {

    // 🔥🔥🔥Signout Button starts here🔥🔥🔥
    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>`
    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)
    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()
      // redirect to the home page
      document.location.href = `index.html`})
    // 🔥🔥🔥Signout Button ends here🔥🔥🔥

    // 🔥🔥🔥Populate Submission form for signed-in users🔥🔥🔥
      //Grab a reference to the element with class name "submissionform" in memory
     let formDiv = document.querySelector(`.submissionform`)
      //insert HTML for submission form into page for signed in user 
     formDiv.insertAdjacentHTML(`beforeend`, `
      <div class=" md:px-16 md:w-1/2 w-full mx-auto">
      <div>
        <form class="w-full mt-8">
          <input type="text" id="chatroomname" name="chatroomname" placeholder="New Chatroom Name" class="ml-16 my-4 p-2 w-64 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-green-500 focus:border-green-500">
          <button id="submit-button" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">Create New</button>
          <p class="text-center ml-16">Click on a chatroom below to join a conversation, or Create a new one above!</p>
        </form>
        </div>
      </div>
       `)
    // 🔥🔥🔥Populate Submission form for signed-in users ends here🔥🔥🔥

  
    // 🔥🔥🔥Query Database structure to pull information for use in populating chatroom browser list🔥🔥🔥
        // Build the URL for our chatroomdata API
        let url = `/.netlify/functions/chatroomdata`
        // Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
        // Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
    // 🔥🔥🔥Query Database structure to pull information for use in populating chatroom browser list ends here🔥🔥🔥


    // 🔥🔥🔥Populate chatroom HTML for signed-in users🔥🔥🔥
    //loop through the chatroom data
        for (let i=0; i < json.length; i++ ){
        //Declare variable for the chatroom name
        let chatroomName = json[i].roomName
        //Declare variable for the number of posts
        let numberOfPosts = json[i].numberOfPosts
        //insert HTML for chatroom information into the page
        //Grab a reference to the element with class name "chatrooms" in memory
        let chatDiv = document.querySelector(`.chatrooms`)
        //insert HTML for submission form into page for signed in user 
          chatDiv.insertAdjacentHTML(`beforeend`, `
          <div class="w-1/2 py-2 md:w-1/2 w-full mx-auto">
            <div class="w-300 border-2 border-blue-300 bg-green-50 p-4 my-4 text-center">
              <div class="flex">
                <div class="w-full">
                  <h2 class="text-2xl py-1 font-bold text-blue-500 underline"><a href="chatroom.html?chatroomname=${chatroomName}">${chatroomName} Chatroom</a><h2>
                </div>
              </div>
              <div class="mt-4 flex">
                <div class="w-full">
                  <div class="text-sm font-bold text-gray-600">Number of Posts:</div>
                  <p>${numberOfPosts}</p>
                </div>
              </div>
            </div>
            `)
          }
    // 🔥🔥🔥Populate Chatroom HTML for signed-in users ends here🔥🔥🔥

    // 🔥🔥🔥Create new chatroom functionality starts here🔥🔥🔥
      // When the "Create New" button is clicked:
      document.getElementById("submit-button").addEventListener(`click`, function(event) {
        // - Ignore the default behavior of the button
        event.preventDefault()
        // - Get a reference to the element containing the user-entered new chatroom Name
        let chatroomNameInput = document.querySelector(`#chatroomname`)
        // - Get the user-entered name from the element's value
        let newChatroomName = chatroomNameInput.value
        // - Check to see if the user entered anything; if so:
        if (newChatroomName.length > 0) {

          //checks to see if the room already exists
          if(window.find(newChatroomName) == false){         
          // - Construct a URL to send user to new chatroom
          // Build the URL for our create new chatroom API
          let url = `/.netlify/functions/createroom?chatroomname=${newChatroomName}`
          //console.log(url)
          // Fetch the url, wait for a response, store the response in memory
          let response = fetch(url)
          // refresh the page
          location.replace(`chatroom.html?chatroomname=${newChatroomName}`)
          //what to do if the typed in room already exists
          } 
        else{
          //Quick little function to deselect all text so that user cannot bypass my create chatroom blocking mechanism
          {if (window.getSelection) {window.getSelection().removeAllRanges();}
           else if (document.selection) {document.selection.empty();}}
          //Lets the user know that the chatroom already exists
          alert(`That chatroom already exists! Click the title to Join it!`)
        }
      }
      //lets the user know that we're sad they didn't type anything
      else {alert(`You didn't type anything :(`)}
    })
    // 🔥🔥🔥Create new chatroom functionality ends here🔥🔥🔥

} else {
  // 🔥🔥🔥Show Sign-in🔥🔥🔥
  // Initializes FirebaseUI Auth
  let ui = new firebaseui.auth.AuthUI(firebase.auth())

  // FirebaseUI configuration
  let authUIConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: `index.html` // Direct them back to Index again but signed in this time
  }
  // Starts FirebaseUI Auth
  ui.start(`.sign-in-or-sign-out`, authUIConfig)
  // 🔥🔥🔥Sign-in Ends here🔥🔥🔥
}
})
