//canvas config
const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d')
const vw = (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * 0.9) // 90% da tela
const vh = (Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) *0.9) // 90% da tela
canvas.width = vw;
canvas.height = vh;

let quadradoX = 100;
let quadradoY = 100;

function loop(){
    //fundo
    ctx.fillStyle = 'black'
    ctx.fillRect(0 , 0 , canvas.width , canvas.height)

    //quadradinho
    ctx.fillStyle = 'white'
    ctx.fillRect(quadradoX , quadradoY , 20, 20)

    requestAnimationFrame(loop)
}
loop();