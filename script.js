//canvas config
const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d')
const vw = (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * 0.9) // 90% da tela
const vh = (Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) *0.9) // 90% da tela
canvas.width = vw;
canvas.height = vh;

