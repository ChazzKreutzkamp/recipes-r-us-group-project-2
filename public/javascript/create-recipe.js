async function postRecipeHandler(event) {
    event.preventDefault();

    // alert("clicked");

    //A good portion of this will need to be edited to get the real input fields
    const title = document.querySelector('#input_title').value;
    const yield = document.querySelector('#input_yield').value;
    const cook_time = parseInt(document.querySelector('#input_cook_time').value);
    const cuisine = document.querySelector('#input_cuisine').value;
    const description = document.querySelector('#input_description').value;

    const image_filename = document.querySelector('#input_img').value;


    //simpler recipe list placeholders
    const direction_list = document.querySelector('#input_direction_list').value;
    const ingredient_list = document.querySelector('#input_ingredients_list').value;

    var file = document.getElementById("input_img").files[0];
    console.log("name : " + file.name);

    const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            yield,
            cook_time,
            description,
            cuisine,
            image_filename: file.name,
            direction_list,
            ingredient_list
            // user_id handled by api
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // could there be a directions page?
    //With the way the api and models are set up this is one solution
    if (response.ok) {
        console.log("success");
        document.location.replace('/homepage');
    } else {
        alert(response.statusText);
    }
}

async function uploadImage(event) {

    var file = this.files[0];
    console.log("name : " + file.name);


    var form = document.getElementById("testForm");
    var formData = new FormData(form);
    // console.log("submitted?")
    const response = await fetch('/api/recipes/uploadImage', {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        console.log("success");
        // document.location.replace('/homepage');
    } else {
        alert(response.statusText);
    }
}

// async function postRecipeImageHandler() {
//     var file = this.files[0];
//     // This code is only for development
//     console.log("name : " + file.name);
//     console.log("size : " + file.size);
//     console.log("type : " + file.type);
//     console.log("date : " + file.lastModified);




//     const response = await fetch(`/api/recipes`, {
//         method: 'POST',
//         body: formData,
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     });
//     // could there be a directions page?
//     //With the way the api and models are set up this is one solution
//     if (response.ok) {
//         console.log("success");
//         document.location.replace('/homepage');
//     } else {
//         alert(response.statusText);
//     }
// }

document.getElementById('input_img').addEventListener('change', uploadImage);


document.querySelector('#new_recipe_submit_button').addEventListener('click', postRecipeHandler);