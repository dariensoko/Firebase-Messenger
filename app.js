// JavaScript Document
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAOhsVRoYTGwsIaHMV8FMqnR4BTce9RdlE",
    authDomain: "fir-database-tests.firebaseapp.com",
    databaseURL: "https://fir-database-tests.firebaseio.com",
    projectId: "fir-database-tests",
    storageBucket: "fir-database-tests.appspot.com",
    messagingSenderId: "16640486389"
  };
  firebase.initializeApp(config);

	var database = firebase.database();
	const inputTextField = document.querySelector("#latestHotDogStatus");
	const saveButton = document.querySelector("#saveButton");
	const user_field = document.getElementById("user-field");
	const text_field = document.getElementsByClassName("textArea")
	var count = 0;

	// Sets User and outputs selection
	var user;
	setUser.addEventListener("click", function(){
		user = document.getElementById("user").value;
		var remover = document.getElementById("user-box");
		if(user == "user1"){
			user_field.innerHTML = "You are user 1"
			document.getElementById("textDIV").className = "textArea-visible";
			document.getElementById("div1").style.display = "flex";
			document.getElementById("textDIV").style.backgroundColor = "#97AEEB";
		}
		else if(user == "user2"){
			user_field.innerHTML = "You are user 2"
			document.getElementById("textDIV").className = "textArea-visible";
			document.getElementById("div1").style.display = "flex";
			document.getElementById("textDIV").style.backgroundColor = "#DCDDC7";
		}
		else{
			user_field.innerHTML = "INVALID USER"
		}
		var elem = document.getElementById('dummy');
 		remover.parentNode.removeChild(remover);
		alert("User set to " + user);
	});

	// Retrieves message count from database
	var mssgAmount = firebase.database().ref('Messages/');
	mssgAmount.on('value', function(snapshot) {
		amount = snapshot.val();
		var key;
		count = 0;
		for(key in amount) {
		  if(amount.hasOwnProperty(key)) {
			count++;
		  }
		}
	});
	
	// Retrieves message's from database
	var messgContents = firebase.database().ref('Messages/');
	messgContents.on('value', function(snapshot) {
		amount = snapshot.val();
		var key;
		howMany = 0;
		document.getElementById("div1").innerHTML = '';
		for(key in amount) {
		  if(amount.hasOwnProperty(key)) {
				howMany++;
		  }
			var messages = amount[howMany].info
			var userType = amount[howMany].username
			
			var para = document.createElement("li");
			para.className = userType +" users";
			var node = document.createTextNode(messages);
			para.appendChild(node);
			var element = document.getElementById("div1");
			element.appendChild(para);

			// Keeps page scrolled to bottom as new text is added
			window.scrollTo(0,document.body.scrollHeight);
		}
	});
		
	// Saves selection to database
		saveButton.addEventListener("click", function(){
			var textToSave = inputTextField.value;
			var nextID = count + 1;
			firebase.database().ref('Messages/' + nextID + '/' ).update({
				info: textToSave,
				username: user
			});	
	});


	












