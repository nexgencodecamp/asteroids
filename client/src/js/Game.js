function Game() {

	var _init = function() {
		console.log('Initialise Game...!');
		Crafty.paths({ audio: "../../sounds/", images: "../../img/" });
		Crafty.init(800, 600, document.getElementById('game'));
		Crafty.background('#000000');

		var assetsObj = {
	    "audio": {
	        "background": "sndBackground.wav",
	        "explosion": "sndExplosion.wav",
	        "explosionPlayer": "sndExplosionPlayer.wav",
					"shoot": "sndShoot.wav"
	    },
			"images": ["ship.png", "bullet.png", "asteroidSmall.png", "asteroidMedium.png", "asteroidLarge.png"]
		};

		Crafty.load(assetsObj, // preload assets
    	function() {
        Crafty.audio.play("background"); //Play the audio file
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

	return {
		init: _init
	};
}
