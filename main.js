song = "";
song1 = "";
leftWristX = 0;
 leftWristY = 0;
rightWristX = 0;
rightWristY = 0; 
scoreLeftWrist = 0;
function preload()
{
    song = loadSound("music.mp3");
    song1 = loadSound("music1.mp3")
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
      poseNet.on('pose', gotPoses);

      
}

function gotPoses(results){

       
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist = " +scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

        

    }
}

function modelLoaded(){
     
    console.log('poseNet is initailized');

}


function draw()
{
    image(video,0,0,600,500);
    fill(" #0000ff");
    stroke(" #0000ff");

    circle(rightWristX,rightWristY,20);

    if(rightWristY > 0 && rightWristY <= 100){

        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
        song1.rate(0.5);
    }
      else if(rightWristY > 100 && rightWristY <= 200){

        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
        song1.rate(1);
      }
    
      else if(rightWristY > 200 && rightWristY <= 300){

        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
        song1.rate(1.5);
      }

      else if(rightWristY > 200 && rightWristY <= 300){

        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
        song1.rate(2);
      }

      else if(rightWristY > 400 && rightWristY <= 500){

        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
        song1.rate(2.5);
      }

    if(scoreLeftWrist>0.2)
    {
         
        circle( leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor( InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "volume = "+volume;
        song.setVolume( volume );
        song1.setVolume( volume );
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function play1()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}

function stop()
{
    song.stop();
    song1.stop();
}
