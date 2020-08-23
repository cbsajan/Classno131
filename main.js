img = "";
status = "";
object = [];


function preload() {

    img = loadImage("dog_cat.jpg")
}

function setup() {

    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modeloaded)
    document.getElementById("status").innerHTML = "Status = Detecting Object";
}

function modeloaded() {
    console.log("Model Loaded !! " + status);
    status = true;


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
    image(video, 0, 0, 380, 380);
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
    console.log(object)
    if (status != "") {
        console.log(status);
        objectDetector.detect(video, Gotresults)

        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < object.length; i++) {


            document.getElementById("status").innerHTML = "Status = Object Detected";
            document.getElementById("number_of_object").innerHTML = "Number Of Object Detected Are : " + object.length;

            fill(r, g, b);
            value = floor(object[i].confidence * 100);
            text(object[i].label + " " + value + "%", object[i].x, object[i].y);
            noFill();
            stroke(r, g, b)
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
        }
    }

}