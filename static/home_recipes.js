
function createRecipe(recipe_info){
    let main_div = $('<div class="recipe-main" id="recipe-main-id">');
    let header_div = $('<div class="row" id="recipe-header">');
    let image_div = $('<img alt="Recipe Image">')
    image_div.attr("onerror","this.onerror=null; this.src='https://i0.wp.com/www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg?resize=700%2C400&ssl=1'")
    image_div.attr("src",recipe_info.image);
    header_div.append(image_div);
    main_div.append(header_div);

    let body_div = $('<div class="row" id="recipe-body"></div>')
    let title_div = $('<div id = "recipe-title">')
    title_div.append('<h4>'+recipe_info.title+'</h4>')
    
    let rating_stars = parseInt(Math.round(parseFloat(recipe_info.rating)));
    let no_stars = 5-rating_stars;
    let star_div = $('<div id="rating_stars">');
    for(let i=0;i<rating_stars;i++){
        star_div.append('<span class="fa fa-star checked"></span>');
    }
    for(let i=0;i<no_stars;i++){
        star_div.append('<span class="fa fa-star empty"></span>');
    }
    body_div.append(title_div);
    body_div.append(star_div);
    main_div.append(body_div);

    // main_div.append('<hr>');   

    let info_div = $('<div class="row" id="recipe-short-info">')
    info_div.append('<div class="col-md-3 col-s-3 col-xs-12 col-12"><img src="https://img.icons8.com/ios/50/000000/clock--v1.png" id="i1"/><p id="recipe-time">'+recipe_info.total_time+' Mins</p></div>')
    info_div.append('<div class="col-md-4 col-s-4 col-xs-12 col-12"><img src="https://img.icons8.com/wired/64/000000/restaurant.png" id="i2"/><p id="recipe-servings">'+recipe_info.servings+' Servings</p></div>')
    info_div.append('<div class="col-md-5 col-s-5 col-xs-12 col-12"><img src="https://img.icons8.com/ios/50/000000/user--v1.png" id="i3"/><p id="recipe-author">'+recipe_info.author+'</p></div>')
    main_div.append(info_div);

    if (recipe_info.courses){
        main_div.append('<div class="row" id="recipe-courses">'+recipe_info.courses.join(' | ')+"</div>")
    }
    let recipe_intro = recipe_info['summary'].split('.')[0]
    let recipe_intro_div = $('<div class="row" id="recipe-intro">')
    recipe_intro_div.append('<p id="recipe-intro-id">'+recipe_intro+'</p>')
    main_div.append(recipe_intro_div);
    $(main_div).click(function(){
        let pageURL = "http://127.0.0.1:5000/view/"+recipe_info.id;
        document.location.href = pageURL;
    });
    
    
    $('.home-recipes').append(main_div);   

}

function display_top3_recipes(recipes){
    $(".home-recipes").empty();
    for (let i = 0; i <3; i++) {
        if (i<recipes.length){
            createRecipe(recipes[i]);
        }        
    }   
}




$(document).ready(function() {
    $("#search-text").autocomplete({
        source: recipes
    });
    display_top3_recipes(recipes);
});
