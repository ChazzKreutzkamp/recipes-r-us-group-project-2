


const letscookit = [
    "hello",
    "hi",
    'hey',
    'hola',
    'sup',
    'blah',
    'blue'
] 

const cookingInfo = 
    {
        cooktime:120,
        preptime:30,
        servings:5
    }    


const ingredients = 
    [
        'rice',
        'meat',
        'mushroom cream soup'
    ]


for (let i =0; i < letscookit.length; i++ ){
    $('#Steps').append(`<li>${letscookit[i]}</li>
    `)}

for (let i =0; i < ingredients.length; i++){
    $('#ingredients').append(`<li>${ingredients[i]}</li>`)
}

$('#cooktime').html(cookingInfo.cooktime)
$('#preptime').html(cookingInfo.preptime)
$('#serving').html(cookingInfo.servings)
$('#Steps li').on('click',(e)=>listbackground(e))



function listbackground(e) {
    console.log(e,'hi')
    //select step//
    //toggle it//

    //  -- which way it should toggle like off on//
    //  --make line through list//
    $( "#Steps li" ).addClass( "rowTask" );
    
    
}

