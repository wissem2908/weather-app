
$(document).ready(function(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;

    
            const url='https://api.openweathermap.org/data/2.5/weather?q=algiers&appid=3b5380aeb364a68d8896f38f7d1bdcea'


            $.ajax({
                url:url,
                method:'get',
                async:false,
                success:function(response){
                    console.log("response")
                    console.log(response)
                    weatherReport(response)
                }
            })
          
          

        
        })
    }  
})



function weatherReport(data){
const  urlcast = 'https://api.openweathermap.org/data/2.5/forecast?q='+data.name+'&appid=4cdb8227ca603e4fe167a816e3c864d6'


$.ajax({
    url:urlcast,
    method:"get",
    async:false,
    success:function(forecast){
        console.log(forecast)
        hourForecast(forecast)
        dayForecast(forecast)
        document.getElementById('city').innerText=data.name+', '+data.sys.country
        document.getElementById('temperature').innerText=Math.floor(data.main.temp-273)+' °C'
        document.getElementById('clouds').innerText=data.weather[0].description
        let icon = data.weather[0].icon;
        let urlIcon = 'https://api.openweathermap.org/img/w/'+icon+'.png'
        document.getElementById('img').src=urlIcon
    }
})

}


$('#search').click(function(){
    var place=$('#input').val()
    var  urlsearch = 'https://api.openweathermap.org/data/2.5/weather?q='+place+'&appid=3b5380aeb364a68d8896f38f7d1bdcea'
    $.ajax({
        url:urlsearch,
        method:'get',
        async:false,
        success:function(response){
            console.log("response")
            console.log(response)
            weatherReport(response)
        }
    })
  
})

function hourForecast(forecast){
   
var templist="";

    for (let i = 0; i < 5; i++) {
       
        var date = new Date(forecast.list[i].dt*1000)
        templist+=' <div class="next"> <div><p class="time">'+date.toLocaleTimeString(undefined,'Asia/Kolkata').replace(":00","")+'</p> <p>'+Math.floor(forecast.list[i].main.temp_max-273)+' °C / '+Math.floor(forecast.list[i].main.temp_min-273)+' C°</p> </div><p class="desc">'+forecast.list[i].weather[0].description+'</p></div>'
    
    }
    console.log(templist)
    $('.templist').empty()
    $('.templist').append(templist)
}

function dayForecast(forecast){


var weekF=""
    for (let i =8; i < forecast.list.length; i+=8) {
        
        weekF+=' <div class="dayF"><p class="date">'+new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata').replace(":00","")+'</p> <p>'+Math.floor(forecast.list[i].main.temp_max-273)+' °C / '+Math.floor(forecast.list[i].main.temp_min-273)+' C°</p> <p class="desc">'+forecast.list[i].weather[0].description+'</p> </div>'
        
    }
    $('.weekF').empty()
    $('.weekF').append(weekF)
}