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
function teclaPressionada(e){
    e.preventDefault();
    console.log(e.keyCode);

}

//canvas config
const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d')
let vw = (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * 0.9) // 90% da tela
let vh = (Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) *0.9) // 90% da tela
canvas.width = vw;
canvas.height = vh;


//estado do quadradinho
let r = 13 // raio do movimento
let quadradoX = (canvas.width/2) - 10;
let quadradoY = (canvas.height/2) - 100;
let anguloX = 0;
let anguloY = 0;
let frequencia = 2;


let t0,dt,fps;

requestAnimationFrame(loop);
function loop(t){

    t0 = t0 ?? t;
    dt = (t - t0)/1000;
    fps = (1/(dt))

    //movimento
    if (quadradoX > canvas.width + 20) quadradoX = 0;
    if (quadradoX < 0) quadradoX = canvas.width;

    if (quadradoY > canvas.height + 20) quadradoY = 0;
    if (quadradoY < 0) quadradoY = canvas.height;

    //anguloX = (anguloX + Math.PI*dt)
    //anguloY = (anguloY + Math.PI*dt) 

    //quadradoX = quadradoX + (100*dt);
    quadradoX = quadradoX + (r*Math.cos(anguloX)) + 100*dt
    //quadradoY = quadradoY + (r*Math.sin(anguloY))

    //fundo
    ctx.fillStyle = 'black'
    ctx.fillRect(0 , 0 , canvas.width , canvas.height)

    //quadradinho
    ctx.fillStyle = 'white'
    ctx.fillRect(quadradoX,quadradoY,20 , 20 )
    requestAnimationFrame(loop);
    t0 = t;
}