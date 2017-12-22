

// pour exposer la position (x,y) creation d'une classe Coordonnee
class Coordonnee{
	constructor(x = 0, y =0){
		this.x = x;
		this.y = y;
	}
	
	get vitesseProgressive(){
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}
	
	set vitesseProgressive(leCoeff){
		const coeff = leCoeff / this.vitesseProgressive;
		this.x *= coeff;
		this.y *= coeff;
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

// Creation des joueurs

class Joueur extends Rectangle{
	constructor(){
		super(23,100);
		this.score = 0;
		
	}
}


class Game {
	constructor(canvas){
		this.canvas = canvas;
		this.context = canvas.getContext("2d"); // contexte en 2d
		
		this.balleGame = new Balle();
		console.log(this.balleGame); // balleGame est bien un objet heritant de rectangle
				
		this.joueurs = [new Joueur, new Joueur];
		this.joueurs[0].position.x = 40;
		this.joueurs[1].position.x = this.canvas.width-40;
		this.joueurs.forEach(joueur => {
			joueur.position.y = this.canvas.height/2;
		});
		
		let ancienPosition;

		const rappeler = (milliseconde) => {
			if(ancienPosition){
				this.animerBalle((milliseconde-ancienPosition)/1000)
			}
			ancienPosition = milliseconde;

			requestAnimationFrame(rappeler);
		};
		
		rappeler();
		

		
		// mettre balle milieu terrain la 1ere fois
		this.reset();
	}
	
	colisionPaddle_Balle(joueur, balle, soundRaquette){
		if(joueur.getGauche() < balle.getDroite() && joueur.getDroite() > balle.getGauche()
			&& joueur.getHaut() < balle.getBas() && joueur.getBas() > balle.getHaut()){
				balle.vitesse.x = -balle.vitesse.x;
				// Ici est géré la vitesse du jeu
				balle.vitesse.vitesseProgressive *= 1.1;
				soundRaquette.play();
			}
	}
	
	
	dessinerTerrain(){
		// bonne pratique: sauver au début le contexte 
		this.context.save();
		
		// mise en place du terrain de jeu
		this.context.fillStyle = couleurTerrain;
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		this.dessinerRectangle(this.balleGame);
		this.joueurs.forEach(joueur => this.dessinerRectangle(joueur));
		
		// on restaure le contexte à la fin
		this.context.restore();
	}
	
	dessinerScore(){
		// bonne pratique: sauver au début le contexte 
		this.context.save();
		
		this.context.font = "40px Arial";
		this.context.fillText(this.joueurs[0].score,206,40);
		this.context.fillText(this.joueurs[1].score,522,40);
		
		// on restaure le contexte à la fin
		this.context.restore();
	}
	
	dessinerRectangle(laBalle){
		// bonne pratique: sauver au début le contexte 
		this.context.save();
		
		// creation de la balle
		this.context.fillStyle = couleurRectangle;
		this.context.fillRect(laBalle.getGauche(),laBalle.getHaut(),laBalle.taille.x,laBalle.taille.y);
	
		// on restaure le contexte à la fin
		this.context.restore();
	}
	
	//fonction pour demarrer jeu
	// URGENT A FAIRE DIFFICULTE JEU BONUS POSSIBLE POUR INPUT
	demarrerGame(){
		this.balleGame.vitesse.x = 100*difficulte;
		this.balleGame.vitesse.y = 100*difficulte;
		
		//this.balleGame.vitesse.obtenirVitesseProgressive = 200;
	}
	

	
	// fonction apres score marque mettre balle au milieu et paddle
	reset(){
		// mettre la balle au millieu de terrain
		
		this.balleGame.position.x = (this.canvas.width/2);
		this.balleGame.position.y = (this.canvas.height/2);

		// vitesse de la balle 

		this.balleGame.vitesse.x = 0;
		this.balleGame.vitesse.y = 0;
	}
	
	
	// ANIMATION DE LA Balle
	// modifier la position de la balle en fonction du temps
	animerBalle(temps){
	this.balleGame.position.x += this.balleGame.vitesse.x * temps; // balle va a droite
	this.balleGame.position.y += this.balleGame.vitesse.y * temps; // balle va en bas
	

	
	// COLISION
	if(this.balleGame.getGauche() < 0 || this.balleGame.getDroite() > this.canvas.width){
		// on cible le joueur qui a marque 1 point
		const joueurCible = this.balleGame.vitesse.x < 0 | 0;
		// on lui rajoute 1 point
		this.joueurs[joueurCible].score++;
		
		soundGoal.play();
		// balle et paddle en position d'origine
		this.reset();
	}
	
	if(this.balleGame.getHaut() < 0 || this.balleGame.getBas() > this.canvas.height){
		this.balleGame.vitesse.y = -this.balleGame.vitesse.y;
	}
	
	
	// le joueur 2 est l'ordinateur, ici la raquette de l'ordi suit la balle
	this.joueurs[1].position.y = this.balleGame.position.y;
	
	this.joueurs.forEach(joueur => this.colisionPaddle_Balle(joueur,this.balleGame, soundRaquette));
	
	this.dessinerTerrain();
	this.dessinerScore();
	
}
}

const canvas  = document.getElementById("gameCanvas"); // acces au canvas
const leJeu = new Game(canvas);
const soundRaquette = new Audio("Pouloulou.mp3");
const soundGoal = new Audio("goalaso.mp3");
let difficulte = 3;
let couleurTerrain = '#33919E';
let couleurRectangle = '#e50000';

	function changerDifficulte(laDifficulte) {

    difficulte = laDifficulte;

	}
	
	function changeCouleurTerrain(laCouleurTerrain) {

    couleurTerrain = laCouleurTerrain;

	}
	
	function changeCouleurRectangle(laCouleurRectangles) {

    couleurRectangle = laCouleurRectangles;

	}

canvas.addEventListener('mousemove', event => {
	const scale = event.offsetY / event.target.getBoundingClientRect().height;
	leJeu.joueurs[0].position.y = canvas.height*scale;
});

canvas.addEventListener('click', event => {
	leJeu.demarrerGame();
});




