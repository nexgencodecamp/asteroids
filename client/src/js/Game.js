function Game() {

	var _scoreP1 = 0;
	var _scoreP2 = 0;
	var _highScore = 0;

	var _init = function() {
		console.log('Initialise Game...!');
		Crafty.paths({ audio: "../../sounds/", images: "../../img/" });
		Crafty.init(800, 600, document.getElementById('game'));
		Crafty.background('#FF6633');

		Crafty.defineScene("main",
			function() {
				document.getElementsByClassName('loader')[0].innerHTML = "";
    		Crafty.background("#000");

				// Create text
				Crafty.e("2D, DOM, Text")
					.attr({ x: 250, y: 400, w: 300 })
					.text("1 COIN 1 PLAY")
					.textColor("#FFFFFF")
					.textFont({ size: '36px', family: 'Hyperspace' });

			}
		);

		var assetsObj = {
	    "audio": {
	        "background": "sndBackground.wav",
	        "explosion": "sndExplosion.wav",
	        "explosionPlayer": "sndExplosionPlayer.wav",
					"shoot": "sndShoot.wav"
	    },
			"sprites": {
				"ship.png": {
					"tile": 22,
					"tileh": 15,
					"map": { "ship": [0,0] }
				}
			},
			"images": ["bullet.png", "asteroidSmall.png", "asteroidMedium.png", "asteroidLarge.png"]
		};

		Crafty.load(assetsObj, // preload assets
    	function() {
				Crafty.e("Delay").delay(function(){
					Crafty.scene("main");
	        //Crafty.audio.play("background"); //Play the audio file

				}, 1500);
    	},
	    function(o) { //progress
				console.log(o);
				document.getElementsByClassName('loaderPercent')[0].innerHTML = parseInt(o.percent, 10);
			},
	    function(e) { //uh oh, error loading
				console.log(e);
			}
		);
	};

	var _getScore = function(sc) {
		if(sc === "P1"){
			return _scoreP1;
		}
		else if(sc === "P2"){
			return _scoreP2;
		}
		else if(sc === "H"){
			return _highScore;
		}
	};

	var _setScore = function(sc, delta){
		if(sc === "P1"){
			_scoreP1 += delta;
		}
		else if(sc === "P2"){
			_scoreP2 += delta;
		}
		else if(sc === "H"){
			_highScore += delta;
		}
	};

	return {
		init: _init,
		getScore: _getScore,
		setScore: _setScore
	};
}
