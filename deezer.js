var fs = require('fs-extra');
var request = require('request');

require('colors');


exports.action = function(data, callback){
  
	var tblCommand = {
		
		error: function() {Avatar.speak(data.action.error, data.client, function() {  
								Avatar.Speech.end(data.client);
							});
		},
		deezer: function() {deezerfunction(data.client, data.action.sentence, data.action.info)}
	};
	
	info("deezer command:", data.action.command.yellow, "From:", data.client.yellow);
	tblCommand[data.action.command]();
  
	callback();
  
}

function deezerfunction(client, sentence, deezer) {
	
	if (deezer) {
		info(sentence)
		var urldeezer='https://api.deezer.com/search/?q='+sentence
		request({ url : urldeezer }, function (err, response, body){
		var objet = JSON.parse(body);
		var listedeezer=[]


		for(var r=0 ; r<objet.data.length ; r++){
		if(listedeezer.indexOf(objet.data[r]['album']['id'])<0){
		listedeezer.push(objet.data[r]['album']['id'])
		}
		}
		var maxdeezer=listedeezer.length;var mindezzer=0
			var rnddeezer= Math.floor(Math.random() * (maxdeezer - mindezzer) + mindezzer)
		var numeroalbumdeezer=listedeezer[rnddeezer]
		var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id='+numeroalbumdeezer
		
		Avatar.runApp(urldeezer, client);
		Avatar.Speech.end(client);
		return false

			})
		
	} else
		Avatar.speak("Je ne suis pas arrivé a récupérer des info" + (sentence ? (" sur " + sentence) : ''), client, function(){
			Avatar.Speech.end(client);
		});

}
