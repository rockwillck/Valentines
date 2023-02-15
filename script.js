function circle(x, y, radius, ) {

}

var img
textCanvas = document.createElement("canvas")
text = textCanvas.getContext("2d")
textImage = new Image()
textImage.src = "thing.png"
textImage.onload = () => {
    textCanvas.width = textImage.width
    textCanvas.height = textImage.height
    text.drawImage(textImage, 0, 0)
    img = Array.from(text.getImageData(0, 0, textImage.width, textImage.height).data)

    for (i=img.length/4-1;i>0;i--) {
        if (img[4*i] != 255) {
            coords = [(i - Math.floor(i/textCanvas.width)*textCanvas.width)*5 - 75, Math.floor(i/textCanvas.width)*5 + 300]
            thingies.push(coords)
        }
    }
}

var stuff = []
var claimed = []
var thingies = []
function animate() {
    requestAnimationFrame(animate)

    ctx.globalAlpha = 1
    ctx.fillStyle = "pink"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    stuff.push([Math.random()*canvas.width, Math.random()*canvas.height, (0.5 - Math.random())*5, (0.5 - Math.random())*5, 0])

    stuff.forEach((thing, index) => {
        ctx.beginPath()
        ctx.arc(thing[0], thing[1], 5, 0, 2*Math.PI)
        ctx.closePath()
        ctx.globalAlpha = thing[4]
        ctx.fillStyle = `red`
        ctx.fill()
        thing[4] += 0.01
        if (Math.sqrt((canvas.width/2 - thing[0])**2 + (canvas.height/2 - thing[1])**2) > canvas.width/2) {
            stuff.splice(index, 1)
        } else {
            thingies.forEach((coords) => {
                if (Math.sqrt((thing[0] - coords[0])**2 + (thing[1] - coords[1])**2) < 5) {
                    thing[2] = 0
                    thing[3] = 0
                }
            })
        }
        thing[1] += thing[3]
        thing[0] += thing[2]
    })

    
}

var done = false
function hi() {
    if (!done) {
        animate()
    }
    done = true
}