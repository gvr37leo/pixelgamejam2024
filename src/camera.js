class Camera{
    pos
    offset
    width

}

function camera2world(camerapos){
    var scale = camera.width / screensize.x
    camerapos.scale(scale)
    camerapos.add(camera.pos).sub(offset)
    return camerapos
}

function world2camera(worldpos){
    var scale = camera.width / screensize.x
    var camerapos = worldpos.sub(camera.pos).add(offset).scale(scale)
    return camerapos
}

function drawImage(image,pos,size){
    var abspos = pos.c().sub()
    var scale = camera.width / screensize.x
    abspos.scale(scale)


    pos.scale()
    size.scale()

    ctx.drawImage(image,pos.x,pos.y,size.x,size.y)
    screensize.x

}