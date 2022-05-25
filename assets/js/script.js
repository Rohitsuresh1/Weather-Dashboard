var dayEl=document.querySelector(".daycontainer");
var forecastEl=document.querySelector(".forecast");
var btnEl=document.querySelector(".btn");
var inputCity; var counter;
var cityEl=document.createElement("h2");
var geoApi="http://api.openweathermap.org/geo/1.0/direct?q=";
var apiKey="c6fc4977c85a1eebd5a68d26a53b18d6";
var weatherApi="https://api.openweathermap.org/data/2.5/onecall?";
var historyEl=document.querySelector(".history");


var date=moment().format('l'); 

var geoApiCall = function(){
 fetch(geoApi+inputCity+"&appid="+apiKey).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                var lat=data[0].lat;
                var long=data[0].lon;
                cityEl.className="city";
                console.log(data);
                cityEl.textContent=data[0].name+" "+date;
                localStorage.setItem(counter,data[0].name);
                counter++;
                dayEl.appendChild(cityEl);
                currentApiCall(lat,long);
            })
        } else {
            alert("Error:"+response.statusText);
        }
    })
};


var currentApiCall=function(lat,long){
    fetch(weatherApi+"lat="+lat+"&lon="+long+"&appid="+apiKey).then(function(response){
        if(response.ok){
            response.json().then(function(data){
            console.log(data);
            var temp=data.current.temp - 273;
            var wind=data.current.wind_speed;
            var humidity=data.current.humidity;
            var uV=data.current.uvi;
            console.log(temp,wind,humidity,uV);
            
            })
        } else {
            alert("Error:"+response.statusText);
        }
    })
    getStorage();
};


var getStorage = function() {
    if(localStorage){
        historyEl.textContent="";
        var storedEl=document.createElement("button");
        storedEl.className="historybtn";
        counter=localStorage.length;
        var lineEL=document.createElement("hr");
        historyEl.appendChild(lineEL);
        for(i=counter-1;i>=0;i--){
            var cityHistory=localStorage.getItem(i);
            var storeHistory=document.createElement("button");
            storeHistory.className="historybtn";
            console.log(i,cityHistory);
            storeHistory.textContent=cityHistory;
            console.log(storeHistory);
            historyEl.appendChild(storeHistory);
        };
    };
};

var click = function(){
btnEl.addEventListener('click',function(){
    inputCity=document.getElementById("searchCity").value;
    document.getElementById("searchCity").value="";
    geoApiCall();
});
};

historyEl.addEventListener('click',function(event){
    console.log(event.target.textContent);
    inputCity=event.target.textContent;
    geoApiCall();
});

click();
getStorage();



