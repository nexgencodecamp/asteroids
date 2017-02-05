var ship = Crafty.e("2D, DOM, ship")
	.attr({ x: 400 - 11, y: 300 - 7 })
	.bind("KeyDown", function(e){
		if(e.key == Crafty.keys.LEFT_ARROW) {
			this.direction = -1;
		} else if (e.key == Crafty.keys.RIGHT_ARROW) {
			this.direction = 1;
		}
	})
	.bind("KeyUp", function(e){
		if(e.key == Crafty.keys.LEFT_ARROW || e.key == Crafty.keys.RIGHT_ARROW) {
			this.direction = 0;
		}
	})
	.bind("EnterFrame", function() {
		if(this.direction === 1){
			this.rotation += 1;
		}
		else if(this.direction === -1) {
			this.rotation -= 1;
		}
	});

	ship.origin("center");
