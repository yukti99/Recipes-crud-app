
function edit_recipe(){
    var pageURL = "http://127.0.0.1:5000/edit/"+recipe.id;
    document.location.href = pageURL;
}


$(document).ready(function(){
    $("#edit-btn").keypress(function(event) {                       
        if (event.keyCode === 13) {      
            event.preventDefault(); 
            edit_recipe();
        }
    })
});

$(document).ready(function() {
    $("#edit-btn").click(function(event) {
       event.preventDefault();  
       edit_recipe();
    });
});

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


// Creating courses
$(document).ready(function(){
    let courses_div = $('.courses-class');
    for(let i=0;i<recipe.courses.length;i++){
        let course = $('<div id="courses">'+recipe.courses[i]+'</div><br></br>');
        $(course).click(function(){
            let pageURL = "http://127.0.0.1:5000/search/"+recipe.courses[i];
            urlExists(pageURL, function(exists){
                if (exists){
                    document.location.href = pageURL;
                }else{
                    pageURL = "http://127.0.0.1:5000/";
                    document.location.href = pageURL;
                }
            });
           
        });

        courses_div.append(course);
    }


});
