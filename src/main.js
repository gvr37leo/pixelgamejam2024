
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let images = {}
let files = {}
var screensize = new Vector(canvas.width,canvas.height)
var camera = new Camera({
    pos:new Vector(),
    offset:new Vector(),
    width:new Vector(),
})
//todo
// get some assets
// get tiled working
// 

Promise.all([loadImages(),loadJson()]).then(([data1,data2]) => {
    images = data1
    files = data2
    start()
    requestAnimationFrame(draw)
})




function start(){
    console.log(files)
    autoAdjustCanvasSize(canvas)
}

function draw(){
    ctx.drawImage(images['preview.png'],0,0)
    ctx.fillRect(10,10,10,10)
    requestAnimationFrame(draw)
}



