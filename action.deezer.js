'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _wtf_wikipedia = require('wtf_wikipedia');

var _wtf_wikipedia2 = _interopRequireDefault(_wtf_wikipedia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('underscore');

// Ignoré une fois dans TERM
var TERM = ['deezer', 'avec', 'lance'];
// Toujours ignoré dans NOTERM
var NOTERM = [];
// Non ignoré si un term est déjà pris, ex: la défintion de la revue du cinéma
var IGNORETERM = [];


exports.default = function (state) {

  return new Promise(function (resolve, reject) {
	
	var TAKEN = [];  
	for (var i in TERM) {
		TAKEN.push(0);
	}
	
	var sentence = '';
	var indexdeezer, pos, take;
	var terms = state.rawSentence.split(' ');
	terms.map(function (term, index) {
		
		if (!indexdeezer && term.toLowerCase() === 'deezer') indexdeezer = true;	
		
		if (indexdeezer) {
			take = false;
			pos = _.indexOf(TERM, term.toLowerCase());
			if (pos != -1) {
				if (TAKEN[pos] == 0) {
					if (sentence && sentence.length > 0 && _.indexOf(IGNORETERM, term.toLowerCase()) != -1) {
						take = true;
					} else {
						TAKEN[pos] = 1;
					}
				} else {
					if (_.indexOf(NOTERM, term.toLowerCase()) == -1)
						take = true;
				} 
			} else {
				take = true;
			}	
			if (take) {
				sentence += term;
				if (terms[index + 1]) sentence += ' ';
			} 
		}
	});
	
	// test si on a récupéré quelque chose
	if (sentence) {
		
		sentence = sentence.replace('l\'','');
		sentence = sentence.replace('é','e');
		sentence = sentence.replace('è','e');
		sentence = sentence.replace('ê','e');
		sentence = sentence.replace('ç','c');
		sentence = sentence.replace('ö','o');
		sentence = sentence.replace('à','a');
		sentence = sentence.replace(sentence[0], sentence[0].toUpperCase());
		
		// Affiche ce qui doit être recherché
		if (state.debug) info('Actiondeezer'.bold.yellow, 'sentence:'.bold, sentence);
		
		// recherche sur deezer
		_wtf_wikipedia2.default.from_api(sentence, 'fr', function (response) {
			var deezer = _wtf_wikipedia2.default.plaintext(response);
			// Filtre sur les caractères indésirables
			deezer = deezer.replace(/\[/g, "")
						.replace(/\]/g, "")
						.replace(/\{/g, "")
						.replace(/\}/g, "")
						.replace(/\' /g, " ")
						.replace(/\#/g, ". ")
						.replace(/\|/g, ". ");						
			
			// Envoi au plugin
			setTimeout(function(){	
				state.action = {
				  module: 'deezer',
				  command: 'deezer',
				  sentence: sentence,
				  info : deezer
				};
			
				resolve(state);
			}, 500);  
		});
		
    } else {
		setTimeout(function(){
			 // Envoi au plugin l'erreur
			state.action = {
				module: 'deezer',
				command: 'error',
				error: 'je suis désolé, je n\'ai pas compris ce qu\'il faut que je recherche'
			};
			resolve(state);
		}, 500);  
	}
  });
};