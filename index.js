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
      //Grab a reference to the element with class name "posts" in memory
     let formDiv = document.querySelector(`.submissionform`)
      //insert HTML for submission form into page for signed in user 
     formDiv.insertAdjacentHTML(`beforeend`, `
      <div class=" md:px-16 px-0 md:w-1/2 w-full mx-auto">
      <div>
        <form class="w-full mt-8">
          <input type="text" id="chatroomname" name="chatroomname" placeholder="Chatroom Name" class="my-2 p-2 w-64 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">
          <button id="submit-button" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">Create New</button>
          <p>Click on a chatroom to Join, or Create a new one!</p>
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
        // Write the json-formatted data to the console in Chrome
        //console.log(json)
    // 🔥🔥🔥Query Database structure to pull information for use in populating chatroom browser list ends here🔥🔥🔥


    // 🔥🔥🔥Populate chatroom HTML for signed-in users🔥🔥🔥
        //loop through the chatroom data
        for (let i=0; i < json.length; i++ ){
        //Declare variable for the chatroom name
        let chatroomName = json[i].roomName
        //Declare variable for the number of posts
        let numberOfPosts = json[i].numberOfPosts
        //insert HTML for chatroom information into the page
        //Grab a reference to the element with class name "posts" in memory
        let chatDiv = document.querySelector(`.chatrooms`)
        //insert HTML for submission form into page for signed in user 
          chatDiv.insertAdjacentHTML(`beforeend`, `
          <div class="py-2 md:px-32 px-0 md:w-1/2 w-full mx-128">
            <div class="w-64 border-4 border-borderColor-900 p-4 my-4 text-left">
              <div class="flex">
                <div class="w-full">
                  <h2 class="text-2xl py-1 text-blue-500 underline"><a href="chatroom.html?chatroomname=${chatroomName}">${chatroomName}</a><h2>
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
    // 🔥🔥🔥Known Issue: it's possisble to keep making new rooms with the same exact title, this will need to be fixed with an if statement🔥🔥🔥
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
          // - Construct a URL to send user to new chatroom
          // Build the URL for our create new chatroom API
          let url = `/.netlify/functions/createroom?chatroomname=${newChatroomName}`
          //console.log(url)
          // Fetch the url, wait for a response, store the response in memory
          let response = fetch(url)
          // refresh the page
          location.replace(`chatroom.html?chatroomname=${newChatroomName}`)
        }})
    // 🔥🔥🔥Create new chatroom functionality starts here🔥🔥🔥















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
