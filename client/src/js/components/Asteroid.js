Crafty.c("Asteroid", {
    // This function will be called when the component is added to an entity
    // So it sets up the things that both our entities had in common
    init: function() {
        var that=this;

        this.addComponent("asteroid, 2D, DOM, Collision, Motion, AngularMotion");
        this.bind('EnterFrame', function() {
          if(that.x > 850) that.x = -50;
          if(that.x < -50) that.x = 850;
          if(that.y > 650) that.y = -50;
          if(that.y < -50) that.y = 650;
        });

        var vel = this.velocity();
        vel.x = Util.getRandomNumberBetween(-160, 160);
        vel.y = Util.getRandomNumberBetween(-160, 160);
        this.vrotation += 10;
    },

    // This function will be called when the component is removed from an entity
    // or right before entity is destroyed.
    // Useful for doing custom cleanup.
    remove: function() {
        // This function serves for logging.
        // Once your game is release ready you can disable logging
        // by setting Crafty.loggingEnabled to false
        Crafty.log('Asteroid was removed!');
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
})
