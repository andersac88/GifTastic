var topics = ["Bart Simpson", "Homer Simpson", "Ned Flanders", "Marge Simspon", "Maggie Simpson", "Lionel Hutz", "Ralph Wiggum", "Principal Skinner", "Mayor Quimby", "Troy McClure"];
var more;
var favorites = JSON.parse(localStorage.getItem("favoritelist"));

if (!Array.isArray(favorites)) {
    favorites = [];
  }

function displayGIF() {
    console.log(this)
    var more = $(this).attr("data-number")
    var gifName = $(this).attr("data-value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=P0nquDLJ1q86xUkaky5VJsXRacogZQyw&limit=30";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response)
            $(".crate").remove();
            $("img").remove();
            $("p").remove()
            
            for (var i = 0; i < 10; i++){  
                var box = $("<div>");
                box.addClass("crate text-center")
                $(".boxes").append(box);
                var img = $("<img>");
                img.attr("src", response.data[i].images.fixed_height_still.url);
                img.attr("data-still", response.data[i].images.fixed_height_still.url);
                img.attr("data-animate", response.data[i].images.fixed_height.url);
                img.attr("data-state", "still")
                img.addClass("gif")
                $(box).append(img);
                var title = $("<p>")
                title.addClass("align-items-end text-center text-capitalize text-truncate")
                title.text(response.data[i].title)
                $(box).append(title)
                var rating = $("<p>")
                rating.addClass("align-items-end text-center text-uppercase")
                rating.text("Rating " + response.data[i].rating)
                $(box).append(rating)
                var download = $("<a>")
                download.attr("href", response.data[i].images.downsized.url)
                download.attr("download", "Downloaded.gif");
                download.html("<button type='button' class='mb-3 btn btn-warning btn-block'>Download</button>")
                $(box).append(download)
            } moveGif() 
               });
}

function moreGifs() {
    console.log(this)
    var more = $(this).attr("data-number")
    var gifName = $(this).attr("data-value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=P0nquDLJ1q86xUkaky5VJsXRacogZQyw&limit=30";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response)
            $(".crate").remove();
            $("img").remove();
            $("p").remove()
            for (var i = 0; i < 20; i++){  
                var box = $("<div>");
                box.addClass("crate text-center")
                $(".boxes").append(box);
                var img = $("<img>");
                img.attr("src", response.data[i].images.fixed_height_still.url);
                img.attr("data-still", response.data[i].images.fixed_height_still.url);
                img.attr("data-animate", response.data[i].images.fixed_height.url);
                img.attr("data-state", "still")
                img.addClass("gif")
                $(box).append(img);
                var title = $("<p>")
                title.addClass("align-items-end text-center text-capitalize text-truncate")
                title.text(response.data[i].title)
                $(box).append(title)
                var rating = $("<p>")
                rating.addClass("align-items-end text-center text-uppercase")
                rating.text("Rating " + response.data[i].rating)
                $(box).append(rating)
                var download = $("<a>")
                download.attr("href", response.data[i].images.downsized.url)
                download.attr("download", "Downloaded.gif");
                download.html("<button type='button' class='mb-3 btn btn-warning btn-block'>Download</button>")
                $(box).append(download)
            } moveGif() 
               });
}

function moveGif() {
    $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");}
});
}

function searchButtons() {
    // Deleting the topics prior to adding new movies
    $(".header").empty();
    // Looping through the array of topics
    for (var j = 0; j < topics.length; j++) {
      var a = $("<button>");
      a.addClass("topic-btn btn btn-warning mb-3 mx-1");
      a.attr("data-value", topics[j]);
      a.attr("data-number", 1)
      a.text(topics[j]);
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

function favoriteList() {
        console.log("success")
        var temp = $(this).attr("data-animate")
        console.log(temp)
        favorites.push(temp)
        console.log(favorites)
        localStorage.setItem("favoritelist", JSON.stringify(favorites));
}

function renderFavorites() {
    $(".favorites").empty();
    for (f = 0; f < favorites.length; f++){
        var fav = $("<img>");
        fav.attr("src", favorites[f]);
        fav.attr("data-value", f)
        fav.addClass("m-3 fav")
        $(".favorites").append(fav);
    }
}

function removeFavorites() {
    var favoriteNumber = $(this).attr("data-value");
    favorites.splice(favoriteNumber, 1);
    renderFavorites();
    localStorage.setItem("favoritelist", JSON.stringify(favorites));
  };


  $(".favs").on("click", renderFavorites)
  $(document).on("click", ".fav", removeFavorites);
  $(document).on("click", ".topic-btn", displayGIF); 
  $(document).on("dblclick", ".topic-btn", moreGifs);
  $(document).on("dblclick", ".gif", favoriteList);
  searchButtons();



 