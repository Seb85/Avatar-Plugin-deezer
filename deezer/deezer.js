var fs = require('fs-extra');
var request = require('request');

require('colors');


exports.action = function(data, callback){
  
	var tblCommand = {
		
		error: function() {Avatar.speak(data.action.error, data.client, function() {  
								Avatar.Speech.end(data.client);
							});
		},
		deezertitle: function() {deezerfunctiontitle(data.client, data.action.sentence, data.action.info)},
		deezerartiste: function() {deezerfunctionartiste(data.client, data.action.sentence, data.action.info)},
		deezeralbum: function() {deezerfunctionalbum(data.client, data.action.sentence, data.action.info)}
	};
	
	info("deezer command:", data.action.command.yellow, "From:", data.client.yellow);
	tblCommand[data.action.command]();
  
	callback();
  
}

exports.mute = function (client, clientFrom, clientTo) {
    //clientFrom: Le client qui a passé la règle
    //clientTo: Le client courant (clientFrom ou client mappé (avec Avatar.currentRoom))

    //Ajout ici d'une action pour couper le son
    client = Avatar.transfertClient(client);
    if (Avatar.exists('jarvis') && !Avatar.isMobile(client)&& client == 'Séjour')
		Avatar.call('jarvis', {action : {command: 'killdeezer'}, client: client});
	if (Avatar.exists('jarvis') && !Avatar.isMobile(client)&& client == 'Chambre')
		Avatar.call('jarvis', {action : {command: 'killdeezer'}, client: client});

}

function deezerfunctionalbum(client, sentence, deezeralbum) {
	
	if (deezeralbum) {
		Avatar.runApp("C:\\Avatar\\Client\\app\\jarvis\\deezerstart.bat", client);
		
		info(sentence)
		var urldeezer='https://api.deezer.com/search/?q='+sentence
		request({ url : urldeezer }, function (err, response, body){
		var objet = JSON.parse(body);
		var listedeezer=[]


		for(var r=0 ; r<objet.data.length ; r++){
		if(listedeezer.indexOf(objet.data[r]['album']['id'])<0){
		//Avatar.speak("C'est parti.", client);
		listedeezer.push(objet.data[r]['album']['id'])
		}
		}
		var maxdeezer=listedeezer.length;var mindezzer=0
			var rnddeezer= Math.floor(Math.random() * (maxdeezer - mindezzer) + mindezzer)
		var numerodeezer=listedeezer[rnddeezer]
		var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id='+numerodeezer
		
		Avatar.runApp(urldeezer, client);
		Avatar.Speech.end(client);
		return false

			})
		
	} else
		Avatar.speak("Je ne suis pas arrivé a récupérer des info" + (sentence ? (" sur " + sentence) : ''), client, function(){
			Avatar.Speech.end(client);
		});

}

function deezerfunctionartiste(client, sentence, deezerartist) {
	
	if (deezerartist) {
		Avatar.runApp("C:\\Avatar\\Client\\app\\jarvis\\deezerstart.bat", client);
		
		info(sentence)
		var urldeezer='https://api.deezer.com/search/?q='+sentence
		request({ url : urldeezer }, function (err, response, body){
		var objet = JSON.parse(body);
		var listedeezer=[]


		for(var r=0 ; r<objet.data.length ; r++){
		if(listedeezer.indexOf(objet.data[r]['artist']['id'])<0){
		//Avatar.speak("C'est parti.", client);
		listedeezer.push(objet.data[r]['artist']['id'])
		}
		}
		var maxdeezer=listedeezer.length;var mindezzer=0
			var rnddeezer= Math.floor(Math.random() * (maxdeezer - mindezzer) + mindezzer)
		var numerodeezer=listedeezer[rnddeezer]
		var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=artiste&id='+numerodeezer
		
		Avatar.runApp(urldeezer, client);
		Avatar.Speech.end(client);
		return false

			})
		
	} else
		Avatar.speak("Je ne suis pas arrivé a récupérer des info" + (sentence ? (" sur " + sentence) : ''), client, function(){
			Avatar.Speech.end(client);
		});

}

function deezerfunctiontitle(client, sentence, deezertitle) {
	
	if (deezertitle) {
		Avatar.runApp("C:\\Avatar\\Client\\app\\jarvis\\deezerstart.bat", client);
		
		info(sentence)
		var urldeezer='https://api.deezer.com/search/?q='+sentence
		request({ url : urldeezer }, function (err, response, body){
		var objet = JSON.parse(body);
		var listedeezer=[]


		for(var r=0 ; r<objet.data.length ; r++){
		if(listedeezer.indexOf(objet.data[r]['id'])<0){
		//Avatar.speak("C'est parti.", client);
		listedeezer.push(objet.data[r]['id'])
		}
		}
		var maxdeezer=listedeezer.length;var mindezzer=0
			var rnddeezer= Math.floor(Math.random() * (maxdeezer - mindezzer) + mindezzer)
		var numerodeezer=listedeezer[rnddeezer]
		var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=tracks&id='+numerodeezer
		
		Avatar.runApp(urldeezer, client);
		Avatar.Speech.end(client);
		return false

			})
		
	} else
		Avatar.speak("Je ne suis pas arrivé a récupérer des info" + (sentence ? (" sur " + sentence) : ''), client, function(){
			Avatar.Speech.end(client);
		});

}