img = "";
status = "";
object = [];


function preload() {

    img = loadImage("dog_cat.jpg")
}

function setup() {

    canvas = createCanvas(640, 440);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modeloaded)
    document.getElementById("status").innerHTML = "Status = Detecting Object"
}

function modeloaded() {
    console.log("Model Loaded !! " + status);
    status = true;
    objectDetector.detect(img, Gotresults)

}

function Gotresults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        object = results;
    }
}

function draw() {
    image(img, 0, 0, 640, 440);
    /* fill("#FF0000")
    text("Dog", 45, 75);
    noFill();
    stroke("#FF0000");
    rect(30, 60, 450, 350);


    fill("#FF0000")
    text("Cat", 294, 120);
    noFill();
    stroke("#FF0000");
    rect(290, 100, 250, 250); */

    if (status != "") {
        console.log(status);
        for (i = 0; i < object.length; i++) {

            document.getElementById("status").innerHTML = "Status = Object Detected"
            fill("#FF0000");
            value = floor(object[i].confidence * 100);
            text(object[i].label + " " + value + "%", object[i].x, object[i].y);
            noFill();
            stroke("#FF0000")
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
        }
    }

}