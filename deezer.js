var Promise = require('q').Promise;
var request = require('request');

require('colors');

exports.action = function(data, callback){

	var tblCommand = {
		deezer: function() {deezer(data, client)}
	};

  let client = setClient(data);

	// Info console
	info("Deezer:", data.action.command, "From:", data.client, "To:", client);
  // action
	tblCommand[data.action.command]();
	callback();

}

exports.mute = function (clientFrom, clientTo) {
		//clientFrom: Le client qui a passé la règle
    //clientTo: Le client courant (clientFrom ou Avatar.currentRoom)

    if (Avatar.isMobile(clientFrom)) {
      return;
    }
	if (Avatar.exists('deezer') && !Avatar.isMobile(clientFrom) && clientTo == 'Séjour')
		Avatar.runApp('%CD%/nircmd/nircmdc64', 'killprocess firefox.exe', clientTo);
    if (Avatar.exists('deezer') && !Avatar.isMobile(clientFrom)&& clientTo == 'Séjour')
		Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume 100000', clientTo);
	if (Avatar.exists('deezer') && !Avatar.isMobile(clientFrom) && clientTo == 'Chambre')
		Avatar.runApp('%CD%/nircmd/nircmdc64', 'killprocess firefox.exe', clientTo);
    if (Avatar.exists('deezer') && !Avatar.isMobile(clientFrom)&& clientTo == 'Chambre')
		Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume 100000', clientTo);
}

function deezer(data, client, clientFrom, clientTo) {
	
    Avatar.askme("Tu veux rechercher un artiste, un album, un titre, une playlist ou bien le flo ?", data.client,
	{
		"Un artiste" : "artiste",
		"Un album" : "album",
		"Un titre" : "titre",
		"Une playlist" : "playlist",
		"Le flow" : "flow",
		"terminer": "done"
	},0, function (answer, end) {
		switch (answer) {
		
			case "artiste" :
				end(data.client, true);
				Avatar.askme("Quel artiste souhaitez vous ?", data.client,
				{
					"*": ""
				},0, function (answer, end) {
					Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume -33000', clientTo)
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
					Avatar.speak("C'est parti.", data.client)
					listedeezer.push(objet.data[r]['album']['id'])
					}
					var maxdeezer=listedeezer.length;var mindezzer=0
					var rnddeezer= Math.floor(Math.random() * (maxdeezer - mindezzer) + mindezzer)
					var numerodeezer=listedeezer[rnddeezer]
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id='+numerodeezer
		
					Avatar.runApp(urldeezer, clientTo);
					end(data.client, true);

					})
				});
				break;

			case "album" :
				end(data.client, true);
				Avatar.askme("Quel album souhaitez vous ?", data.client,
				{
					"*": ""
				},0, function (answer, end) {
					Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume -33000', clientTo)
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
					Avatar.speak("C'est parti.", data.client)
					listedeezer.push(objet.data[r]['album']['id'])
					}					
					var maxdeezer=listedeezer.length;var mindezzer=0
					var rnddeezer= Math.floor(Math.random() * (maxdeezer - mindezzer) + mindezzer)
					var numerodeezer=listedeezer[rnddeezer]
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id='+numerodeezer
		
					Avatar.runApp(urldeezer, clientTo);
					end(data.client, true);

					})
				});
				break;
				
			case "titre" :
				end(data.client, true);
				Avatar.askme("Quel titre souhaitez vous ?", data.client,
				{
					"*" : ""
				},0, function (answer, end) {
					Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume -33000', clientTo)
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
					Avatar.speak("C'est parti.", data.client)
					listedeezer.push(objet.data[r]['id'])
					}
					var maxdeezer=listedeezer.length;var mindezzer=0
					var rnddeezer= Math.floor(Math.random() * (maxdeezer - mindezzer) + mindezzer)
					var numerodeezer=listedeezer[rnddeezer]
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=tracks&id='+numerodeezer
		
					Avatar.runApp(urldeezer, clientTo);
					end(data.client, true);

					})
				});
				break;
			
			case "playlist" :
				end(data.client, true);
				Avatar.askme("Vous avez le choix entre ces playlist. Seb, Marie, Soirée, Sport", data.client,
				{
					"Seb" : "seb"
				},0, function (answer, end) {
					Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume -33000', clientTo)
					info(answer)
					if(answer = 'Seb'){
					Avatar.speak("C'est parti.", data.client)
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=3155196562'
					Avatar.runApp(urldeezer, clientTo);
					end(data.client, true);
					}
				});
				break;
				
			case "flow" :
			    Avatar.speak("C'est parti.", data.client)
				Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume -33000', clientTo)
				var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=artist&id=47'
				Avatar.runApp(urldeezer, clientTo);
				end(data.client, true);
				break;
				
            case "done":
            default:
            Avatar.speak("Terminé", data.client, function(){
                end(data.client, true);
            });
		}
	});
}

function setClient (data) {

	var client = data.client;

	if (data.action.room)
		client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;

	if (data.action.setRoom)
		client = data.action.setRoom;

	return client;
}
