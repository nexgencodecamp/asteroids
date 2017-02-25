Crafty.c("Ship", {
  // This function will be called when the component is added to an entity
  // So it sets up the things that both our entities had in common
  init: function() {
    var that=this;

    this.addComponent("ship, 2D, DOM, Collision, Motion");
    this.attr({ x: 400 - 11, y: 300 - 7 })
      .bind("KeyDown", function(e){
        if(e.key == Crafty.keys.LEFT_ARROW) {
          that.direction = -1;
        }
        else if (e.key === Crafty.keys.RIGHT_ARROW) {
          that.direction = 1;
        }
        else if(e.key === Crafty.keys.UP_ARROW) {
          that.thrust(1);
        }
        else if(e.key === Crafty.keys.DOWN_ARROW) {
          that.thrust(-1);
        }
        else if (e.key === Crafty.keys.SPACE) {
          that.shoot();
        }
      })
      .bind("KeyUp", function(e){
        if(e.key == Crafty.keys.LEFT_ARROW || e.key == Crafty.keys.RIGHT_ARROW) {
          that.direction = 0;
        }
      })
      .bind("EnterFrame", function() {
        if(that.direction === 1){
          that.rotation += 3;
        }
        else if(that.direction === -1) {
          that.rotation -= 3;
        }
        // Wrap ship if it goes offscreen
        if(that.x > 800) that.x = -22;
        if(that.x < -22) that.x = 800;
        if(that.y > 600) that.y = -22;
        if(that.y < -22) that.y = 600;
      });
    this.origin('center');
  },

  shoot: function() {
    // Create a bullet
    var xCenter = this.x+11;
    var yCenter = this.y+7.5;
    var bulletPos = Util.getPointOnCircle(xCenter, yCenter, 11, this.rotation);
    var xVector = bulletPos.x - xCenter;
    var yVector = bulletPos.y - yCenter;
    // Play sound
    Crafty.audio.play('shoot');
    var bullet = Crafty.e('Bullet');
    bullet.attr({x: bulletPos.x, y: bulletPos.y });
    bullet.vx = xVector * __BULLET_SPEED * 1.5;
    bullet.vy = yVector * __BULLET_SPEED * 1.5;
  },

  thrust: function(direction) {
    var xCenter = this.x+11;
    var yCenter = this.y+7.5;
    var shipVectorPoint = Util.getPointOnCircle(xCenter, yCenter, 11, this.rotation);
    var xVector = shipVectorPoint.x - xCenter;
    var yVector = shipVectorPoint.y - yCenter;
    Crafty.audio.play(direction === 1 ? "thrust" : "reverseThrust", 1, 1);
    this.vx = direction === 1 ? (this.vx + (xVector*2)) : (this.vx * 0.75);
    this.vy = direction === 1 ? (this.vy + (yVector*2)) : (this.vy * 0.75);
  },

  // This function will be called when the component is removed from an entity
  // or right before entity is destroyed.
  // Useful for doing custom cleanup.
  remove: function() {
      // This function serves for logging.
      // Once your game is release ready you can disable logging
      // by setting Crafty.loggingEnabled to false
      Crafty.log('Ship was removed!');
  },

  // Our two entities had different positions,
  // so we define a method for setting the position
  place: function(x, y) {
      this.x = x;
      this.y = y;

      // There's no magic to method chaining.
      // To allow it, we have to return the entity!
      return this;
  }
});
