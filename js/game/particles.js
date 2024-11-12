//Particles Script
const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext('2d');
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

let particlesArray;

//get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas1.height / 80) * (canvas1.width / 80),
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

//Create particle
class Particle1 {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    //method to draw individual particle
    draw() {
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx1.fillStyle = '#fcfcfc7a';//`hsl(${Math.random() * 360}, 150%, 50%)`;COLOR OF PARTICLES 1
        ctx1.fill();
    }

    //check particle position, check mouse position, move the particle, draw the particle
    update1() {
        //check if particle is still winthin canvas
        if(this.x > canvas1.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y > canvas1.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        //check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        // let distance = Math.sqrt(dx*dx + dy*dy);

        // if(distance < mouse.radius + this.size) {
        //     if(mouse.x < this.x && this.x < canvas1.width - this.size * 10) {
        //         this.x += 10;
        //     }
        //     if(mouse.x > this.x && this.x > this.size * 10) {
        //         this.x -= 10;
        //     }
        //     if(mouse.y < this.y && this.y < canvas1.height - this.size * 10) {
        //         this.y += 10;
        //     }
        //     if(mouse.y > this.y && this.y > this.size * 10) {
        //         this.y -= 10;
        //     }
        // }
        

        //move particle
        this.x += this.directionX;
        this.y += this.directionY;

        //draw particle
        this.draw();
    }
}

//create particle array
function init1() {
    particlesArray = [];
    let numberOfParticles = Math.round(canvas1.width / 20);//(canvas1.height * canvas1.width) / 18000;//(canvas1.height * canvas1.width) / 12000;

    for (let i = 0; i < numberOfParticles; i++) { //INCREASE HERE THE NUMBER OF PARTICLES
        let size = Math.round(canvas1.width / 75);//(Math.random() * 5) + 5;//INCREASE PARTICLE SIZE
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 8) - 4;//Velocity X
        let directionY = (Math.random() * 8) - 4;//Velocity Y
        let color = '#fcfcfc7a';//`hsl(${Math.random() * 360}, 150%, 50%)`;COLOR OF PARTICLES 2

        particlesArray.push(new Particle1(x, y, directionX, directionY, size, color));
    }
}

//check if particles are close enough to draw line between them
function connect() {

let opacityValue = 1;

    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a;  b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if(distance < (canvas1.width / 7) * (canvas1.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx1.strokeStyle = 'rgba(255, 255, 255, 0.384' + opacityValue;//COLOR OF CONNECTIONS
                ctx1.lineWidth = 1.5;
                ctx1.beginPath();
                ctx1.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx1.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx1.stroke();
            }
        }
    }
}

//animation loop
function animate1() {
    requestAnimationFrame(animate1);
    ctx1.fillStyle = 'rgba(0, 0, 0, 0.4)';//Translucid background
    ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update1();
    }
    connect();//Connect the particles
}

//mouse out event
window.addEventListener('moouseout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

//resize event
window.addEventListener('resize',
    function() {
        canvas1.width = innerWidth;
        canvas1.height = innerHeight;
        init1(); 
    }
);

init1();
animate1();