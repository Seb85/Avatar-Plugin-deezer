var Promise = require('q').Promise;
var request = require('request');

require('colors');

exports.action = function(data, callback){
	
	var tblCommand = {
		deezer: function() {deezer(data.client);}
	};
	
	info("Deezer command:", data.action.command.yellow, "From:", data.client.yellow);
	tblCommand[data.action.command]();
	
	callback();
}

exports.mute = function (clientFrom, clientTo) {
		//clientFrom: Le client qui a passé la règle
    //clientTo: Le client courant (clientFrom ou Avatar.currentRoom)

    if (Avatar.isMobile(clientFrom)) {
      return;
    }
	//Avatar.runApp('%CD%/nircmd/nircmdc64', 'killprocess firefox.exe', Avatar.currentRoom);
	//Avatar.runApp('%CD%/nircmd/nircmd', 'changesysvolume 33000', Avatar.currentRoom);
}

function deezer(client) {
	
    Avatar.askme("Tu veux rechercher un artiste, un album, un titre, une playlist ou bien le flo ?", client,
	{
		"Un artiste" : "artiste",
		"Un album" : "album",
		"Un titre" : "titre",
		"Une playlist" : "playlist",
		"Le flow" : "flow"
	},0, function (answer, end) {
		switch (answer) {
		
			case "artiste" :
				end (client);
				Avatar.askme("Quel artiste souhaitez vous ?", client,
				{
					"*": ""
				},0, function (answer, end) {
					Avatar.runApp('%CD%/nircmd/nircmd', 'changesysvolume -33000', client)
					answer = answer.replace('l\'','');
					answer = answer.replace('é','e');
					answer = answer.replace('è','e');
					answer = answer.replace('ê','e');
					answer = answer.replace('ç','c');
					answer = answer.replace('ö','o');
					answer = answer.replace('à','a');
					answer = answer.replace('ï','i');
					answer = answer.replace(':','');
					answer = answer.replace('.','');
					answer = answer.replace(',','');
					answer = answer.replace(';','');
					answer = answer.replace('?','');
					answer = answer.replace('!','');
					answer = answer.replace('&','');
					answer = answer.replace(answer[0], answer[0].toUpperCase());
					info(answer)
					var urldeezer='https://api.deezer.com/search/?q='+answer
					request({ url : urldeezer }, function (err, response, body){
					var objet = JSON.parse(body);
					var listedeezer=[]


					var r='0'
					if(listedeezer.indexOf(objet.data[r]['album']['id'])<0){
					Avatar.speak("C'est parti.", client)
					listedeezer.push(objet.data[r]['album']['id'])
					}
					var maxdeezer=listedeezer.length;var mindezzer=0
					var rnddeezer= Math.floor(Math.random() * (maxdeezer - mindezzer) + mindezzer)
					var numerodeezer=listedeezer[rnddeezer]
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id='+numerodeezer
		
					Avatar.runApp(urldeezer, client);
					Avatar.Speech.end(client);
					end(client, true);

					})
				});
				break;

			case "album" :
				end (client);
				Avatar.askme("Quel album souhaitez vous ?", client,
				{
					"*": ""
				},0, function (answer, end) {
					Avatar.runApp('%CD%/nircmd/nircmd', 'changesysvolume -33000', client)
					answer = answer.replace('l\'','');
					answer = answer.replace('é','e');
					answer = answer.replace('è','e');
					answer = answer.replace('ê','e');
					answer = answer.replace('ç','c');
					answer = answer.replace('ö','o');
					answer = answer.replace('à','a');
					answer = answer.replace('ï','i');
					answer = answer.replace(':','');
					answer = answer.replace('.','');
					answer = answer.replace(',','');
					answer = answer.replace(';','');
					answer = answer.replace('?','');
					answer = answer.replace('!','');
					answer = answer.replace('&','');
					answer = answer.replace(answer[0], answer[0].toUpperCase());
					info(answer)
					var urldeezer='https://api.deezer.com/search/?q='+answer
					request({ url : urldeezer }, function (err, response, body){
					var objet = JSON.parse(body);
					var listedeezer=[]


					var r='0'
					if(listedeezer.indexOf(objet.data[r]['album']['id'])<0){
					Avatar.speak("C'est parti.", client)
					listedeezer.push(objet.data[r]['album']['id'])
					}					
					var maxdeezer=listedeezer.length;var mindezzer=0
					var rnddeezer= Math.floor(Math.random() * (maxdeezer - mindezzer) + mindezzer)
					var numerodeezer=listedeezer[rnddeezer]
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id='+numerodeezer
		
					Avatar.runApp(urldeezer, client);
					Avatar.Speech.end(client);
					end(client, true);

					})
				});
				break;
				
			case "titre" :
				end (client);
				Avatar.askme("Quel titre souhaitez vous ?", client,
				{
					"*" : ""
				},0, function (answer, end) {
					Avatar.runApp('%CD%/nircmd/nircmd', 'changesysvolume -33000', client)
					answer = answer.replace('l\'','');
					answer = answer.replace('é','e');
					answer = answer.replace('è','e');
					answer = answer.replace('ê','e');
					answer = answer.replace('ç','c');
					answer = answer.replace('ö','o');
					answer = answer.replace('à','a');
					answer = answer.replace('ï','i');
					answer = answer.replace(':','');
					answer = answer.replace('.','');
					answer = answer.replace(',','');
					answer = answer.replace(';','');
					answer = answer.replace('?','');
					answer = answer.replace('!','');
					answer = answer.replace('&','');
					answer = answer.replace(answer[0], answer[0].toUpperCase());
					info(answer)
					var urldeezer='https://api.deezer.com/search/?q='+answer
					request({ url : urldeezer }, function (err, response, body){
					var objet = JSON.parse(body);
					var listedeezer=[]


					var r='0'
					if(listedeezer.indexOf(objet.data[r]['id'])<0){
					Avatar.speak("C'est parti.", client)
					listedeezer.push(objet.data[r]['id'])
					}
					var maxdeezer=listedeezer.length;var mindezzer=0
					var rnddeezer= Math.floor(Math.random() * (maxdeezer - mindezzer) + mindezzer)
					var numerodeezer=listedeezer[rnddeezer]
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=tracks&id='+numerodeezer
		
					Avatar.runApp(urldeezer, client);
					Avatar.Speech.end(client);
					end(client, true);

					})
				});
				break;
			
			case "playlist" :
				end (client);
				Avatar.askme("Vous avez le choix entre ces playlist. Seb, Marie, Soirée, Sport", client,
				{
					"Seb" : "seb",
					"Marie" : "marie",
					"Soirée" : "soiree",
					"Sport" : "sport"
				},0, function (answer, end) {
					Avatar.runApp('%CD%/nircmd/nircmd', 'changesysvolume -33000', client)
					info(answer)
					if(answer = 'Seb'){
					Avatar.speak("C'est parti.", client)
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=3165196562'
					Avatar.runApp(urldeezer, client);
					Avatar.Speech.end(client);
					end(client, true);
					}
					if(answer = 'marie'){
					Avatar.speak("C'est parti.", client)
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=3602432802'
					Avatar.runApp(urldeezer, client);
					Avatar.Speech.end(client);
					end(client, true);
					}
					if(answer = 'soiree'){
					Avatar.speak("C'est parti.", client)
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=4368032762'
					Avatar.runApp(urldeezer, client);
					Avatar.Speech.end(client);
					end(client, true);
					}
					if(answer = 'sport'){
					Avatar.speak("C'est parti.", client)
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=3628105122'
					Avatar.runApp(urldeezer, client);
					Avatar.Speech.end(client);
					end(client, true);
					}
				});
				break;
				
			case "flow" :
			    Avatar.speak("C'est parti.", client)
				Avatar.runApp('%CD%/nircmd/nircmd', 'changesysvolume -33000', client)
				end (client);
				var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=artist&id=47'
				Avatar.runApp(urldeezer, client);
				Avatar.Speech.end(client);
				end(client, true);
				break;
				
			default:
			break;	
		}
	});
}