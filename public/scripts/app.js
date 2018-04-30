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
				$("#welcome").append("<h2>" + "signed up succesfully " + response.username + "!" + "</h2>").hide().fadeIn(2000).fadeOut(2000);

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
				window.location = "/profile"
			}
		})

	})
})