Crafty.c("Bullet", {
  // This function will be called when the component is added to an entity
  // So it sets up the things that both our entities had in common
  init: function() {
    var that=this;

    this.addComponent("bullet, 2D, DOM, Collision, Motion");

    this.bind('EnterFrame', function(){
      if(this.x > 800 || this.x < 0 || this.y > 600 || this.y < 0){
        this.destroy();
        console.log('Bullet destroyed');
      }

    });

    this.onHit('Saucer', function(hitDatas) {
      console.log('Hit Saucer...');
      // Play particle explosion
      Crafty.e('2D, Canvas, Particles').particles(Util.getOptions(that));
      for (var i = 0, l = hitDatas.length; i < l; ++i) {
        var saucer = hitDatas[i].obj;

        // Update score, play a sound
        Crafty.trigger('updateScore', {size: 4});
        Crafty.audio.play('medium-explosion');
        Crafty.audio.pause('saucer');

        // Destroy objects
        saucer.destroy();
        this.destroy();
      }
    });

    this.onHit('Asteroid', function(hitDatas) {
      console.log('Hit Asteroid...');
      Crafty.e('2D, Canvas, Particles').particles(Util.getOptions(that));

      for (var i = 0, l = hitDatas.length; i < l; ++i) { // for each bullet hit
        var asteroidType;
        var asteroid = hitDatas[i].obj;
        console.log("Asteroid width: ", asteroid.w);

        // Create 2 new smaller asteroids
        if(asteroid.w === 48){
          asteroidType = 'asteroid-medium';
          Crafty.trigger('updateScore', {size: 1});
          Crafty.audio.play('large-explosion');
        }
        else if(asteroid.w === 32){
          asteroidType = 'asteroid-small';
          Crafty.trigger('updateScore', {size: 2});
          Crafty.audio.play('medium-explosion');
        }
        else if(asteroid.w === 16){
          Crafty.trigger('updateScore', {size: 3});
          Crafty.audio.play('small-explosion');
          asteroid.destroy(); // destroy the asteroid
          this.destroy(); // destroy the bullet
          // Check for end of level and trigger event if so
          // *** THIS IS DUPLICATE CODE - NEED TO REMOVE IT
          console.log("Num asteroids in play:", Crafty("Asteroid").length);
          if(Crafty("Asteroid").length === 0){
            // End of level
            console.log('**** COMPLETED LEVEL!!! ****');
            // Crafty.trigger('evt_endOfLevel');
          }
          return;
        }

        Crafty.e('Asteroid,'+asteroidType)
          .attr({x: asteroid.x-asteroid.w/2, y: asteroid.y-asteroid.h/2, w: asteroid.w === 48 ? 32 : 16, h: asteroid.w === 48 ? 32 : 16});
        Crafty.e('Asteroid,'+asteroidType)
          .attr({x: asteroid.x-asteroid.w/2, y: asteroid.y-asteroid.h/2, w: asteroid.w === 48 ? 32 : 16, h: asteroid.w === 48 ? 32 : 16});

        asteroid.destroy(); // destroy the asteroid
        this.destroy(); // destroy the bullet

        // Check for end of level and trigger event if so
        console.log("Num asteroids in play:", Crafty("Asteroid").length);
        if(Crafty("Asteroid").length === 0){
          // End of level
          console.log('**** COMPLETED LEVEL!!! ****');
          // Crafty.trigger('evt_endOfLevel');
        }
      }
    });
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
