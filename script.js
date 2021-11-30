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
  console.log(e.keyCode);
  if (e.keyCode == 32) {
    if (projetil.X == -1000) {
      console.log("xd");
      projetil.X = personagem.X;
      projetil.Y = personagem.Y;
      projetil.VX = 700;
      projetil.AX = 100;
    }
  }
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
  ACELERACAO: 400,
  cor: "white",
  X: 40,
  VX: 0,
  AX: 0,
  Y: canvas.height / 2 - 100,
  VY: 0,
  AY: 0,
  SX: 40,
  SY: 15,
  desenha: desenhaElemento,
  mover: moverElemento,
};
let projetil = {
  VELOCIDADE: 100,
  ACELERACAO: 0.5,
  cor: "blue",
  X: -1000,
  VX: 0,
  AX: 0,
  Y: canvas.height - 1000,
  VY: 0,
  AY: 0,
  SX: 40,
  SY: 5,
  desenha: desenhaElemento,
  controlar: function () {
    if (this.X > canvas.width + 60) {
      this.X = -1000;
      this.AX = 0;
      this.VX = 0;
    }
  },
  mover: moverElemento,
};
let mediaX = 0,
  mediaY = 0,
  nInimigos = 20;
const inimigos = [];
for (let i = 0; i < nInimigos; i++) {
  let xp = 10 * Math.random() * canvas.width + canvas.width;
  let yp = Math.random() * canvas.height;
  let inimigo = {
    VELOCIDADE: 100,
    ACELERACAO: 200,
    cor: "red",
    X: xp,
    VX: 0,
    AX: 0,
    Y: yp,
    VY: 0,
    AY: 0,
    SX: 20,
    SY: 20,
    desenha: desenhaElemento,
    mover: moverElemento,
    controlar: perseguir,
    evitarInimigos: evitar,
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
  ctx.fillRect(this.X, this.Y, this.SX, this.SY);
}
function perseguir(alvo) {
  this.AY = this.ACELERACAO * Math.sign(alvo.Y - this.Y) - 0.5 * this.VY;
  this.AX = -this.ACELERACAO; ///* Math.sign(alvo.X - this.X) - 0.5 * this.VX;
}
function fugir(alvo) {
  this.AY = -this.ACELERACAO * Math.sign(alvo.Y - this.Y) - 0.5 * this.VY;
  this.AX = -this.ACELERACAO * Math.sign(alvo.X - this.X) - 0.5 * this.VX;
}

function evitar() {
  inimigos.forEach((element) => {
    fugir(element);
  });
}
function colisao(A, B) {
  return !(
    A.X > B.X + B.SX ||
    A.X + A.SX < B.X ||
    A.Y > B.Y + B.SY ||
    A.Y + A.SY < B.Y
  );
}

let t0,
  dt,
  fps,
  pontos = 0;

requestAnimationFrame(loop);
function loop(t) {
  t0 = t0 ?? t;
  dt = (t - t0) / 1000;
  fps = 1 / dt;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  inimigos.forEach((element) => {
    mediaX = mediaX + element.X;
    mediaY = mediaY + element.Y;
  });
  inimigos.forEach((element) => {
    element.controlar(personagem);
    element.mover();
    element.evitarInimigos();
    element.desenha();

    /*
    if (element.X > canvas.width - 20) {
      element.VX *= -0.5;
    }
    if (element.X < 0) {
      element.VX *= -0.5;
    }
    if (element.Y > canvas.height - 20) {
      element.VY *= -0.5;
    }
    */
    if (element.X < 0) {
      element.VX = 0;
      element.X = canvas.width * 2;
    }
    if (colisao(projetil, element) && element != projetil) {

      projetil.X = -1000;
      projetil.VX = 0;
      projetil.AX = 0;

      element.AX = 0;
      element.VX = 100;
      element.X = canvas.width * 2;

      pontos++;
    }
    if (colisao(personagem, element) && element != personagem) {

      element.AX = 0;
      element.VX = 100;
      element.X = canvas.width * 2;

      pontos--
    }
  });
  mediaX = 0;
  mediaY = 0;
  //inimigo.controlar(personagem);
  //inimigo.mover();
  //inimigo.desenha();
  projetil.mover();
  projetil.desenha();
  projetil.controlar();

  if (personagem.X > canvas.width - 20) {
    personagem.VX *= -0.5;
  }
  if (personagem.X < 0) {
    personagem.VX *= -0.5;
  }
  if (personagem.Y > canvas.height - 20) {
    personagem.VY *= -0.5;
  }
  if (personagem.Y < 0) {
    personagem.VY *= -0.5;
  }
  personagem.mover();
  personagem.desenha();
  ctx.fillStyle = "yellow";
  ctx.font = "20px Impact";
  ctx.fillText(pontos, 40, 40);
  requestAnimationFrame(loop);

  t0 = t;
}
