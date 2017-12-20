

// pour exposer la position (x,y) creation d'une classe vecteur
class Vecteur{
	constructor(x = 0, y =0){
		this.x = x;
		this.y = y;
	}
}

// on va créer plein de rectangle du coup on va créer une classe rectangle pour avoir une bonne structure

class Rectangle{
	constructor(largeur,hauteur){
		this.position = new Vecteur;
		this.taille = new Vecteur(largeur,hauteur);
	}
}
	
class Balle extends Rectangle{
	constructor(){
		super(20,20);
		this.vitesse = new Vecteur;
	}
	
}
	

const canvas  = document.getElementById("gameCanvas"); // acces au canvas
const context = canvas.getContext("2d"); // contexte en 2d

const balleGame = new Balle;
console.log(balleGame);

// mise en place du terrain de jeu
context.fillStyle = '#33919E';
context.fillRect(0,0,canvas.width,canvas.height);

// creation de la balle
context.fillStyle = '#e50000';
context.fillRect(canvas.width/2,canvas.height/2,20,20);