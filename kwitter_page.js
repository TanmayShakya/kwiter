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
room_name = localStorage.getItem("room_name");
 

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                      console.log(firebase_message_id);
                      console.log(message_data);
                      name = message_data['name'];
                      message = message_data['message'];
                      like = message_data['like'];

                      name_with_tag = "<h4>"+ name + " <img class='user_tick' src='tick.png'> </h4>";
                      message_with_tag = "<h4 class='message_h4'>" + message +   "</h4>";
                      like_button = "<button class='btn btn-primary' id="+ firebase_message_id+" value="+ like + " onclick='updateLike(this.id)'>  " ;
                      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like : " + like + "</span></button> <hr>";
                      row =  name_with_tag +  message_with_tag + like_button + span_with_tag ;
                      document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();
 

function send(){
      msg = document.getElementById("msg").value ;
      firebase.database().ref(room_name).push({
            name:user_name,
            message : msg,
            like:0
      });
}

function updateLike(message_id){
  
      console.log("Clicked on liked button " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_Likes = Number(likes) + 1 ;
      console.log(updated_Likes);
      firebase.database().ref(room_name).child(message_id).update({
            like : updated_Likes
      });

}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
