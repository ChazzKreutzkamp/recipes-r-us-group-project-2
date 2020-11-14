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


    //for demo
    const direction_list = document.querySelector('#input_direction_list').value;
    const ingredient_list = document.querySelector('#input_ingredients_list').value;



    var recipe_id = /[^/]*$/.exec(window.location)[0];


    const response = await fetch(`/api/recipes/` + recipe_id, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            yield,
            cook_time,
            description,
            cuisine,
            image_filename,
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

document.querySelector('#new_recipe_submit_button').addEventListener('click', postRecipeHandler);


// async function getTest() {
//     const response = await fetch('/api/recipes/1', {
//         method: "GET",
//         headers: { "Content-type": "application/json" }
//     })
//     const result = await response.json()
//     // const title = result.json()
//     // const result = JSON.parse(response);
//     if (response.ok) {
//         // alert(response);
//         console.log(result.cuisine);
//         // console.log(response.promise);
//     } else {
//         alert(response.statusText);
//     }
// }

// getTest();