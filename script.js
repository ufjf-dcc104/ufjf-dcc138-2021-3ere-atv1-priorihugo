/*
window.addEventListener('resize', meuResize , false)

function meuResize(){
    vw = (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * 0.9) // 90% da tela
    vh = (Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) *0.9) // 90% da tela
    canvas.width = vw;
    canvas.height = vh; 
}
*/
///FIZ A BESTEIRA DE APAGAR TODAS AS MINHAS PASTAS DE EXERCICIO
///DEI UM FETCH NO REPOSITORIO E VOU COMEÇAR TUDO DE NOVO
window.addEventListener("keydown", teclaPressionada, false);
window.addEventListener("keyup", teclaSolta, false);
function teclaPressionada(e) {
  e.preventDefault();
  //console.log(e.keyCode);
  if (e.keyCode == 37) personagem.AX = -personagem.ACELERACAO;
  if (e.keyCode == 38) personagem.AY = -personagem.ACELERACAO;
  if (e.keyCode == 39) personagem.AX = personagem.ACELERACAO;
  if (e.keyCode == 40) personagem.AY = personagem.ACELERACAO;
}
function teclaSolta(e) {
  e.preventDefault();
  //console.log(e.keyCode);
  if (e.keyCode == 37) personagem.AX = 0;
  if (e.keyCode == 38) personagem.AY = 0;
  if (e.keyCode == 39) personagem.AX = 0;
  if (e.keyCode == 40) personagem.AY = 0;
}

//canvas config
const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");
let vw =
  Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) *
  0.9; // 90% da tela
let vh =
  Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  ) * 0.9; // 90% da tela
canvas.width = vw;
canvas.height = vh;

let personagem = {
  VELOCIDADE: 100,
  ACELERACAO: 200,
  cor: "white",
  X: canvas.width / 2 - 10,
  VX: 0,
  AX: 0,
  Y: canvas.height / 2 - 100,
  VY: 0,
  AY: 0,
  desenha: desenhaElemento,
  mover: moverElemento,
};
let inimigo = {
  VELOCIDADE: 100,
  ACELERACAO: 0.5,
  cor: "red",
  X: canvas.width / 2 + 40,
  VX: 0,
  AX: 0,
  Y: canvas.height / 2 + 100,
  VY: 0,
  AY: 0,
  desenha: desenhaElemento,
  mover: moverElemento,
  controlar: fugir,
};
let mediaX = 0 , mediaY = 0 , nInimigos = 20;
const inimigos = [];
for (let i = 0; i < nInimigos; i++) {
  let xp = Math.random() * canvas.width;
  let yp = Math.random() * canvas.height;
  let inimigo = {
    VELOCIDADE: 100,
    ACELERACAO: 0.2,
    cor: "red",
    X: xp,
    VX: 0,
    AX: 0,
    Y: yp,
    VY: 0,
    AY: 0,
    desenha: desenhaElemento,
    mover: moverElemento,
    controlar: perseguir,
    fugir : fugir,
  };
  inimigos.push(inimigo);
}
function moverElemento() {
  this.VX = this.VX + this.AX * dt;
  this.VY = this.VY + this.AY * dt;
  this.X = this.X + this.VX * dt;
  this.Y = this.Y + this.VY * dt;
}
function desenhaElemento() {
  ctx.fillStyle = this.cor;
  ctx.fillRect(this.X, this.Y, 20, 20);
}
function perseguir(alvo) {
  this.AY = this.ACELERACAO * (alvo.Y - this.Y) - 0.5*this.VY;
  this.AX = this.ACELERACAO * (alvo.X - this.X) - 0.5*this.VX;
}
function fugir(alvo) {
  this.AY = -this.ACELERACAO * (alvo.Y - this.Y ) - 0.5*this.VY;
  this.AX = -this.ACELERACAO * (alvo.X - this.X ) - 0.5*this.VX;
}
/*
function evitar() {
  inimigos.forEach((element) => {
    fugir(element);
  });
}
*/
let t0, dt, fps;

requestAnimationFrame(loop);
function loop(t) {
  t0 = t0 ?? t;
  dt = (t - t0) / 1000;
  fps = 1 / dt;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
    inimigos.forEach((element)=>{
        mediaX = mediaX + element.X;
        mediaY = mediaY + element.Y;
    })
  inimigos.forEach((element) => {
    element.controlar(personagem);
    element.mover();
    //element.evitarInimigos();
    element.desenha();

    if (element.X > canvas.width - 20) {
      element.X = 0;
    }
    if (element.X < 0) {
      element.X = canvas.width;
    }
    if (element.Y > canvas.height - 20) {
      element.Y = 0;
    }
    if (element.Y < 0) {
      element.Y = canvas.height;
    }
  });
  mediaX = 0;
  mediaY = 0;
  //inimigo.controlar(personagem);
  //inimigo.mover();
  //inimigo.desenha();

  personagem.mover();
  personagem.desenha();
  requestAnimationFrame(loop);

  t0 = t;
}
