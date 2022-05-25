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
                var dataExist=false;
                if(data.length===0)
                {alert("Error: Please enter a valid city!");
                return;
                }
                var lat=data[0].lat;
                var long=data[0].lon;
                cityEl.className="city";
                cityEl.textContent=data[0].name+" "+date;
                if(localStorage){
                    for(i=0;i<localStorage.length;i++){
                       if(data[0].name===localStorage.getItem(i))
                           dataExist=true;
                    };
                    if(!dataExist){
                        localStorage.setItem(counter,data[0].name);
                        counter++;
                    }
                } else {
                    localStorage.setItem(counter,data[0].name);
                    counter++;
                }
                dayEl.appendChild(cityEl);
                currentApiCall(lat,long);
            })
        } else {
            alert("Error:"+response.statusText);
        }
    })
};


var currentApiCall=function(lat,long){
    fetch(weatherApi+"lat="+lat+"&lon="+long+"&appid="+apiKey+"&units=metric").then(function(response){
        if(response.ok){
            response.json().then(function(data){
            var icon=data.current.weather[0].icon;
            var img = new Image();
            img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            cityEl.appendChild(img);
            var temp=data.current.temp;
            var wind=data.current.wind_speed;
            var humidity=data.current.humidity;
            var uV=data.current.uvi;
            var cityDetails=document.createElement("div");
            var index;
            if(uV<5)
                index="low";
            else if(uV>=5&&uV<=8)
                index="med";
            else
                index="high";
            cityDetails.innerHTML+= `
            <h4> Temp: ${temp}<span>&#176;</span>C</h4>
            <h4> Wind: ${wind} MPS </h4>
            <h4> Humidity: ${humidity}%</h4>
            <h4 class="${index}"> UV Index: ${uV} </h4>
            `;
            dayEl.appendChild(cityDetails);
            // forecastEl.textContent="5 Day Forecast";
            for(i=0;i<5;i++){
                var forecastContainerEl=document.createElement("div");
                forecastContainerEl.className="col";
                icon=data.daily[i].weather[0].icon;
                var imgSrc=`http://openweathermap.org/img/wn/${icon}@2x.png`;
                forecastContainerEl.innerHTML=`
                <h3>${moment().add(1+i, 'd').format('l')} </h3>
                <img src=${imgSrc}></img>
                <h4>Temp: ${data.daily[i].temp.day}<span>&#176;</span>C</h4>
                <h4>Wind: ${data.daily[i].wind_speed} MPS</h4>
                <h4>Humidity: ${data.daily[i].humidity}%</h4>
                `;
                forecastEl.appendChild(forecastContainerEl);
               
            }
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
            storeHistory.textContent=cityHistory;
            historyEl.appendChild(storeHistory);
        };
    };
};

var click = function(){
btnEl.addEventListener('click',function(){
    inputCity=document.getElementById("searchCity").value;
    document.getElementById("searchCity").value="";
    dayEl.innerHTML="";
    forecastEl.innerHTML="";
    geoApiCall();
});
};

historyEl.addEventListener('click',function(event){
    inputCity=event.target.textContent;
    dayEl.innerHTML="";
    forecastEl.innerHTML="";
    geoApiCall();
});

click();
getStorage();



