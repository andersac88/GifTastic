var i = 0;
var images = []
var button = []
var queryURL = "http://api.giphy.com/v1/gifs/search?q=cats&api_key=P0nquDLJ1q86xUkaky5VJsXRacogZQyw&limit=15";


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    console.log(response)
  console.log(response.data[1].url);
  console.log(i)

  $(".fun").on("click", function() {
    for (i = 0; i < 5; i++) {
        var img = $("<img>")
        img.attr("src", response.data[i].images.downsized.url)
        $("body").append(img)}
        console.log(i)
    $(".fun").on("click", function() {  
    if (i === 5) {
    for (i = 5; i < 15; i++) {
        var img = $("<img>")
        img.attr("src", response.data[i].images.downsized.url)
        $("body").append(img)}
    }
    })
})
})






