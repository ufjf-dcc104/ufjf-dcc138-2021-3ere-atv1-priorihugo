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
window.addEventListener('keydown' , teclaPressionada , false);
window.addEventListener('keyup' , teclaSolta , false);
function teclaPressionada(e){
    e.preventDefault();
    //console.log(e.keyCode);
    if(e.keyCode == 37) personagem.AX = -personagem.ACELERACAO;
    if(e.keyCode == 38) personagem.AY = -personagem.ACELERACAO;
    if(e.keyCode == 39) personagem.AX = personagem.ACELERACAO;
    if(e.keyCode == 40) personagem.AY = personagem.ACELERACAO;
}
function teclaSolta(e){
    e.preventDefault();
    //console.log(e.keyCode);
    if(e.keyCode == 37) personagem.AX = 0;
    if(e.keyCode == 38) personagem.AY = 0;
    if(e.keyCode == 39) personagem.AX = 0;
    if(e.keyCode == 40) personagem.AY = 0;
}

//canvas config
const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d')
let vw = (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * 0.9) // 90% da tela
let vh = (Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) *0.9) // 90% da tela
canvas.width = vw;
canvas.height = vh;


//estado do quadradinho
let personagem = {
 VELOCIDADE: 100,
 ACELERACAO: 40,
 X: (canvas.width/2) - 10,
 VX: 0,
 AX: 0,
 Y: (canvas.height/2) - 100,
 VY: 0,
 AY: 0,
};

let inimigo = {
    VELOCIDADE: 100,
    ACELERACAO: 40,
    X: (canvas.width/2) + 40,
    VX: 0,
    AX: 0,
    Y: (canvas.height/2) + 100,
    VY: 0,
    AY: 0,
   };
let t0,dt,fps;

requestAnimationFrame(loop);
function loop(t){

    t0 = t0 ?? t;
    dt = (t - t0)/1000;
    fps = (1/(dt))

    //movimento
    if (personagem.X > canvas.width + 20) personagem.x = 0;
    if (personagem.X < 0) personagem.X = canvas.width;
    if (personagem.Y > canvas.height + 20) personagem.Y = 0;
    if (personagem.Y < 0) personagem.Y = canvas.height;

    inimigo.AY = (personagem.Y - inimigo.Y)
    inimigo.AX = (personagem.X - inimigo.X)


    personagem.VX = personagem.VX + personagem.AX*dt;
    personagem.VY = personagem.VY + personagem.AY*dt;
    personagem.X = personagem.X + personagem.VX*dt;
    personagem.Y = personagem.Y + personagem.VY*dt;

    inimigo.VX = inimigo.VX + inimigo.AX*dt;
    inimigo.VY = inimigo.VY + inimigo.AY*dt;
    inimigo.X = inimigo.X + inimigo.VX*dt;
    inimigo.Y = inimigo.Y + inimigo.VY*dt;
    //fundo
    ctx.fillStyle = 'black'
    ctx.fillRect(0 , 0 , canvas.width , canvas.height)

    //quadradinho
    ctx.fillStyle = 'red'
    ctx.fillRect(inimigo.X,inimigo.Y, 20 , 20 )
    requestAnimationFrame(loop);
    ctx.fillStyle = 'white'
    ctx.fillRect(personagem.X,personagem.Y, 20 , 20 )
    t0 = t;
}