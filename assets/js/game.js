var inputUser=[];
var inputComp=[];
var regularMode=0;
var count1=0;
var count2=0;
var numR;
var sounds = {
  1: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  2: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  3: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  4: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

function reset(){ 
  $("#1, #2, #3, #4").off(); inputComp=[];inputUser=[];count1=0; count2=0; regularMode=0;
  location.reload(true);
}
function stop(){
  
   $('#1,#2,#3,#4').prop('disabled', true);
}//stop

function PlayandAnimate(arr,i) {
   
    if( i <= arr.length) {
      setTimeout(function() {
        sounds[arr[i]].play();
       
       $("#"+arr[i]).fadeTo('fast', 0.33).fadeTo('fast', 1);
       PlayandAnimate(arr, i + 1);
      }, 1500);
     
    }
 }//play


function ComputerMove(){
 

   numR=Math.floor((Math.random()*4)+1);
   var b = parseInt(numR);
   console.log("numR="+b);
 
   inputComp.push(b);
  
  if(count1==20){alert("you won!"); stop(); reset();}
 
  PlayandAnimate(inputComp,0);
 $("#steps").html(count1);
  count1++;
  
  GetPlayerMove();

 }//comp

function GetPlayerMove(){
 
 $("#1, #2, #3, #4").on("mousedown",function(){
   
    var val = ($(this).attr('value'));
    var a = parseInt(val);
    //inputUser.push(a);
    sounds[a].play();
     $("#"+a).fadeTo('fast', 0.33).fadeTo('fast', 1);
  

  if(a==inputComp[count2]){
       
   if(count2===inputComp.length-1){ 
     $("#1, #2, #3, #4").off("mousedown");
     count2=0;
     
     ComputerMove(); 
 
      }else { count2++;}
 
  }else{alert("mistake"); 
        if(regularMode==1){ alert("try again");
                           $("#1, #2, #3, #4").off("mousedown");
                           PlayandAnimate(inputComp,0);
                           count2=0;
                           GetPlayerMove();
                          }
        else{
        $("#1, #2, #3, #4").off("mousedown"); stop(); reset();
          count1=0;
          $("#steps").html(count1);
        count2=0;
        }
  }
     
});//JQ
 }//player


function newGame(){
  ComputerMove();
   
}
function regularM(){
  regularMode=1;
  newGame();
}

$(document).ready(function(){
  $("#start").click(newGame);
  $("#reset").click(reset);
  $("#regular").click(regularM);

  });

