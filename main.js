window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height= window.innerHeight,
        halkaCenter = vector.create(width/2, width/2),
        numCemaat = 10,
        radius = (width*Math.PI/66) * 0.9 - 5,
        ihvan = [],
        ihvanOut = [],
        counterLabel = document.getElementById("counterLabel"),
        hesapLabel = document.getElementById("hesapLabel");

    for(var i = 0; i < numCemaat; i++) {
        ihvan.push(particle.create(0, 0, 0, 0, 0));
    }
    
    document.body.addEventListener("keydown", function(event) {
        var randomIndex = Math.floor(Math.random() * (numCemaat - 1) + 1);
        
        if(event.keyCode == 38 && numCemaat < 33) {     //UP
            numCemaat++;
            counterLabel.innerHTML = numCemaat;
            hesapLabel.innerHTML = hatimHesap(numCemaat);
            if(ihvanOut.length > 0) {
                ihvan.splice(randomIndex, 0, ihvanOut.pop());
            }
            else    { 
                ihvan.splice(randomIndex, 0, particle.create(0, 0, 0, 0, 0));
            }
        }
        
        if(event.keyCode == 40 && numCemaat > 1) {      //DOWN
            ihvan[randomIndex].velocity = vector.create(15, 0).setAngle(Math.random() * 2 * Math.PI);
            ihvanOut.push(ihvan.splice(randomIndex, 1)[0]);
            numCemaat--;
            counterLabel.innerHTML = numCemaat;
            hesapLabel.innerHTML = hatimHesap(numCemaat);
        }
    });
    document.body.addEventListener("keyup",function(event) {
        
    });
        
    update();
    
    function update() {
        updateHalka();
        drawHalka();
        
        requestAnimationFrame(update);
    }
       
    
    function halkaRadius() {
        return radius * numCemaat / Math.PI * 1.1 + 5;
    }
    
    function drawHalka() {
        context.clearRect(0, 0, width, height);
        for(var i = 0; i < numCemaat; i++) {
            context.beginPath()
            context.arc(ihvan[i].position.getX(), ihvan[i].position.getY(), radius, 0, Math.PI * 2);
            context.fill();
        }
        for(var i = 0; i < ihvanOut.length; i++) {
            context.beginPath()
            context.arc(ihvanOut[i].position.getX(), ihvanOut[i].position.getY(), radius, 0, Math.PI * 2);
            context.fill();
        }
    }
    
    function updateHalka() {
        var slice = Math.PI * 2 / numCemaat, 
            x = 0,
            y = 0;
        
        //animation halka tightening
        for(var i = 0; i < numCemaat; i++) {
            x = halkaCenter.getX() + halkaRadius() * Math.sin(slice * i);
            y = halkaCenter.getY() + halkaRadius() * Math.cos(slice * i);
            ihvan[i].moveTo(vector.create(x, y), 15);    //update is in the moveTo functions
        }
        

        //animation ihvan going out
        for(var k = 0; k < ihvanOut.length; k++) {
            ihvanOut[k].update();
            if(ihvanOut[k].position.getX() + radius < 0 || ihvanOut[k].position.getX() - radius > width 
              || ihvanOut[k].position.getY() + radius < 0 || ihvanOut[k].position.getY() - radius > height) {
                
                ihvanOut[k].velocity.setLength(0);
            }
        }   
    }
}

function hatimHesap(num){
    var mod = 100 % num;
    if(mod == 0){ return ("herkes " + 100/num)}
    var cem = num - mod; 
    if(cem <= mod){
        return (cem + " kisi " + Math.floor(100/num) + " digerleri " + (Math.floor(100/num)+1));
    }
    else{
        return (mod + " kisi " + (Math.floor(100/num)+1) + " digerleri " + Math.floor(100/num));
        
    }
    
}

