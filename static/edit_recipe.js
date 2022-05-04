function populate_recipe(){
    $('#title-input').val(recipe.title);
    $('#author-input').val(recipe.author);
    $('#prep-time-input').val(recipe.prep_time);
    $('#cook-time-input').val(recipe.cooking_time);
    $('#total-time-input').val(recipe.total_time);
    $('#servings-input').val(recipe.servings);
    $('#rating-input').val(recipe.rating);
    $('#image-input').val(recipe.image);
    let ing = recipe.ingredients;
    for (let i = 0; i < ing.length; i++) {
        $('#ingredients-input').append(ing[i]+"\n");  
     
    } 
    let inst = recipe.instructions;
    for (let i = 0; i < inst.length; i++) {
        $('#instructions-input').append(inst[i]+"\n");  
     
    } 
    $('#about-input').val(recipe.summary);
    let courses = recipe.courses;
    for (let i = 0; i < courses.length; i++) {
        $('#courses-input').append(courses[i]+"\n");  
     
    }


}
$(document).ready(function(){
    console.log(recipe);
    populate_recipe()   
   
});



function save_recipe(new_recipe){
    let recipe_toupdate= {
        "recipe" : new_recipe,
    };

    console.log("to save  = ",recipe_toupdate);

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/edit_recipe",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(recipe_toupdate),

        success: function(result){
            let result_recipe = result["recipes"]; 
            console.log("success: ", result_recipe) ; 
            let pageURL = "http://127.0.0.1:5000/view/"+recipe.id;
            document.location.href = pageURL;   

        },
        error: function(request, status, error){
            console.log("saving not successful..");
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
            
        }
    });
}

function discardChanges(){
    let ans = confirm("Are you sure you want to discard changes ?");
    if( ans == true ){
        let pageURL = "http://127.0.0.1:5000/view/"+recipe.id;
        document.location.href = pageURL;     
    }else{
                
    }
}

