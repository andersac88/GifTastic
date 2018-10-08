var topics = ["Bart Simpson", "Homer Simpson", "Ned Flanders", "Marge Simspon", "Maggie Simpson", "Lionel Hutz", "Ralph Wiggum", "Principal Skinner", "Mayor Quimby", "Troy McClure"];
var i = 0;
var moving = false;

function displayGIF() {
  
    var gifName = $(this).attr("data-value");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=P0nquDLJ1q86xUkaky5VJsXRacogZQyw&limit=15";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        console.log(i);
        if (i === 0) {
            $("img").remove();
            for (i = 0; i < 5; i++){
                var img = $("<img>");
                img.attr("src", response.data[i].images.original_still.url);
                img.attr("data-number", i)
                img.addClass("m-3 gif")
                $(".images").append(img);}
                console.log(i);
            } else if (i === 5)  {
                $("img").remove();
                for (i = 0; i < 15; i++) {
                    var img = $("<img>");
                    img.attr("src", response.data[i].images.original_still.url);
                    img.attr("data-number", i)
                    img.addClass("m-3 gif")
                     $(".images").append(img);}
                     i = 0;
                    }    

            $(".gif").on("click", function() {
                console.log(this)
                if (moving === false) {
                var gifString = $(this).attr("data-number")
                var gifNumber = parseInt(gifString);
                console.log(gifNumber);
                moving = true;          
               $(this).attr("src", response.data[gifNumber].images.original.url)
                } else if (moving === true) {
                    var gifString = $(this).attr("data-number")
                    var gifNumber = parseInt(gifString);
                    console.log(gifNumber);               
                   $(this).attr("src", response.data[gifNumber].images.original_still.url)
                   moving = false;
                }
            });
      });
}




function searchButtons() {
    // Deleting the topics prior to adding new movies
    $(".header").empty();
    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("topic-btn btn btn-warning mx-1");
      a.attr("data-value", topics[i]);
      a.text(topics[i]);
      $(".header").append(a);
    }
  }

  $("#add-char").on("click", function(event){
    event.preventDefault();
    var submitChar = $("#char-input").val().trim();
    console.log(submitChar);
    topics.push(submitChar);
    console.log(topics);
    searchButtons();
    });


  $(document).on("click", ".topic-btn", displayGIF);
  searchButtons();
  
 

