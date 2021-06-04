// standard event listener for Firebase auth
firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')

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







  
      
// Pretty much all the chatroom database grabbing will appear here




















    } else {
      // user is not logged-in, so redirect to home screen
      // 🔥🔥🔥🔥🔥🔥UNCOMMENT NEXT LINE AFTER PRODUCT IS FINISHED! WE DON'T WANT PEOPLE IN CHATROOM THAT ARE NOT SIGNED IN🔥🔥🔥🔥🔥🔥
      //document.location.href = `index.html`
    }
    })
  