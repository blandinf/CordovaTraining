$(document).ready(function() {

    var city = localStorage.getItem("city");
    var card = $("#card");

    function getValue(){
            var  search = $("#city").val()
            console.log(search);
            if(search.length >= 3){
                localStorage.setItem("city",search);
                getWeather();
            } else
                alert("Empty field");
    }


    function getWeather(){
        if(city == "undefined"){
            card.append("Vous n'avez pas encore insere de valeur");
        } else {
            $("#card *:not(div)").remove();
            var api = "36662705041cbfc073898a900dc67081";
            $.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api, function (result) {
                var location = result.name;
                var temp = result.main.temp;
                var state = result.weather[0].main;
                var icon = result.weather[0].icon;
                var humidity = result.main["humidity"];

                card.append("<h2>" + location + "</h2>");
                card.append("Weather type : " + state+ "</br>");
                card.append("Temperature : " + Math.round((temp-273.15)) + "°" + "</br>");
                card.append("Humidity : " + humidity + "</br>");
                card.append("<img src='img/weather-icons/"+icon+".png'>");
            });
        }
    }

    $("form").submit(function(event){
        //event.prevent_default();
        getValue();
    });

    getWeather();


});