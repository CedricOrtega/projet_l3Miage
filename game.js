

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
	
	getGauche(){
		return this.position.x - this.taille.x / 2;
	}	

	getDroite(){
		return this.position.x + this.taille.x / 2;
	}	

	getHaut(){
		return this.position.y - this.taille.y / 2;
	}	

	getBas(){
		return this.position.y + this.taille.y / 2;
	}	
}
	
class Balle extends Rectangle{
	constructor(){
		super(20,20);
		this.vitesse = new Coordonnee;
	}
}

class Game {
	constructor(canvas){
		this.canvas = canvas;
		this.context = canvas.getContext("2d"); // contexte en 2d
		
		this.balleGame = new Balle();
		console.log(this.balleGame); // balleGame est bien un objet heritant de rectangle

		// mettre la balle au millieu de terrain

		this.balleGame.position.x = (this.canvas.width/2);
		this.balleGame.position.y = (this.canvas.height/2);

		// vitesse de la balle 

		this.balleGame.vitesse.x = 100;
		this.balleGame.vitesse.y = 100;
		
		let ancienPosition;

		const rappeler = (milliseconde) => {
			if(ancienPosition){
				this.animerBalle((milliseconde-ancienPosition)/1000)
			}
			ancienPosition = milliseconde;
			requestAnimationFrame(rappeler);
		};
		rappeler();
	}
	
	// ANIMATION DE LA Balle
	// modifier la position de la balle en fonction du temps
	animerBalle(temps){
	this.balleGame.position.x += this.balleGame.vitesse.x * temps; // balle va a droite
	this.balleGame.position.y += this.balleGame.vitesse.y * temps; // balle va en bas
	
	// COLISION
	if(this.balleGame.getGauche() < 0 || this.balleGame.getDroite() > this.canvas.width){
		this.balleGame.vitesse.x = -this.balleGame.vitesse.x;
	}
	
	if(this.balleGame.getHaut() < 0 || this.balleGame.getBas() > this.canvas.height){
		this.balleGame.vitesse.y = -this.balleGame.vitesse.y;
	}
	
	// mise en place du terrain de jeu
	this.context.fillStyle = '#33919E';
	this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

	// creation de la balle
	this.context.fillStyle = '#e50000';
	this.context.fillRect(this.balleGame.position.x,this.balleGame.position.y,this.balleGame.taille.x,this.balleGame.taille.y);
	
	}
	
}
	

const canvas  = document.getElementById("gameCanvas"); // acces au canvas
const leJeu = new Game(canvas);




