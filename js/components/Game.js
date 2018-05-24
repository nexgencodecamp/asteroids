function Game() {

	/* By definition, instance variables start with a double underscore __ */
	var __scoreP1 = 0;
	var __scoreP1_textObj;
	var __scoreP2 = 0;
	var __highScore = 0;
	var __gameStarted = false;
	var __gameNotStartedText;
	var __gamePaused = false;
	var __numLives = 3;
	var __counter = 1;
	var __saucer;

	var _init = function() {
		var that=this;
		console.log('Initialise Game...!');
		Crafty.paths({ audio: "sounds/", images: "img/" });
		Crafty.init(800, 600, document.getElementById('game'));

		/* Global KEY EVENTS */
		Crafty.bind('KeyDown', function(event) {
			if(event.keyCode === Crafty.keys['1']){
				__gameStarted = true;
				if(__gameNotStartedText){
					__gameNotStartedText.destroy();
				}
				// change scene
				Crafty.enterScene('game');
			}
			else if(event.keyCode === Crafty.keys.P){
				__gamePaused = !__gamePaused;
				Crafty.pause(__gamePaused);
			}
		});

		Crafty.defineScene("main",
			function() {
				document.getElementsByClassName('loader')[0].innerHTML = "";
    		Crafty.background("#000");

				Util.createText(
					{x:100,y:40},
					{w:65,h:20},
					Util.padNumber(__scoreP1, Math.max((__scoreP1+"").length, 2)),
					"#FFFFFF",
					"30px",
					"Hyperspace"
				); // P1
				Util.createText(
					{x:660,y:40},
					{w:65,h:20},
					Util.padNumber(__scoreP2, Math.max((__scoreP2+"").length, 2)),
					"#FFFFFF",
					"30px",
					"Hyperspace"
				); // P2
				Util.createText(
					{x:390,y:45},
					{w:65,h:20},
					Util.padNumber(__highScore, Math.max((__highScore+"").length, 2)),
					"#FFFFFF",
					"20px",
					"Hyperspace"
				); // HI-Score
				Util.createText({x:300,y:400}, {w:300,h:20}, "1 COIN 1 PLAY", "#FFFFFF", "30px", "Hyperspace"); // Coin
				Util.createText({x:335,y:460}, {w:300,h:20}, "&copy; 1979 Atari Inc", "#FFFFFF", "16px", "Hyperspace"); // Copytright

				// Create asteroids
				for(var i=0; i < __NUM_INIT_ASTEROIDS; i++){
					Crafty.e("Asteroid")
						.attr({x: Util.getRandomNumberBetween(0, 754), y: Util.getRandomNumberBetween(0, 554), w:48, h:48})
				}

				/* GLOBAL ENTER FRAME */
				Crafty.bind('EnterFrame', function() {
					if(__gameStarted === false){
						if(Crafty.frame() % 50 === 1){
							that.displayPushStartText();
						}
						if(Crafty.frame() % 50 === 25){
							if(__gameNotStartedText)
								__gameNotStartedText.destroy();
						}
						return;
					}
				});
			}
		);

		Crafty.defineScene("game",
			function() {
				console.log("Entering scene Game...");
				Util.createText({x:100,y:40}, {w:60,h:20}, Util.padNumber(__scoreP1, 2), "#FFFFFF", "30px", "Hyperspace"); // P1
				Util.createText({x:400,y:45}, {w:60,h:20}, Util.padNumber(__highScore, 2), "#FFFFFF", "20px", "Hyperspace"); // HI-Score
				Util.createText({x:335,y:460}, {w:300,h:20}, "&copy; 1979 Atari Inc", "#FFFFFF", "16px", "Hyperspace"); // Copytright

				// Show num lives left
				that.displayLives();

				// Show player 1
				Util.createText({x:350,y:120}, {w:120,h:20}, "PLAYER 1", "#FFFFFF", "24px", "Hyperspace"); // P1

				window.setTimeout(function(){
					Crafty.enterScene("play");
				}, 2000);
			}
		);

		Crafty.defineScene("play",
			function() {
				console.log("Entering scene Play...");
				__scoreP1_textObj = Util.createText(
					{x:100,y:40},
					{w:60,h:20},
					Util.padNumber(__scoreP1, Math.max((__scoreP1+"").length, 2)),
					"#FFFFFF",
					"30px",
					"Hyperspace"
				); // P1
				Util.createText(
					{x:400,y:45},
					{w:60,h:20},
					Util.padNumber(__highScore, Math.max((__highScore+"").length, 2)),
					"#FFFFFF",
					"20px",
					"Hyperspace"
				); // HI-Score
				Util.createText(
					{x:335,y:460},
					{w:300,h:20},
					"&copy; 1979 Atari Inc",
					"#FFFFFF",
					"16px",
					"Hyperspace"
				); // Copytright

				// Show num lives left
				that.displayLives();

				// Create asteroids
				for(var i=0; i < __NUM_INIT_ASTEROIDS; i++){
					Crafty.e("Asteroid, asteroid-large")
						.attr({x: Util.getRandomNumberBetween(0, 754), y: Util.getRandomNumberBetween(0, 554), w:48, h:48})
				}

				// Create Ship
				Crafty.e('Ship');

				// Play background sounds
				// execute doSomething each 100 miliseconds indefinetely
				var ent = Crafty.e("Delay").delay(that.playBackgroundSound, 1000, -1);

				// Bring on saucer after every 30 seconds
				var saucer = Crafty.e("Delay").delay(that.launchSaucer, 40000, -1);
			}
		);

		Crafty.bind('updateScore', function(data) {
			console.log("Update score:", data.size);
			if(data.size === 1){
				__scoreP1 += 20;
			}
			else if(data.size === 2){
				__scoreP1 += 50;
			}
			else if(data.size === 3){
				__scoreP1 += 100;
			}
			else if(data.size === 4){
				__scoreP1 += 1000; // Small saucer
			}
			if(__scoreP1_textObj){
				__scoreP1_textObj.destroy();
				__scoreP1_textObj = Util.createText({
					x:100,y:40},
					{w:60,h:20},
					Util.padNumber(__scoreP1, Math.max((__scoreP1+"").length, 2)),
					"#FFFFFF",
					"30px",
					"Hyperspace"
				); // P1
			}
		});

		Util.loadAssets(_gameAssets);
	};


	var _displayLives = function() {
		var lives = [];
		var xDelta = 0;
		for(var i=0; i < __numLives; i++) {
			lives.push(Crafty.e("2D, DOM, ship").attr({x: 75 + xDelta, y: 80}));
			xDelta += 17;
		}
		lives.map(function(ship, index){
			ship.origin("center");
			ship.rotation -= 90;
		});
	};

	var _displayPushStartText = function(txt) {
		__gameNotStartedText = Util.createText({x:280,y:100}, {w:300,h:20}, "PUSH 1 TO START", "#FFFFFF", "30px", "Hyperspace");
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

	var _playBackgroundSound = function() {
		Crafty.audio.play(++__counter % 2 === 0 ? 'background-1' : 'background-2', 1, 0.1);
	};

	var _launchSaucer = function() {
		// If the saucer object exists, destroy it.
		if(__saucer)
			__saucer.destroy();

		// Come in from the left or right
		var direction = Math.ceil(Math.random()*10);
		var changePoint = Util.getRandomNumberBetween(300, 500);

		__saucer = Crafty.e('Saucer, saucer-small')
			.attr({x: direction < 6 ? 820 : -20, y: Util.getRandomNumberBetween(50,550)});

		// Set the velocity of the flying saucer
		__saucer.vx = direction < 6 ? -150 : 150 ;
		__saucer.vy = 0;

		// Play the sound
		Crafty.audio.play('saucer', -1, 1);

		__saucer.bind('EnterFrame', function(){
			if(__saucer.x < -20 || __saucer.x > 820){
				Crafty.audio.mute('saucer');
			}

			// Change velocity at a random point
			if(direction < 6){
				if(__saucer.x <= changePoint){
					__saucer.vy = __saucer.vx / 2;
					changePoint = 1000000;
				}
			}
			else {
				if(__saucer.x >= changePoint){
					__saucer.vy = __saucer.vx / 2;
					changePoint = 1000000;
				}
			}
		});
	};

	return {
		init: _init,
		displayPushStartText: _displayPushStartText,
		displayLives: _displayLives,
		getScore: _getScore,
		setScore: _setScore,
		playBackgroundSound: _playBackgroundSound,
		launchSaucer: _launchSaucer
	};
}
