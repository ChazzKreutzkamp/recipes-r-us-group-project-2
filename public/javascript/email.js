//pseudo code for some parts that can't exist without the api's being created:

//Grocery List formatter function
// A function that formats the grocery list ingredients into a single string variable,
//this string variable will then be passed into the email fetch function

//Email fetch function
// A Function that does a fetch request to most likely the user api where it can grab the users email
//The function above will also call and pass the email to the next function.

//Send email function


async function emailIngredientsList(event) {
    event.preventDefault();
    const userEmail = $('#useremail').text().trim();
    const ingredientsList = $('#ingredientslist').text().trim(); //this will need to be edited in accordance to the handlebars
    console.log(userEmail, ingredientsList);
    Email.send({
        Host: "smtp.elasticemail.com", //because we do not have a heroku server yet this will have to change.
        Username: "recipes.r.us.grocery.list.email@gmail.com",
        Password: "4F50915D6EDEC86355968E1A4B8355B7A25B",
        To: userEmail,
        From: "recipes.r.us.grocery.list.email@gmail.com",
        Subject: "Your Grocery List",
        Body: ingredientsList
    }).then(
        message => alert(message)
    );
}

document.querySelector('#email').addEventListener('click', emailIngredientsList);
//CDN for smtpjs = Include a script tag to https://smtpjs.com/v3/smtp.js
// -> <script src="https://smtpjs.com/v3/smtp.js"></script>
//website with instructions for implementation: https://smtpjs.com/