


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
    if($(e.target).hasClass('bg-danger')) {
        $(e.target).removeClass('bg-danger');

        const clicked =  $(e.target).index(0);
        console.log('hello all', $(e.target).index(0))
        console.log('da kidzz', $('#ingredients li:nth-child(1)'))
    } else {
        $(e.target).addClass('bg-danger');
    }
}

