status ="";
input= "";
objects =[];
name_enter = "";
 function setup(){
    canvas = createCanvas(640,480);
    canvas.center();

    video = createCapture(640,480)
    video.hide();

    speech = window.speechSynthesis;
 }

 function draw(){
   image(video,0 +15,0 +40,640,420);

   if(status != ""){
      console.log(objects);
      for(obj = 0;obj < objects.length;obj++){
         console.log(obj);
         percent = Math.floor(objects[obj].confidence *100);
          name = objects[obj].label;
          x = objects[obj].x;
          y = objects[obj].y;
          wid = objects[obj].width;
          high = objects[obj].height;
          fill('red');
          text(name + " " + percent + "%", x ,y);
          noFill();
          rect(x,y,wid,high);

          if(name == input){
            video.stop();
            object_detector.detect(gotResults);
            document.getElementById("name_object").innerHTML = name;
            document.getElementById("status").innerHTML = "Objects found";

            utterThis = new SpeechSynthesisUtterance("Object mentioned found");
            
            speech.speak(utterThis);

          }

      }
   }
 }

 function start(){
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Objects Detected";
input = document.getElementById("object_name").value;
console.log("button clicked");
 }

 function modelLoaded(){
   console.log("modelLoaded");
   status = true;
   object_detector.detect(video,gotResults);
   

 }

 function gotResults(error,results){
if (error){
   console.log(error);

}
else if (results){
   objects = results;
   console.log(results);

}
 }
