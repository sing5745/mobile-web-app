

function showPosition(position) {

    var urlData = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=e00e1a0fa193f245f7a19bc0ced27885';

    var urlCity = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=e00e1a0fa193f245f7a19bc0ced27885';


    $.ajax({
        url: urlCity,
        type: 'GET',
        dataType: 'JSON',
        success: sendData,
        error: function(resp) {}
    });

    $.ajax({
        url: urlData,
        type: 'GET',
        dataType: 'JSON',
        success: showTableData,
        error: function(resp) {}
    });

}

function displayCity(labelAr, dataAr, rainAr, city) {
    var ctx = document.getElementById('myChart').getContext('2d'); // CanvasRenderingContext2D

    var chartCity = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelAr,
            datasets: [{
                    label: "Temp: " + city,
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgb(255, 99, 132)',
                    data: dataAr,
                    type: 'line'
                },
                {
                    label: "Rain: " + city,
                    fill: false,
                    borderColor: 'dodgerblue',
                    backgroundColor: 'dodgerblue',
                    data: rainAr,
                    type: 'bar'
                }
            ]
        }

    });
	
	//chartCity.destroy();
}




function searchCity() {

    //chartCity.destroy();
	
	var urlCity,urlData;
	var v = $('#city').val();
	var sub = v.split(",");
	var co = sub[2].trim().substring(0, 2);
	
	var lati,longi;
	
	var geocoder = new google.maps.Geocoder();
        var address = $('#city').val();

        geocoder.geocode({ 'address': address }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                 lati = results[0].geometry.location.lat();
                 longi = results[0].geometry.location.lng();
				
				urlCity = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lati + '&lon=' + longi + '&appid=e00e1a0fa193f245f7a19bc0ced27885';
				
				urlData = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lati + '&lon=' + longi + '&appid=e00e1a0fa193f245f7a19bc0ced27885';

				console.log(urlData);
				

				$.ajax({
					url: urlCity,
					type: 'GET',
					dataType: 'JSON',
					success: function(resp) {
						sendData(resp);
					},
					error: function(resp) {}
				});

				$.ajax({
					url: urlData,
					type: 'GET',
					dataType: 'JSON',
					success: showTableData,
					error: function(resp) {}
				});
				
            }
        });
	
	
	
	//$('#city').val('');

}



function showTableData(resp) {
    var v = resp.sys.country;
    var html = '<h3>Weather in ' + resp.name + ', ' + (resp.sys.country);

    html += '<div><img src=http://openweathermap.org/img/w/' + resp.weather[0].icon + '.png >';

    html += '<span>' + Math.floor(resp.main.temp - 273.15) + '&deg C</span><p>' + resp.weather[0].description + '</p></h3>';

    html += '<table width="300"><tbody>';
    html += '<tr><td>Clouds</td><td>' + resp.clouds.all + '%</td></tr>';
    html += '<tr><td>Humidity</td><td>' + resp.main.humidity + '%</td></tr>';
    html += '<tr><td>Speed</td><td>' + resp.wind.speed + ' m/s</td></tr>';
    html += '<tr><td>Pressure</td><td>' + resp.main.pressure + ' hpa</td></tr>';

    html += '<tr><td>Sunrise</td><td>' + moment.unix(resp.sys.sunrise).format('HH:MM') + '</td></tr>';

    html += '<tr><td>Sunset</td><td>' + moment.unix(resp.sys.sunset).format('HH:mm') + '</td></tr>';

    html += '</tbody></table>'
    $('#weather').html(html);

}

//this function displays chart
function sendData(myJson) {

    console.log("JSON", myJson.main);
    var labelArray = new Array();
    var dataArray = new Array();
    var rainArray = new Array();

    for (i in myJson.list) {

        if (myJson.list[i].rain != undefined) {
            
            rainArray.push(myJson.list[i].rain['3h'] || 0);
        } else {
            rainArray.push(0);
        }


        labelArray.push(moment.unix(myJson.list[i].dt).format('DD/MM/YYYY'));
        dataArray.push((myJson.list[i].main.temp - 273.15).toFixed(2));
    }


    displayCity(labelArray, dataArray, rainArray, myJson.city.name);
    showTableData(myJson);
}

