var particle = {
    position: null,
    velocity: null,
    gravity: null,
    mass: 1,
    radius: 10,
    moveVector: null,
    
    
    create: function(x, y, speed, direction, grav) {
        var obj = Object.create(this);
        obj.position = vector.create(x, y);
        obj.velocity = vector.create(0, 0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.gravity = vector.create(0, grav || 0);
        obj.moveVector = vector.create(0, 0);
        return obj;
    },
    
    accelerate: function(accel) {
        this.velocity.addTo(accel);
    },
        
  
    update: function() {
        this.velocity.addTo(this.gravity);
        this.position.addTo(this.velocity);
    },
        
    angleTo: function(p2) {
        return this.position.subtract(p2.position).getAngle();
        
    },
    
    distanceTo: function(p2) {
        return this.position.subtract(p2.position).getLength();
    },
    
    gravitateTo: function(p2) {
        var gravAccel = p2.position.subtract(this.position).setLength(p2.mass/ (this.distanceTo(p2) * this.distanceTo(p2)));
        this.velocity.addTo(gravAccel);
    },
    
    moveTo: function(v2, speed) {
        if(v2.subtract(this.position).getLength() > speed) {
            this.velocity = v2.subtract(this.position);
            this.velocity.setLength(speed);
            this.update();
        }
        else {
            this.position.setX(v2.getX());
            this.position.setY(v2.getY());
            this.velocity = 0;
        }   
    }
    
    
    
        
        
};