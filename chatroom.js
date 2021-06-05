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
  let titleDiv = document.querySelector(`.roomTitle`)
        //insert HTML for submission form into page for signed in user 
          titleDiv.insertAdjacentHTML(`beforeend`, `
          <div class="py-8 md:px-32 px-0 md:w-1/2 w-full mx-auto">
    
    <div class="md:mx-0 mx-4"><span class="font-bold text-2xl bg-clip-text">${chatroomName}</span></div>
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
        console.log(json)
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
            <p>${userName} @ (${date} ${timeStamp}) said: ${messageBody}</p>
              `)
            }
      // 🔥🔥🔥Populate Chatroom messages from JSON ends here🔥🔥🔥





  
      
// Pretty much all the chatroom database grabbing will appear here




















    } else {
      // user is not logged-in, so redirect to home screen
      // 🔥🔥🔥🔥🔥🔥UNCOMMENT NEXT LINE AFTER PRODUCT IS FINISHED! WE DON'T WANT PEOPLE IN CHATROOM THAT ARE NOT SIGNED IN🔥🔥🔥🔥🔥🔥
      //document.location.href = `index.html`
    }
    })
  