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

//estado do quadradinho
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
  ACELERACAO: 100,
  cor: "red",
  X: canvas.width / 2 + 40,
  VX: 0,
  AX: 0,
  Y: canvas.height / 2 + 100,
  VY: 0,
  AY: 0,
  desenha: desenhaElemento,
  mover: moverElemento,
  controlar: controlaElemento,
};
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
function controlaElemento(alvo) {
  this.AY = alvo.Y - this.Y - this.VY;
  this.AX = alvo.X - this.X - this.VX;
}
let t0, dt, fps;

requestAnimationFrame(loop);
function loop(t) {
  t0 = t0 ?? t;
  dt = (t - t0) / 1000;
  fps = 1 / dt;

  //movimento
  if (personagem.X > canvas.width - 20) personagem.VX = 0;
  if (personagem.X < 0) personagem.VX = 0;
  if (personagem.Y > canvas.height - 20) personagem.VY = 0;
  if (personagem.Y < 0) personagem.VY = 0;

  if (inimigo.X > canvas.width - 20) inimigo.VX = 0;
  if (inimigo.X < 0) inimigo.VX = 0;
  if (inimigo.Y > canvas.height - 20) inimigo.VY = 0;
  if (inimigo.Y < 0) inimigo.VY = 0;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  personagem.mover();
  inimigo.controlar(personagem);
  inimigo.mover();

  inimigo.desenha();
  personagem.desenha();
  requestAnimationFrame(loop);

  t0 = t;
}
