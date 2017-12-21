

// pour exposer la position (x,y) creation d'une classe Coordonnee
class Coordonnee{
	constructor(x = 0, y =0){
		this.x = x;
		this.y = y;
	}
}

// on va créer plein de rectangle du coup on va créer une classe rectangle pour avoir une bonne structure

class Rectangle{
	constructor(largeur,hauteur){
		this.position = new Coordonnee;
		this.taille = new Coordonnee(largeur,hauteur);
	}
}
	
class Balle extends Rectangle{
	constructor(){
		super(20,20);
		this.vitesse = new Coordonnee;
	}
	
}
	

const canvas  = document.getElementById("gameCanvas"); // acces au canvas
const context = canvas.getContext("2d"); // contexte en 2d

const balleGame = new Balle;
console.log(balleGame); // balleGame est bien un objet heritant de rectangle

// mettre la balle au millieu de terrain

balleGame.position.x = (canvas.width/2);
balleGame.position.y = (canvas.height/2);

// vitesse de la balle 

balleGame.vitesse.x = 100;
balleGame.vitesse.y = 100;

let ancienPosition;

function rappeler(milliseconde){
	if(ancienPosition){
		animerBalle((milliseconde-ancienPosition)/1000)
	}
	ancienPosition = milliseconde;
	requestAnimationFrame(rappeler);
}


// ANIMATION DE LA Balle
// modifier la position de la balle en fonction du temps
function animerBalle(temps){
	balleGame.position.x += balleGame.vitesse.x * temps; // balle va a droite
	balleGame.position.y += balleGame.vitesse.y * temps; // balle va en bas
	
	// COLISION
	if(balleGame.position.x < 0 || balleGame.position.x > canvas.width){
		balleGame.vitesse.x = -balleGame.vitesse.x;
	}
	
	if(balleGame.position.y < 0 || balleGame.position.y > canvas.height){
		balleGame.vitesse.y = -balleGame.vitesse.y;
	}
	
	// mise en place du terrain de jeu
	context.fillStyle = '#33919E';
	context.fillRect(0,0,canvas.width,canvas.height);

	// creation de la balle
	context.fillStyle = '#e50000';
	context.fillRect(balleGame.position.x,balleGame.position.y,balleGame.taille.x,balleGame.taille.y);
	
}

rappeler();


