function highlight_search(text, x){
    let index = text.toLowerCase().indexOf(x.toLowerCase());
    console.log(index);
    console.log(text.substring(index,index+x.length));
    let highlighted_text = text.substring(0,index) +"<span style='background-color:yellow;'>" +text.substring(index,index+x.length)+"</span>"+text.substring(index+x.length) 
    return highlighted_text
}


function createRecipe(recipe_info){
    let rmatch = recipe_info.match;
    console.log(rmatch)
    let main_div = $('<div class="recipe-main" id="recipe-main-id">');
    let header_div = $('<div class="row" id="recipe-header">');
    let image_div = $('<img onerror="this.onerror=null; this.src="https://i.pinimg.com/originals/3f/12/26/3f12264cad7f964c30ec0af37c19154a.png"">')
    
    image_div.attr("src",recipe_info.image);
    header_div.append(image_div);
    main_div.append(header_div);

    let body_div = $('<div class="row" id="recipe-body"></div>')
    let title_div = $('<div id = "recipe-title">')
   
    if (rmatch === 'title'){
        let highlighted_text = highlight_search(recipe_info.title, search_text);
        let highlighted_title = $('<h4>'+highlighted_text+'</h4>');
        title_div.append(highlighted_title);
            
    }else{
        title_div.append('<h4>'+recipe_info.title+'</h4>')
    }
       
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
    info_div.append('<div class="col-md-3 col-s-3 col-xs-3 col-3"><img src="https://img.icons8.com/ios/50/000000/clock--v1.png" id="i1"/><p id="recipe-time">'+recipe_info.total_time+' Mins</p></div>')
    info_div.append('<div class="col-md-4 col-s-4 col-xs-4 col-4"><img src="https://img.icons8.com/wired/64/000000/restaurant.png" id="i2"/><p id="recipe-servings">'+recipe_info.servings+' Servings</p></div>')

    if (rmatch === 'author'){
        let highlighted_text = highlight_search(recipe_info.author, search_text);
        info_div.append('<div class="col-md-5 col-s-5 col-xs-5 col-5"><img src="https://img.icons8.com/ios/50/000000/user--v1.png" id="i3"/><p id="recipe-author">'+highlighted_text+'</p></div>')
    
    }else{
        info_div.append('<div class="col-md-5 col-s-5 col-xs-5 col-5"><img src="https://img.icons8.com/ios/50/000000/user--v1.png" id="i3"/><p id="recipe-author">'+recipe_info.author+'</p></div>')
    
    }

    main_div.append(info_div);
    if (recipe_info.courses){
        if (rmatch === 'courses'){
            let highlighted_text = highlight_search(recipe_info.courses.join('  |  '), search_text);
            main_div.append('<div class="row" id="recipe-courses"><p style="margin-bottom:-3px">'+highlighted_text+"</p></div>")
        }else{
            main_div.append('<div class="row" id="recipe-courses">'+recipe_info.courses.join('  |  ')+"</div>")
        }
        
    }
    let recipe_intro = recipe_info['summary'].split('.')[0]
    let recipe_intro_div = $('<div class="row" id="recipe-intro">')
    recipe_intro_div.append('<p id="recipe-intro-id">'+recipe_intro+'</p>')
    main_div.append(recipe_intro_div);
    $(main_div).click(function(){
        let pageURL = "http://127.0.0.1:5000/view/"+recipe_info.id;
        document.location.href = pageURL;
    });
    $('.recipes').append(main_div);

}


$(document).ready(function(){
    if (results.length==0){
        $('#bold-text').text('No Results found for \"'+search_text+'\"');
    }else{
        if (results.length == 1){
            $('#bold-text').text('Found '+String(results.length)+' Result for \"'+search_text+'\"');
        }else{
            $('#bold-text').text('Found '+String(results.length)+' Results for \"'+search_text+'\"');
        }
       
    
    }  
    
    // rendering on UI only search results    
    $(".home-recipes").empty();
    $(".recipes").empty();
    for (let i = 0; i < results.length; i++) {
        createRecipe(results[i],);     
    } 
    $('#search-text').val("");  
    $('#search-text').focus();  
    
});
    