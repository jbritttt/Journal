
const form = document.querySelector(".form_main");
const content = document.querySelector(".content");
const input = document.querySelector(".input");

console.log('hello')

document.addEventListener('submit', (e)=> e.preventDefault())
    

///// this will post data to the server////////////////////////
function PostData(form) {
   const prePayload = new FormData(form);
   const payload = new URLSearchParams(prePayload);

   //console.log([...payload]);

   fetch('http://localhost:3000/', {
    method: "post",
    body: payload,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}


///// This function adds elements and the data returned from the server
function addElements (data) {
   

   let commentContainer = document.createElement("div");
/////////////////////////////////////// we need to replace input.value with the latest data that was posted////////////
   const commentForm = commentContainer.innerHTML =  `<p>${input.value}</p><form id='form'>

   <input name='userpost' type="text" class="inputTwo" placeholder='write a comment ...'required>
   <button type="submit" id='btn'>Post Comment</button></form>` 
   return commentForm

}
 

// submits the index.html form
form.addEventListener("submit", (e) => {
    /// call postdata function and pass in the form////////////////////////
   PostData(e.target);
   
   content.innerHTML += addElements() 

   input.value = "";
  
});


// submits all other forms using the event.
content.addEventListener("submit", (e) => {
 
   PostData(e.target);

   const targ = e.target.querySelector('.inputTwo').value

  /// we need to replace targ with the latest data that was posted on the comment reply///////////////////
   let html = `<p id='p'>${targ}</p>`;
   e.target.previousSibling.insertAdjacentHTML("afterend", html)

   e.target.querySelector('.inputTwo').value = ''
});




const url = "https://community-journaling.herokuapp.com";


/// planning on using this function to make a get request 

function postComment() {

}

/********************************************************************** This is for trying methods (not working now) */
function loadInitialPage (data) {
  const blogLength = Object.keys(data).length
  for (let i = 1; i <= blogLength; i++) {
    let commentContainer = document.createElement("div");
    commentContainer.innerHTML =  `<p class='content'>${data[i]['body']}<form id='form-${i}'>

   <input name='userpost-${i}' type="text" class="inputTwo" placeholder='write a comment ...'required>
   <button type="submit" id='btn-${i}'>Post Comment</button></form></p>`
   document.getElementById('blog-posts').appendChild(commentContainer)

   document.getElementById(`btn-${i}`).addEventListener('click', () => {
    console.log(`The button ${i} was clicked`);
    const form = document.getElementById(`form-${i}`)
    const prePayload = new FormData(form);
    const payload = new URLSearchParams(prePayload);

    console.log([...payload]);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([...payload]);


  //  fetch('http://localhost:3000/', {
  //   method: "post",
  //   body: payload,
  // })
  //   .then((res) => {
  //     console.log('res: ', res)
  //     res.json()
  //   })
  //   .then((data) => console.log('how does the data look like after fetching: ', data))
  //   .catch((err) => console.log('Error while post fetching: ', err));
/********************************************************************************************* End of trying block*/
   })
  }
}

function getData() {

  fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      loadInitialPage(data)
    })
    .catch(err => {
      alert("Sorry! Your request could not be granted!", err)
    })
}

// async function getData() {
//   try {
//     const response = fetch(url);
//     const data = await response.json();
    
//     console.log(data[1].body)
//   } catch (error) {
//     alert("Sorry! Your request could not be granted!");
//   }
// }

getData()






/// this is the data being returned 


//{
  // "1":{
    //  "body":"This is the first comment",
    //  "replies":[
    //     "first reply",
    //     "second reply"
   //   ],
    //  "like":{
   //      "is-there":true,
   //      "number":1
   //   },
   //   "funny":{
    //     "is-there":true,
    //     "number":4
    //  },
    //  "angry":{
     //    "is-there":false,
     //    "number":0
     // }
   //},
   //"2":{
    //  "body":"This is the second comment",
    //  "replies":[
     //    "first reply",
    //     "second reply",
    //     "third reply"
    //  ],
    //  "like":{
     //    "is-there":false,
     //    "number":0
    //  },
     // "funny":{
     //    "is-there":true,
     //    "number":2
    //  },
     // "angry":{
     //    "is-there":true,
     //    "number":5
     // }
   //}
//}