var is_clicked = {"title":false, "author":false, "ingredients":false, "instructions":false, "about":false, "courses":false, "image":false, "pointers":false};

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
    let title = $.trim( $('#recipe-title').text());
    let author = $.trim( $('#author').text());
    let prep_time = $.trim( $('#edit-prep').text());
    let cook_time = $.trim($('#edit-cook').text());
    let total_time = $.trim($('#edit-total').text());
    let servings = $.trim( $('#edit-servings').text());
    let rating = $.trim( $('#edit-rating').text());
    let ingredients = $.trim( $('#ingredients-input').val());
    let instructions = $.trim( $('#instructions-input').val());
    let about = $.trim( $('#about-input').val());
    let courses = $.trim( $('#courses-input').val());
    let recipe_image = $.trim($('#image-input').val());
    let error_flag = false;

    if (title === ""){
        if (is_clicked["title"] === false){
            title = recipe.title;
        }else{
            let error_msg = "Please enter Recipe Title!";
            $("#title-error").text(error_msg);
            $('#recipe-title').text("")
            $('#recipe-title').focus();
            window.scrollTo(0, 0);
            error_flag = true;
        }
    }else{
        $("#title-error").text("");
    }

    if (author === ""){
        if (is_clicked["author"] === false){
            author = recipe.author;
        }else{
            let error_msg = "Please enter Author of Recipe!";
            $("#author-error").text(error_msg);
            $('#author').text("")
            $('#author').focus();
            window.scrollTo(0, 0);
            error_flag = true;
        }
    }else{
        $("#author-error").text("");
    }

    if (prep_time === ""){
        if (is_clicked["pointers"] === false){
            prep_time = recipe.prep_time;
        }else{
            let error_msg = "Enter Prep time !";
            $("#info-error").text(error_msg);
            $('#edit-prep').text("")
            $('#edit-prep').focus();
            window.scrollTo(0, 0);
            error_flag = true;
        }
    }
    console.log('error flag = ', error_flag);

    if ( (prep_time!="") && !$.isNumeric(prep_time)){
        let error_msg = "Enter a numeric value for Prep Time!";
        $("#info-error").text(error_msg);
        $('#edit-prep').text("")
        $('#edit-prep').focus();
        window.scrollTo(0, 0);
        error_flag = true;

    }else if (prep_time <= 0){
        let error_msg = "Enter valid value for Servings";
        $("#info-error").text(error_msg);
        $('#edit-prep').text("")
        $('#edit-prep').focus();
        window.scrollTo(0, 0);
        error_flag = true;
    }

    if (cook_time === ""){
        if (is_clicked["pointers"]=== false){
           cook_time = recipe.cooking_time;
        }else{
            let error_msg = "Enter Cook time";
            $("#info-error").text(error_msg);
            $('#edit-cook').text("")
            $('#edit-cook').focus();
            window.scrollTo(0, 0);
            error_flag = true;
        }
    }
    console.log('error flag = ', error_flag);

    if ( (cook_time!="") && !$.isNumeric(cook_time) ){
        let error_msg = "Enter a numeric value for Cook time";
        $("#info-error").text(error_msg);
        $('#edit-cook').text("")
        $('#edit-cook').focus();
        window.scrollTo(0, 0);
        error_flag = true;
    }else if (cook_time <= 0){
        let error_msg = "Enter valid value for Cook time";
        $("#info-error").text(error_msg);
        $('#edit-cook').text("")
        $('#edit-cook').focus();
        window.scrollTo(0, 0);
        error_flag = true;
    }

    if (total_time === ""){
        if (is_clicked["pointers"]=== false){
            total_time = recipe.total_time;
        }else{
            let error_msg = "Enter Total time";
            $("#info-error").text(error_msg);
            $('#edit-total').text("")
            $('#edit-total').focus();
            window.scrollTo(0, 0);
            error_flag = true;
        }
    }
    console.log('error flag = ', error_flag);

    
    if ( (total_time!="") && !$.isNumeric(total_time)){
        let error_msg = "Enter a numeric value for Total Time!";
        $("#info-error").text(error_msg);
        $('#edit-total').text("")
        $('#edit-total').focus();
        window.scrollTo(0, 0);
        error_flag = true;

    }else if (total_time <= 0){
        let error_msg = "Enter valid value for Total time";
        $("#info-error").text(error_msg);
        $('#edit-total').text("")
        $('#edit-total').focus();
        window.scrollTo(0, 0);
        error_flag = true;
    }

    if (servings === ""){
        if (is_clicked["pointers"]=== false){
            servings = recipe.servings;
        }else{
            let error_msg = "Enter Servings";
            $("#info-error").text(error_msg);
            $('#edit-servings').text("")
            $('#edit-servings').focus();
            window.scrollTo(0, 0);
            error_flag = true;
        }
    }
    console.log('error flag = ', error_flag);

    if ((servings!="") && !$.isNumeric(servings)){
        let error_msg = "Enter a numeric value for Servings!";
        $("#info-error").text(error_msg);
        $('#edit-servings').text("")
        $('#edit-servings').focus();
        window.scrollTo(0, 0);
        error_flag = true;

    }else if (servings <= 0){
        let error_msg = "Enter valid value for Servings";
        $("#info-error").text(error_msg);
        $('#edit-servings').text("")
        $('#edit-servings').focus();
        window.scrollTo(0, 0);
        error_flag = true;
    }

    if (rating === ""){
        if (is_clicked["pointers"]=== false){
            rating = recipe.rating;
        }else{
            let error_msg = "Please enter Rating!";
            $("#info-error").text(error_msg);
            $('#edit-rating').text("")
            $('#edit-rating').focus();
            window.scrollTo(0, 0);
            error_flag = true;
        }
    }
    console.log('error flag = ', error_flag);

    if ((rating!="") && !$.isNumeric(rating)){
        let error_msg = "Enter a numeric value for Rating";
        $("#info-error").text(error_msg);
        $('#edit-rating').text("")
        $('#edit-rating').focus();
        window.scrollTo(0, 0);
        error_flag = true;
    }

    if ((rating!="") && (rating > 5 || rating < 1)){
        let error_msg = "Enter a value for Rating between 1 to 5";
        $("#info-error").text(error_msg);
        $('#edit-rating').text("")
        $('#edit-rating').focus();
        window.scrollTo(0, 0);
        error_flag = true;
    }

    if (ingredients === ""){
        if (is_clicked["ingredients"]=== false){
            ingredients = recipe.ingredients;
        }else{
            let error_msg = "Enter at least one ingredient!";
            $("#ing-error").text(error_msg);
            $("#ingredients-input").val("");
            $("#ingredients-input").focus();
            error_flag = true;
        }
    }else{
        $("#ing-error").text("");
    }
    console.log('error flag = ', error_flag);

    if (instructions === ""){
        if (is_clicked["instructions"]=== false){
            instructions = recipe.instructions;
        }else{
            let error_msg = "Enter some instructions!";
            $("#inst-error").text(error_msg);
            $("#instructions-input").val("");
            $("#instructions-input").focus();
            error_flag = true;
        }
        
    }
    console.log('error flag = ', error_flag);
    if (about === ""){
        if (is_clicked["about"]=== false){
            about = recipe.summary;
        }else{
            let error_msg = "Enter at lease one line about your recipe!";
            $("#about-error").text(error_msg);
            $("#about-input").val("");
            $("#about-input").focus();
            error_flag = true;
        }
    }else{
        $("#about-error").text("");
    }


    console.log('error flag = ', error_flag);
    if (recipe_image === ""){
        if (is_clicked["image"]=== false){
            console.log("1111111111")
            recipe_image = recipe.image;
        }else{
            error_flag = true;
            console.log("22222222")
            let error_msg = "Enter the image url!";
            $("#image-error").text(error_msg);
            $("#image-input").val("");
            $("#image-input").focus();
            $("#edit-img-view").attr("src","https://i0.wp.com/www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg?resize=700%2C400&ssl=1")
            
        }
    }
    
    if (courses=== ""){
        if (is_clicked["courses"]=== false){
            courses = recipe.courses;
        }else{
            let error_msg = "Enter at least one course!";
            $("#courses-error").text(error_msg);
            $("#courses-input").val("");
            $("#courses-input").focus();
            error_flag = true;
        }
    }else{
        $("#courses-error").text("");
    }
    console.log('error flag = ', error_flag);
    //------------------------------------------------------------------------------------

    if (!error_flag){
        $("#title-error").text("");
        $("#author-error").text("");
        $("#inst-error").text("");
        $("#ing-error").text("");
        $("#about-error").text("");
        $("#courses-error").text("");
        $("#image-error").text("");
        $("#info-error").text("");

        
        if (is_clicked["ingredients"]){
            ingredients = ingredients.split(/\r?\n/).filter(e =>  e);
        }
        if (is_clicked['instructions']){
            instructions = instructions.split(/\r?\n/).filter(e =>  e);
        }
        console.log("before = ", courses);
        if (is_clicked['courses']){
            courses = courses.split(',');
            courses = courses.map(x => x.trim());
        }
        console.log("after = ", courses);
        let new_recipe = {
            "id": recipe.id,
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
        console.log("new = ", new_recipe);
        return new_recipe;   
               
    } 
 

}

