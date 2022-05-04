
function save_recipe(new_recipe){
    let recipe_tosave = {
        "recipe" : new_recipe,
    };


    $.ajax({
        type: "POST",
        url: "save_recipe",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(recipe_tosave),

        success: function(result){
            let result_recipe = result["recipes"]; 
            console.log("success: ", result_recipe) ;  
            window.scrollTo(0, 0);
            
            let feedback_row = $('<div class="row" id="feedback-row">');
            feedback_row.append('<p id = "feedback-text">New Recipe successfully created!</p>');
            let view_btn = $('<button type="button" class="btn btn-outline-primary" id="view-created-recipe">See it here</button>');
            $(view_btn).click(function(){
                viewRecipe(new_recipe.id);
            });
            feedback_row.append(view_btn);
            console.log(feedback_row);
            $('#main-container').prepend(feedback_row);

            $('#title-input').focus();
            $("#instructions-input").val("");
            $("#ingredients-input").val("");
            $("#rating-input").val("");
            $("#servings-input").val("");
            $("#total-time-input").val("");
            $("#cook-time-input").val("");
            $("#prep-time-input").val("");
            $("#author-input").val("");
            $("#author-input").val("");
            $("#title-input").val("");
            $("#image-input").val("");

        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function urlExists(url, callback){
    $.ajax({
      type: 'HEAD',
      url: url,
      success: function(){
        callback(true);
      },
      error: function() {
        callback(false);
      }
    });
}



function getNewRecipe(){
    let title = $.trim($('#title-input').val());
    let author = $.trim($('#author-input').val());
    let prep_time = $.trim( $('#prep-time-input').val());
    let cook_time = $.trim($('#cook-time-input').val());
    let total_time = $.trim($('#total-time-input').val());
    let servings = $.trim( $('#servings-input').val());
    let rating = $.trim( $('#rating-input').val());
    let ingredients = $.trim( $('#ingredients-input').val());
    let instructions = $.trim( $('#instructions-input').val());
    let about = $.trim( $('#about-input').val());
    let courses = $.trim( $('#courses-input').val());
    let recipe_image = $.trim($('#image-input').val());
    let error_flag = false;

    // ---------------Error Checking----------------------------------

    if (title  === ""){
        let error_msg = "Enter Recipe Title!";
        $("#title-error").text(error_msg);
        $("#title-input").val("");
        $("#title-input").focus();
        error_flag = true;
    }else{
        $("#title-error").text("");
    }

    if (author === ""){
        let error_msg = "Enter Author of Recipe!";
        $("#author-error").text(error_msg);
        $("#author-input").val("");
        $("#author-input").focus();
        error_flag = true;
    }else{
        $("#author-error").text("");
    }

    if (prep_time === ""){
        let error_msg = "Enter Prep time in mins!";
        $("#prep-time-error").text(error_msg);
        $("#prep-time-input").val("");
        $("#prep-time-input").focus();
        error_flag = true;
    }

    if ( (prep_time!="") && !$.isNumeric(prep_time)){
        let error_msg = "Enter a numeric value!";
        $("#prep-time-error").text(error_msg);
        $("#prep-time-input").val("");
        $("#prep-time-input").focus();
        error_flag = true;

    }else if (prep_time <= 0){
        let error_msg = "Enter valid value for Prep time";
        $("#prep-time-error").text(error_msg);
        $("#prep-time-input").val("");
        $("#prep-time-input").focus();
        error_flag = true;
    }

    if (cook_time === ""){
        let error_msg = "Enter Cook time in mins!";
        $("#cook-time-error").text(error_msg);
        $("#cook-time-input").val("");
        $("#cook-time-input").focus();
        error_flag = true;
    }

    if ( (cook_time!="") && !$.isNumeric(cook_time)){
        let error_msg = "Enter a numeric value!";
        $("#cook-time-error").text(error_msg);
        $("#cook-time-input").val("");
        $("#cook-time-input").focus();
        error_flag = true;

    }else if (cook_time <= 0){
        let error_msg = "Enter valid value for Cook time";
        $("#cook-time-error").text(error_msg);
        $("#cook-time-input").val("");
        $("#cook-time-input").focus();
        error_flag = true;
    }

    if (total_time === ""){
        let error_msg = "Enter Total time in mins!";
        $("#total-time-error").text(error_msg);
        $("#total-time-input").val("");
        $("#total-time-input").focus();
        error_flag = true;
    }

    if ((total_time!="") && !$.isNumeric(total_time)){
        let error_msg = "Enter a numeric value!";
        $("#total-time-error").text(error_msg);
        $("#total-time-input").val("");
        $("#total-time-input").focus();
        error_flag = true;

    }else if (total_time <= 0){
        let error_msg = "Enter valid value for Total time";
        $("#total-time-error").text(error_msg);
        $("#total-time-input").val("");
        $("#total-time-input").focus();
        error_flag = true;
    }

    if (servings === ""){
        let error_msg = "Enter Servings!";
        $("#servings-error").text(error_msg);
        $("#servings-input").val("");
        $("#servings-input").focus();
        error_flag = true;
    }

    if ( (servings!="") && !$.isNumeric(servings)){
        let error_msg = "Enter a numeric value!";
        $("#servings-error").text(error_msg);
        $("#servings-input").val("");
        $("#servings-input").focus();
        error_flag = true;

    }else if (servings <= 0){
        let error_msg = "Enter valid value for Servings";
        $("#servings-error").text(error_msg);
        $("#servings-input").val("");
        $("#servings-input").focus();
        error_flag = true;
    }

    if (rating === ""){
        let error_msg = "Enter Rating!";
        $("#rating-error").text(error_msg);
        $("#rating-input").val("");
        $("#rating-input").focus();
        error_flag = true;
    }

    if ((rating!="") && !$.isNumeric(rating)){
        let error_msg = "Enter a numeric value!";
        $("#rating-error").text(error_msg);
        $("#rating-input").val("");
        $("#rating-input").focus();
        error_flag = true;
    }

    if ((rating!="") && (rating > 5 || rating < 1)){
        let error_msg = "Enter rating between 1 to 5!";
        $("#rating-error").text(error_msg);
        $("#rating-input").val("");
        $("#rating-input").focus();
        error_flag = true;
    }
    if (ingredients === ""){
        let error_msg = "Enter at least one ingredient!";
        $("#ing-error").text(error_msg);
        $("#ingredients-input").val("");
        $("#ingredients-input").focus();
        error_flag = true;
    }else{
        $("#ing-error").text("");
    }

    if (instructions === ""){
        let error_msg = "Enter instructions!";
        $("#inst-error").text(error_msg);
        $("#instructions-input").val("");
        $("#instructions-input").focus();
        error_flag = true;
    }else{
        $("#inst-error").text("");
    }
    if (about=== ""){
        let error_msg = "Enter at lease one line about your recipe!";
        $("#about-error").text(error_msg);
        $("#about-input").val("");
        $("#about-input").focus();
        error_flag = true;
    }else{
        $("#about-error").text("");
    }
    if (recipe_image === ""){
        let error_msg = "Enter an image url!";
        $("#image-error").text(error_msg);
        $("#image-input").val("");
        $("#image-input").focus();
        error_flag = true;
    }
    else{
        urlExists(recipe_image, function(exists){
            if (exists){
                $("#image-error").text("");
            }else{
                let error_msg = "Entered Image url is invalid!";
                $("#image-error").text(error_msg);
                $("#image-input").val("");
                $("#image-input").focus();
                error_flag = true;
            }
        });
    }

    if (courses=== ""){
        let error_msg = "Enter at least one tag !";
        $("#courses-error").text(error_msg);
        $("#courses-input").val("");
        $("#courses-input").focus();
        error_flag = true;
    }else{
        $("#courses-error").text("");
    }
    // ------------------------------------------------------------------

    if (!error_flag){
        $("#inst-error").text("");
        $("#ing-error").text("");
        $("#rating-error").text("");
        $("#servings-error").text("");
        $("#total-time-error").text("");
        $("#cook-time-error").text("");
        $("#prep-time-error").text("");
        $("#author-error").text("");
        $("#author-error").text("");
        $("#title-error").text("");
        $("#image-error").text("");

        console.log("image = ",recipe_image);
        
        ingredients = ingredients.split(/\r?\n/).filter(e =>  e);
        instructions = instructions.split(/\r?\n/).filter(e =>  e);
        courses = courses.split(/\r?\n/).filter(e =>  e);
        let id = String(Math.floor(Math.random() * 10000));

        let new_recipe = {
            "id": id,
            "title": title,
            "summary": about,
            "image": recipe_image,
            "cuisine":"Indian",
            "courses":courses,
            "author": author,
            "ingredients": ingredients,
            "instructions": instructions,
            "prep_time": prep_time,
            "cooking_time": cook_time,
            "total_time": total_time,
            "servings": servings,
            "rating": rating
            
        };   
        return new_recipe;   
               
    } 
    console.log(title, author, prep_time, cook_time, total_time, servings, rating);
    console.log("ing = ",ingredients);
    console.log(instructions);
    console.log(about);
    console.log(courses);  
    return;   

}



function submitRecipe(){
    let new_recipe =  getNewRecipe();   
    save_recipe(new_recipe); 
    
      
}


function viewRecipe(id){
    var pageURL = "http://127.0.0.1:5000/view/"+id;
    window.open(pageURL);

}


$(document).ready(function(){
    $('#title-input').focus();
});


$(document).ready(function(){
    $("#submit-recipe").keypress(function(event) {                       
        if (event.keyCode === 13) {      
            event.preventDefault(); 
            submitRecipe();
        }
    })
});

$(document).ready(function() {
    $("#submit-recipe").click(function(event) {
       event.preventDefault();  
       submitRecipe();
    });
});


$(document).ready(function(){
    $("#view-created-recipe").keypress(function(event) {                       
        if (event.keyCode === 13) {      
            event.preventDefault(); 
            viewRecipe();
        }
    })
});

$(document).ready(function() {
    $("#view-created-recipe").click(function(event) {
       event.preventDefault();  
       viewRecipe();
    });
});


