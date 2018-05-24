Crafty.c("Saucer", {
  // This function will be called when the component is added to an entity
  // So it sets up the things that both our entities had in common
  init: function() {
    var that=this;

    this.addComponent("saucer, 2D, DOM, Collision, Motion");
    this.bind("EnterFrame", function() {
      // Wrap ship if it goes offscreen
      if(that.x > 820 || that.x < -20) {
        that.destroy();
        Crafty.audio.pause('saucer');
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
      Crafty.log('Saucer was removed!');
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
