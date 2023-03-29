
//ADD YOUR FIREBASE LINKS HERE
const firebaseConfig = {
      apiKey: "AIzaSyDYbEGEsMOggkfiRW9TQ6RN8qweXl-Xau0",
      authDomain: "kwiter-1afe8.firebaseapp.com",
      databaseURL: "https://kwiter-1afe8-default-rtdb.firebaseio.com",
      projectId: "kwiter-1afe8",
      storageBucket: "kwiter-1afe8.appspot.com",
      messagingSenderId: "768953153800",
      appId: "1:768953153800:web:e4ed38d6ed7a3bc4d0d4bd"
    };
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });

      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("Room Name - " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + " </div> <hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToRoomName(name){
      console.log("room name clicked - " + name);
      localStorage.setItem("room_name",name);
      
      window.location = "kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}