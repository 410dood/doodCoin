const ENV = require('./app-env');
const googleClientKey = ENV.GOOGLE_CLIENT_ID;
const googleClientSecret = ENV.GOOGLE_CLIENT_SECRET;



$(document).ready(function(){

	$("#signup-form").on("submit", function(event){

		event.preventDefault();

		// i want to grab the data from the input fields and send it to the back end
		// the post route /signup

		var formData = {
			email : $("#email-input").val(),
			password : $("#pw-input").val()
		}

		console.log(formData)

		$.ajax({
			url  : "/signup",
			method : "POST",
			data : formData,
			success : function(response){
				$("h1").append(response.email + " is now a user email")
			}
		})

	})

	$("#login-form").on("submit", function(event){
		event.preventDefault();

		var formData = {
			email : $("#email-input").val(),
			password : $("#pw-input").val()
		}

		console.log(formData)

		$.ajax({
			url  : "/sessions",
			method : "POST",
			data : formData,
			success : function(response){
				window.location = "/views/profile"
			}
		})

	})
})