function compareCity() {
    var urlCity1 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + $('#city1').val() + '&appid=e00e1a0fa193f245f7a19bc0ced27885';

    var urlData1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + $('#city1').val() + '&appid=e00e1a0fa193f245f7a19bc0ced27885';

    var urlCity2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + $('#city2').val() + '&appid=e00e1a0fa193f245f7a19bc0ced27885';

    var urlData2 = 'https://api.openweathermap.org/data/2.5/weather?q=' + $('#city2').val() + '&appid=e00e1a0fa193f245f7a19bc0ced27885';

    var urlCity3 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + $('#city3').val() + '&appid=e00e1a0fa193f245f7a19bc0ced27885';

    var urlData3 = 'https://api.openweathermap.org/data/2.5/weather?q=' + $('#city3').val() + '&appid=e00e1a0fa193f245f7a19bc0ced27885';



    $.ajax({
        url: urlCity1,
        type: 'GET',
        dataType: 'JSON',
        success: function(resp) {
            var v1 = resp;

			
         
            var v2, v3;
            $.ajax({
                url: urlCity2,
                type: 'GET',
                dataType: 'JSON',
                success: function(resp2) {
                    v2 = resp2;
                    var aj2 = $.ajax({
                        url: urlCity3,
                        type: 'GET',
                        dataType: 'JSON',
                        success: function(resp3) {
                            v3 = resp3;

                            sendDataForCities(v1, v2, v3);

                        },
                        error: function(resp) {}
                    });
                },
                error: function(resp) {}
            });
        },
        error: function(resp) {}
    });



    $.ajax({
        url: urlData1,
        type: 'GET',
        dataType: 'JSON',
        success: function(resp) {
            cityDisplay(resp, 'weather1');
        },
        error: function(resp) {

        }
    });

    $.ajax({
        url: urlData2,
        type: 'GET',
        dataType: 'JSON',
        success: function(resp) {
            cityDisplay(resp, 'weather2');
        },
        error: function(resp) {}
    });

    $.ajax({
        url: urlData3,
        type: 'GET',
        dataType: 'JSON',
        success: function(resp) {
            cityDisplay(resp, 'weather3');
        },
        error: function(resp) {}
    });




}

function cityDisplay(resp, domId) {
    //alert(domId);
    var html = '<h3>Weather in ' + resp.name + ', ' + resp.sys.country;

    html += '<div><img src=http://openweathermap.org/img/w/' + resp.weather[0].icon + '.png >';

    html += '<span>' + Math.floor(resp.main.temp - 273.15) + '&deg C</span><p>' + resp.weather[0].description + '</p></h3>';

    html += '<table width="300"><tbody>';
    html += '<tr><td>Clouds</td><td>' + resp.clouds.all + '%</td></tr>';
    html += '<tr><td>Humidity</td><td>' + resp.main.humidity + '%</td></tr>';
    html += '<tr><td>Speed</td><td>' + resp.wind.speed + ' m/s</td></tr>';
    html += '<tr><td>Pressure</td><td>' + resp.main.pressure + ' hpa</td></tr>';

    html += '<tr><td>Sunrise</td><td>' + moment.unix(resp.sys.sunrise).format('HH:MM') + '</td></tr>';

    html += '<tr><td>Sunset</td><td>' + moment.unix(resp.sys.sunset).format('HH:mm') + '</td></tr>';

    html += '</tbody></table>'

    //console.log(html);
    $('#' + domId).html(html);
}

function displayMultipleCities(label1, data1, city1, data2, city2, data3, city3) {
    var ctx = document.getElementById('myChart1').getContext('2d'); // CanvasRenderingContext2D
    var chart2 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: label1,

            datasets: [{
                    label: city1,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: data1,
                },
                {
                    label: city2,
                    fill: false,
                    backgroundColor: 'rgb(55, 00, 32)',
                    borderColor: 'rgb(55, 00, 32)',
                    data: data2,
                },
                {
                    label: city3,
                    fill: false,
                    backgroundColor: 'green',
                    borderColor: 'green',
                    data: data3,
                }
            ]
        }
    });
}

function sendDataForCities(myJson1, myJson2, myJson3) {

    var labelArray = new Array();
    var dataArray = new Array();

    var labelArray1 = new Array();
    var dataArray1 = new Array();

    var labelArray2 = new Array();
    var dataArray2 = new Array();

    for (i in myJson1.list) {
        labelArray.push(moment.unix(myJson1.list[i].dt).format('DD/MM/YYYY'));
        dataArray.push((myJson1.list[i].main.temp - 273.15).toFixed(2));
    }

    for (i in myJson2.list) {
        labelArray1.push(moment.unix(myJson2.list[i].dt).format('DD/MM/YYYY'));
        dataArray1.push((myJson2.list[i].main.temp - 273.15).toFixed(2));
    }

    for (i in myJson3.list) {
        labelArray2.push(moment.unix(myJson3.list[i].dt).format('DD/MM/YYYY'));
        dataArray2.push((myJson3.list[i].main.temp - 273.15).toFixed(2));
    }
    //label1,data1,city1,data2,city2,data3,city3

    displayMultipleCities(labelArray, dataArray, myJson1.city.name, dataArray1, myJson2.city.name, dataArray2, myJson3.city.name);
    //showTableData(myJson);
}