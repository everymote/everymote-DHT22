var Sensor = require("sensor-am2302"),
    temp_hum = new Sensor({pin:4}),
    config = require('./config');

var readTemp = function(callback){
    temp_hum.read(function(err, data) {
    if (err) {
        console.error(err);
    } else {
        callback(data);
        console.log("Temp: ", data.temp);
        console.log("Hum:  ", data.hum);
    }
});
};



var createThing = function(){
    
	var thing = {};


    thing.settings = { 
		"name": 'Temperature & Humidity @ mobenga',
		"id": 3942879,
		"iconType": "Thermometeer",
		"position": config.getPosition(),
		"information":[{
                        "header":"Temperature @ mobenga"
					}]};
		

	var timeForUpdate = function() {
       var update = function(data){
           if(thing.socket){
		//console.log(data);
            thing.socket.emit('updateInfo', data.temp +" °C, " + data.hum + " %");
            }
        };
        readTemp(update);
    };
    
    var intervalId = setInterval(timeForUpdate, 3000);
	return thing;
};

module.exports.thing = createThing();
