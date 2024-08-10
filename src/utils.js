let fsasync = require('fs/promises')
let fs = require('fs')

async function loadImages(){
    let res = {}
    let files = await fsasync.readdir('./images')

    for(var file of files){
        var image = new Image()
        image.src = `../images/${file}`
        res[file] = image
    }
    return res
}

async function loadJson(){
    let res = []
    let files = await fsasync.readdir('./json')
    for(var file of files){
        res.push(fsasync.readFile(`./json/${file}`, 'utf8'))
    }
    let textfiles = await Promise.all(res)
    let map = {}
    for(var i = 0; i < files.length;i++){
        let file = files[i]
        map[file] = JSON.parse(textfiles[i])
    }
    return map
}

function autoAdjustCanvasSize(canvas){
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas()
    window.addEventListener('resize',() => {
        resizeCanvas()
    })

}