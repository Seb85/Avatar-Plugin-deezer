var request = require('request');

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
	if (Avatar.exists('deezer') && !Avatar.isMobile(clientFrom)&& clientTo == 'Séjour')
		Avatar.runApp('%CD%/nircmd/nircmdc64', 'killprocess firefox.exe', clientTo, function () {
        })
    if (Avatar.exists('deezer') && !Avatar.isMobile(clientFrom)&& clientTo == 'Séjour')
		Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume 100000', clientTo, function () {
        })
	if (Avatar.exists('deezer') && !Avatar.isMobile(clientFrom)&& clientTo == 'Chambre')
		Avatar.runApp('%CD%/nircmd/nircmdc64', 'killprocess firefox.exe', clientTo, function () {
        })
}

function deezer(data, client, clientFrom, clientTo) {
	Avatar.runApp('%CD%/nircmd/nircmdc64', 'killprocess firefox.exe', clientTo, function () {
        });
	Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume 100000', clientTo, function () {
        });	
    Avatar.askme("Tu veux rechercher un artiste, un album, un titre, une playlist ou bien le flo ?", data.client,
	{
		"*": "generic",
        "terminer": "done"
	},0, function (answer, end) {

          if (answer && answer.indexOf('generic') != -1) {
              end(data.client);
              answer = answer.split(':')[1];

              if (answer.indexOf('artiste') != -1) {
                return deezerartiste(data, client);
              }

              if (answer.indexOf('album') != -1) {
                return deezeralbum(data, client);
              }

              if (answer.indexOf('titre') != -1) {
                return deezertitre(data, client);
              }
			  
			  if (answer.indexOf('playlist') != -1) {
                return deezerplaylist(data, client);
              }
			  
			  if (answer.indexOf('flow') != -1) {
				Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume -33000', clientTo, function () {
                });
				var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=artist&id=47';
				Avatar.runApp(urldeezer, clientTo, function () {
                });
				Avatar.speak("C'est parti.", data.client, function () {
                });
				end(data.client, true);
				return;
              }

              return Avatar.speak("Je suis désolé, je n'ai pas compris.", data.client, function(){
                  deezer(data, client)
              });
          }

          // Grammaire fixe
          switch(answer) {
            case "done":
            default:
                Avatar.speak("Terminé", data.client, function(){
                    end(data.client, true);
                });
         }
      })		
}			

function deezerartiste(data, client, clientFrom, clientTo) {
				Avatar.askme("Quel artiste souhaitez vous ?", data.client,
				{
					"*": "generic",
                    "terminer": "done"
				},0, function (answer, end) {
					if (answer && answer.indexOf('generic') != -1) {
					Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume -33000', clientTo, function () {
					});
					answer = answer.split(':')[1];
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

					if(listedeezer.indexOf(objet.data[0]['album']['id'])<0){
					Avatar.speak("C'est parti.", data.client, function () {
					});
					listedeezer.push(objet.data[0]['album']['id'])
					}
					var numerodeezer=listedeezer[0]
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id='+numerodeezer
		
					Avatar.runApp(urldeezer, clientTo);
					end(data.client, true);

					})
					return;
					}
					
					// Grammaire fixe
					switch(answer) {
					case "done":
					default:
						Avatar.speak("Terminé", data.client, function(){
							end(data.client, true);
					});
			}
	})
}

function deezeralbum(data, client, clientFrom, clientTo) {
				Avatar.askme("Quel album souhaitez vous ?", data.client,
				{
					"*": "generic",
                    "terminer": "done"
				},0, function (answer, end) {
					if (answer && answer.indexOf('generic') != -1) {
					Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume -33000', clientTo, function () {
					});
					answer = answer.split(':')[1];
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

					if(listedeezer.indexOf(objet.data[0]['album']['id'])<0){
					Avatar.speak("C'est parti.", data.client, function () {
					});
					listedeezer.push(objet.data[0]['album']['id'])
					}

					var numerodeezer=listedeezer[0]
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id='+numerodeezer
		
					Avatar.runApp(urldeezer, clientTo);
					end(data.client, true);

					})
					return;
					}
					
					// Grammaire fixe
					switch(answer) {
					case "done":
					default:
						Avatar.speak("Terminé", data.client, function(){
							end(data.client, true);
					});
			}
	})
}

function deezertitre(data, client, clientFrom, clientTo) {
				Avatar.askme("Quel titre souhaitez vous ?", data.client,
				{
					"*": "generic",
                    "terminer": "done"
				},0, function (answer, end) {
					if (answer && answer.indexOf('generic') != -1) {
					Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume -33000', clientTo, function () {
					});
					answer = answer.split(':')[1];
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

					if(listedeezer.indexOf(objet.data[0]['id'])<0){
					Avatar.speak("C'est parti.", data.client, function () {
					});
					listedeezer.push(objet.data[0]['id'])
					}
					var numerodeezer=listedeezer[0]
					var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=tracks&id='+numerodeezer
		
					Avatar.runApp(urldeezer, clientTo);
					end(data.client, true);

					})
					return;
					}
					
					// Grammaire fixe
					switch(answer) {
					case "done":
					default:
						Avatar.speak("Terminé", data.client, function(){
							end(data.client, true);
					});
			}
	})
}

function deezerplaylist(data, client, clientFrom, clientTo) {
				Avatar.askme("Vous avez le choix entre ces playlist. Soirée, Sport ?", data.client,
				{
					"*": "generic",
                    "terminer": "done"
				},0, function (answer, end) {
					if (answer && answer.indexOf('generic') != -1) {
					Avatar.runApp('%CD%/nircmd/nircmdc64', 'changesysvolume -33000', clientTo, function () {
					});
					end(data.client);
					answer = answer.split(':')[1];

					if (answer.indexOf('soirée') != -1) {
						end(data.client);
						var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=5668253482';
						Avatar.runApp(urldeezer, clientTo);
						Avatar.speak("C'est parti.", data.client, function () {
						});
						end(data.client, true);
						return;
					}
			  
					if (answer.indexOf('sport') != -1) {
						end(data.client);
						var urldeezer='https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=2123808824';
						Avatar.runApp(urldeezer, clientTo);
						Avatar.speak("C'est parti.", data.client, function () {
						});
						end(data.client, true);
						return;
					}

					return Avatar.speak("Je suis désolé, je n'ai pas compris.", data.client, function(){
						deezerplaylist(data, client)
					});
				}

				// Grammaire fixe
				switch(answer) {
					case "done":
					default:
						Avatar.speak("Terminé", data.client, function(){
							end(data.client, true);
						});
				}
		})
}

function setClient (data) {

	var client = data.client;

	if (data.action.room)
		client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;

	if (data.action.setRoom)
		client = data.action.setRoom;

	return client;
}