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

  // 🔥🔥🔥Populate chatroom title from query string parameters🔥🔥🔥
  // defines a lambda function
  let params = (new URL(document.location)).searchParams;
  let chatroomName = params.get("chatroomname");
  //redirect user back to chatroom browser list if they try to be sneaky and go straight to chatroom.html
  if (chatroomName == null){document.location.href = `index.html`}
  let titleDiv = document.querySelector(`.roomTitle`)
        //insert HTML for submission form into page for signed in user 
          titleDiv.insertAdjacentHTML(`beforeend`, `
          <div class="py-8 px-8 md:px-8 py-8 md:w-1/2 w-full mx-auto text-center text-blue-500">
    
    <div class="md:mx-0 mx-4"><span class="font-bold text-4xl bg-clip-text">${chatroomName}</span></div>
            `)
  // 🔥🔥🔥Populate chatroom title from query string parameters🔥🔥🔥

    // 🔥🔥🔥Query Database structure to pull information for use in populating chatroom messages for a specific chatroom🔥🔥🔥
        // Build the URL for our chatroomdata API
        let url = `/.netlify/functions/messages?chatroomname=${chatroomName}`
        // Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
        // Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
        // Write the json-formatted data to the console in Chrome
        //console.log(json)
    // 🔥🔥🔥Query Database structure to pull information for use in populating chatroom messages ends here🔥🔥🔥

    // 🔥🔥🔥Populate chatroom messages from JSON🔥🔥🔥
        //loop through the chatroom data
        for (let i=0; i < json.length; i++ ){
          //Declare variable for the Username
          let userName = json[i].userName
          //Declare variable for time stamp
          let time = json[i].time.seconds

          let unix_timestamp = time
          // Create a new JavaScript Date object based on the timestamp
          // multiplied by 1000 so that the argument is in milliseconds, not seconds.
          date = new Date(unix_timestamp * 1000);
          // Hours part from the timestamp
          hours = date.getHours();
          // Minutes part from the timestamp
          minutes = "0" + date.getMinutes();
          // Seconds part from the timestamp
          seconds = "0" + date.getSeconds();
          // Will display time in 10:30:23 format
          timeStamp = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          //Declare variable for the message body
          let messageBody = json[i].body
          //insert HTML for chatroom information into the page
          //Grab a reference to the element with class name "posts" in memory
          let messageDiv = document.querySelector(`.messages`)
          //insert HTML for submission form into page for signed in user 
            messageDiv.insertAdjacentHTML(`beforeend`, `
            <p class="font-light mt-4 text-gray-800"> ${userName} @ (${date} ${timeStamp}) said:</p> 
            <p2 class="font-semibold mt-4 text-blue-600">${messageBody}
              `)
            }
    // 🔥🔥🔥Populate Chatroom messages from JSON ends here🔥🔥🔥

    // 🔥🔥🔥Create a new chat function starts here🔥🔥🔥
    // /.netlify/functions/createchat?userName=xxxxxxxxx&body=dogsaresocute&chatroomname=dogs
      document.getElementById("comment-button").addEventListener(`click`, function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
      // - Get a reference to the element containing the user-entered new chatroom Name
      let bodyInput = document.querySelector(`#comment`)
      // - Get the user-entered name from the element's value
      let body = bodyInput.value
      // - Check to see if the user entered anything; if so:
      if (body.length > 0) {
        // - Construct a URL to create new chat and reload page
        // Build the URL for our create new chatroom API
        let url = `/.netlify/functions/createchat?userName=${user.displayName}&body=${body}&chatroomname=${chatroomName}`
        // Fetch the url, wait for a response, store the response in memory
        let response = fetch(url)
        // refresh the page with a 1 second delay to avoid beating the database update
        setTimeout(() => {location.reload()}, 1000);
        //lets the user know we're sad that they didn't type anything
      } else {alert(`You didn't type anything :(`)}
    })
    // 🔥🔥🔥Create a new chat function ends here🔥🔥🔥
    } else {
      // user is not logged-in, so redirect to home screen
      document.location.href = `index.html`
    }
    })
  