function getNewRecipe2(){
    let error_flag = false;
    let prep_time = $.trim( $('#edit-prep').text());
    let cook_time = $.trim($('#edit-cook').text());
    let total_time = $.trim($('#edit-total').text());
    let servings = $.trim( $('#edit-servings').text());
    let rating = $.trim( $('#edit-rating').text());
    console.log(prep_time, cook_time, total_time, servings, rating);
    let ingredients =  $.trim($('#ing-1').text());
    console.log(ingredients);
}

function submitRecipe(){
    let new_recipe =  getNewRecipe();
    console.log("new recipe to save = ", new_recipe)  
    save_recipe(new_recipe)
         
}


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


$(document).ready(function() {
    $("#discard-changes").click(function(event) {
       event.preventDefault();  
       discardChanges();
    });
});

$(document).ready(function(){
    $("#discard-changes").keypress(function(event) {                       
        if (event.keyCode === 13) {      
            event.preventDefault(); 
            discardChanges();
        }
    })
});



$(document).ready(function(){

    $("#edit-title").click(function(event) {  
        is_clicked["title"] = true  ;                         
        $('#recipe-title').attr("contentEditable", true);
        $('#recipe-title').css("background-color", "white");
        $('#recipe-title').css("padding", "6px");
        $('#recipe-title').css("border", "1px solid black");
        $('#recipe-title').focus();        
        $('#edit-title').remove();
    });

    $("#edit-author").click(function(event) {  
        is_clicked["author"] = true  ;                         
        $('#author').attr("contentEditable", true);
        $('#author').css("background-color", "white");
        $('#author').css("padding", "5px");
        $('#author').css("border", "1px solid black");
        $('#author').focus();
        $('#edit-author').remove();
        $('#author').css("margin-top","5px");
        $('#author').css("margin-bottom","3px");
    });

    $("#edit-ing").click(function(event) { 
        is_clicked["ingredients"] = true  ;                          
        $('#add-ing').empty();
        let formdiv = $('<div class="form-group">')
        formdiv.append(' <div id="add-headers">INGREDIENTS</div>');
        formdiv.append('<textarea class="form-control" id="ingredients-input" cols="60" rows="8" placeholder="Two cups of milk &#10;1 Tablespoon of sugar"></textarea>');
        $('#add-ing').append(formdiv);
        $('#add-ing').append('<div id="ing-error"></div> ');
        let ing = recipe.ingredients;
        for (let i = 0; i < ing.length; i++) {
            $('#ingredients-input').append(ing[i]+"\n");  
        
        } 
        $('#ingredients-input').focus();
    });
    $("#edit-inst").click(function(event) { 
        is_clicked["instructions"] = true  ;                    
        $('#add-inst').empty();
        let formdiv = $('<div class="form-group">')
        formdiv.append(' <div id="add-headers">INSTRUCTIONS</div>');
        formdiv.append('<textarea class="form-control" id="instructions-input" cols="60" rows="10" placeholder="Mix sugar and flour &#10;Melt the butter"></textarea>');
        $('#add-inst').append(formdiv);
        $('#add-inst').append('<div id="inst-error"></div> ');
        let inst = recipe.instructions;
        for (let i = 0; i < inst.length; i++) {
            $('#instructions-input').append(inst[i]+"\n");  
         
        } 
        $('#instructions-input').focus();

    });
    $("#edit-about").click(function(event) {  
        is_clicked["about"] = true  ;                         
        $('#add-about').empty();
        let formdiv = $('<div class="form-group">')
        formdiv.append(' <div id="add-headers">ABOUT</div> ');
        formdiv.append('<textarea class="form-control" id="about-input" cols="60" rows="4" placeholder="This creamy rice pudding is delicately flavored with cardamom and full of nuts.."></textarea>');
        $('#add-about').append(formdiv);
        $('#add-about').append('<div id="about-error"></div> ');
        $('#about-input').val(recipe.summary);
        $('#about-input').focus();
    });

    $("#edit-courses").click(function(event) {
        is_clicked["courses"] = true  ;                         
        $('#add-courses').empty();
        let formdiv = $('<div class="form-group">')
        formdiv.append(' <div id="add-headers">COURSES</div> ');
        formdiv.append('<textarea class="form-control" id="courses-input" cols="60" rows="2" placeholder="Dinner &#10;Lunch "></textarea>');
        $('#add-courses').append(formdiv);
        $('#add-courses').append('<div id="courses-error"></div> ');
        $('#courses-input').val(recipe.courses);
        $('#courses-input').focus();
    });

    $("#edit-image").click(function(event) {  
        is_clicked["image"] = true  ;
        $("#edit-image").remove();                     
        $('#add-image').append('<input type="text" class="form-control" id="image-input" placeholder="Recipe Image (URL)"></input>')                   
        $('#image-input').focus();
    });

    $("#edit-pointers").click(function(event) {
        is_clicked["pointers"] = true  ;
        $('#edit-prep').attr("contentEditable", true);
        $('#edit-prep').css("background-color", "white");
        $('#edit-prep').css("padding", "5px");
        $('#edit-prep').css("border", "1px solid black");
        $('#edit-prep').focus();


        $('#edit-cook').attr("contentEditable", true);
        $('#edit-cook').css("background-color", "white");
        $('#edit-cook').css("padding", "5px");
        $('#edit-cook').css("border", "1px solid black");

        $('#edit-total').attr("contentEditable", true);
        $('#edit-total').css("background-color", "white");
        $('#edit-total').css("padding", "5px");
        $('#edit-total').css("border", "1px solid black");

        $('#edit-servings').attr("contentEditable", true);
        $('#edit-servings').css("background-color", "white");
        $('#edit-servings').css("padding", "5px");
        $('#edit-servings').css("border", "1px solid black");

        $('#edit-rating').attr("contentEditable", true);
        $('#edit-rating').css("background-color", "white");
        $('#edit-rating').css("padding", "5px");
        $('#edit-rating').css("border", "1px solid black");

        $('#edit-pointers').remove();
        $('#recipe-info').css("margin-top","13px");
       
     });


});









