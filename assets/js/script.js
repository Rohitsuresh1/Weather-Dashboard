var historyEl=document.querySelector(".history");
var dayEl=document.querySelector(".daycontainer");
var forecastEl=document.querySelector(".forecast");
var btnEl=document.querySelector(".btn");
var inputCity;
var geoApi="http://api.openweathermap.org/geo/1.0/direct";
var apiKey="c6fc4977c85a1eebd5a68d26a53b18d6";
var weatherApi="api.openweathermap.org/data/2.5/forecast";


var date=moment().format('l'); 


var getLocalStorage = function() {
    var storedEl=document.createElement("button");
    storedEl.className="historybtn";
    storedEl.textContent="test";

    //loop through the items and make the history visible with a line on top
  //  if(localStorage){
    // if there are ithems in history append <hr> element first
  //  for(i=0;i<.length;i++){

  //  };
  //  }
  historyEl.appendChild(storedEl);
};

btnEl.addEventListener('click',function(){
    inputCity=document.getElementById("searchCity").value;
    console.log(inputCity);
    var cityEl=document.createElement("h3");
    cityEl.className="city";
    cityEl.textContent=inputCity+" "+date;
    dayEl.appendChild(cityEl);

});






getLocalStorage();