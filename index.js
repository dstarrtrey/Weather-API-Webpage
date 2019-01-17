var x = document.getElementById("coordinates");
var y = document.getElementById("link");
var z = document.getElementById("data");
var w = document.getElementById("fullData")
var weather = document.getElementById("weather");
var image = document.getElementById("image");
var temp = document.getElementById("temperature");
//Gets geolocation data and redirects to showPosition
$(function main() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    } 
  else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    }
});
//Temporary, displays data from main() and subsequent functions
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    if(JSON.stringify(latitude).length>7){
      var newarr=JSON.stringify(latitude).split('');
      newarr=newarr.splice(0,6);
      latitude=newarr.join('');
    }
    if(JSON.stringify(longitude).length>7){
      var newarr=JSON.stringify(longitude).split('');
      newarr=newarr.splice(0,7);
      longitude=newarr.join('');
    }
    x.innerHTML = "Latitude: " + latitude + 
    "<br>Longitude: " + longitude; 
    var urlString = getLink(position.coords.latitude,position.coords.longitude);
    
    getInfo(urlString); 
    
}    
//Returns string URL based on coordinates (WORKS)
function getLink(latitude,longitude){
  var emptyURL='https://fcc-weather-api.glitch.me/api/current?lat=&lon='.split('');
  emptyURL.push(longitude);
  emptyURL.splice(50, 0, latitude);  
  var newUrl=emptyURL.join('');
  return newUrl;
}
//Reads data from URL location using jQuery
function getInfo(url){   
  $.get( url,function( data )  {
    //w.innerHTML=JSON.stringify(data);
    var string= JSON.stringify(data.weather[0].main) +JSON.stringify(data.weather[0].icon) +JSON.stringify(data.main);
    //z.innerHTML=string;
    weather.innerHTML=data.weather[0].main;
    document.getElementById("location").innerHTML=data.name;
    temp.innerHTML = JSON.stringify(data.main.temp) + " °C";
    //alert( "Load was performed." ); 
    setTimeout(backgroundImage(weather), 30);
}); 
}
function backgroundImage(weather){
  if(weather.innerHTML!==null){
    //alert(weather.textContent);
    if(weather.innerHTML=='Snow'){
      document.body.style.backgroundImage = "url('http://www.publicdomainpictures.net/pictures/10000/velka/1-1264521332gk1L.jpg')";
    }
    else if(weather.innerHTML=='Clear'){
      document.body.style.backgroundImage = "url('http://www.photos-public-domain.com/wp-content/uploads/2011/02/bright-sun-in-blue-sky.jpg')";
    }
    else if(weather.innerHTML=='Rain'){
      document.body.style.backgroundImage= "url('http://www.publicdomainpictures.net/pictures/160000/velka/pluie-sur-la-fenetre.jpg')";
    }
    else if(weather.innerHTML=='Clouds'){
      document.body.style.backgroundImage = "url('https://static.pexels.com/photos/928/sky-clouds-cloudy-blue.jpg')";
    }
    else if(weather.innerHTML=='Haze'){  
       document.body.style.backgroundImage = "url('http://www.publicdomainpictures.net/pictures/130000/velka/gray-haze-background.jpg')"; 
    }
    
  }    
}
function changeTemp(){
  var input=document.getElementById("tempChanger");
  if(input.value=="To Fahrenheit"){
    var arr=temp.innerHTML.split(' ');
    var newTemp=(arr[0]*9/5)+32;
    if(JSON.stringify(newTemp).length>8){
      var newarr=JSON.stringify(newTemp).split('');
      newarr=newarr.splice(0,5);
      newTemp=newarr.join('');
    }
    temp.innerHTML = newTemp + " °F";
    input.value = "To Celsius";    
  }
  else{
    var arr=temp.innerHTML.split(' ');
    var newTemp=(arr[0]-32)*5/9;
    if(JSON.stringify(newTemp).length>8){
      var newarr=JSON.stringify(newTemp).split('');
      newarr=newarr.splice(0,4);
      newTemp=newarr.join('');
    }
    temp.innerHTML = newTemp + " °C";
    input.value = "To Fahrenheit";
  }
}
