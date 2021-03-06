// this need to be set according to each question content

currentScene = '7.1';

var text_dict = {
    questionId:"MFI Test",
    // questionText:"In the following, match the descriptions with the types of recoater blade by drag descriptions from the bottom list to the correct blade types.",
    blade1:"High speed steel",
    blade2:"Ceramic",
    blade3:"Brush",
    choiceAText:"It is used most of the time and usually works well.",
    choiceBText:"It is used when you build small thin walls or fine delicate parts.",
    choiceCText:"It is used when the powder is magnetic.",
    input_submitButtonLabel:"Submit"
};
// this need to be set according to each question success and buggy messages
var messages = {
  success_text:"Yes, you are correct!",
  buggy_text:"Sorry, but this answer is incorrect.",
  question_text:"Press Next to continue."
};

// this need to be set according to each question hint messages
hint = new Array(
  "Please recall each blade's use.",
  "HSS blade is used most of the time; Brush blade is for small thin walls or fine delicate parts; Ceramic blade is for magnetic powder",
  "HSS is used most of the time; Brush blade is for small thin walls or fine delicate parts; Ceramic blade is for magnetic powder");

var message_dict = {
    warning_skip:"Are you sure you want to skip this problem?",
    confirm_skip:"Are you sure you complete the problem?",
    confirm_done:"Do you want to complete the whole learning session and continue to the VR Tutorial?"
}

// set pages order
sav = new Array(
  "#instruction1",
  "#instruction2",
  "#instruction3",
  '#unity1',
  "#unity2",
  "#unity3",
  "#unity4",
  "#unity5",
  "#unity6",
  "#unity7",
  "#unity8",
  "#instruction4",
  "#instruction5"
  );

intro = new Array(
    "#introduction1",
    "#introduction2", 
    "#introduction3",
    "#introduction4",
    "#introduction5",
    "#introduction6",
    "#introduction7",
    "#introduction8",
    "#introduction9",
    "#introduction10",
    "#introduction11",
    "#introduction12",
    "#introduction13"
    );

currentURL = CTATConfiguration.get('run_problem_url');
  
$('.chapter').on("click", function() {
  id = $(this).attr("id");
  console.log(id);
  if (id in chapterToId){
    newURL = currentURL + "/" + chapterToId[id];
    parent.location.replace(newURL);
  } else{
    return;
  }
})

// $('#down').mousedown(function() {
//   gameInstance.SendMessage('JSManager', 'BuildPlateDown');
// });

// $('#down').mouseup(function() {
//   gameInstance.SendMessage('JSManager', 'BuildPlateStop');
// });

// $('#up').mousedown(function() {
//   gameInstance.SendMessage('JSManager', 'BuildPlateUp');
// });

// $('#up').mouseup(function() {
//   gameInstance.SendMessage('JSManager', 'BuildPlateStop');
// });


$('#left').mousedown(function() {
  gameInstance.SendMessage('JSManager', 'RecoaterLeft');
  
});

$('#left').mouseup(function() {
  gameInstance.SendMessage('JSManager', 'RecoaterStop');
});

$('#right').mousedown(function() {
  gameInstance.SendMessage('JSManager', 'RecoaterRight');
});

$('#right').mouseup(function() {
  gameInstance.SendMessage('JSManager', 'RecoaterStop');
});

// $('#confirm').on("click", function() {
//   var distance = $("#text").val();
//   CTATCommShell.commShell.gradeSAI("inputText", "enterNumber", distance);
//   console.log(distance);
// });


function loopLeft(trigger) {
  if (trigger == 1){
    if($("#recoater").position().left > -109){
      $('#recoater').animate ({
        left: '-=1.3',
      }, 50, 'linear', function() {
        loopLeft(1)
      });
    }
    else{
      console.log("stop");
      $('#recoater').stop();
    }
  }
  else{
    $('#recoater').stop();
    }
  }

$('#left').mousedown(function() {
  loopLeft(1);
}); 

$('#left').mouseup(function() {
  loopLeft(0);
}); 

function loopRight(trigger) {
  if (trigger == 1){
    if($("#recoater").position().left < 10){
      $('#recoater').animate ({
        left: '+=1.3',
      }, 50, 'linear', function() {
        loopRight(1)
      });
    }
    else{
      console.log("stop");
      $('#recoater').stop();
    }
  }
  else{
    $('#recoater').stop();
    }
  }

$('#right').mousedown(function() {
  loopRight(1);
}); 

$('#right').mouseup(function() {
  loopRight(0);
}); 

function loopDown(trigger) {
  if (trigger == 1){
      $('#plate2').animate ({
        top: '+=1',
      }, 200, 'linear', function() {
        loopDown(1)
      });
    }
    else{
      $('#plate2').stop();
    }
  }

$('#down').mousedown(function() {
  loopDown(1);
}); 

$('#down').mouseup(function() {
  loopDown(0);
}); 


function loopUp(trigger) {
  if (trigger == 1){
      $('#plate2').animate ({
        top: '-=1',
      }, 200, 'linear', function() {
        loopUp(1)
      });
    }
    else{
      $('#plate2').stop();
    }
  }

$('#up').mousedown(function() {
  loopUp(1);
}); 

$('#up').mouseup(function() {
  loopUp(0);
}); 

function loopCollectorDown(trigger) {
  if (trigger == 1){
      $('#plate1').animate ({
        top: '+=1',
      }, 200, 'linear', function() {
        loopCollectorDown(1)
      });
    }
    else{
      $('#plate1').stop();
    }
  }

$('#collectordown').mousedown(function() {
  loopCollectorDown(1);
}); 

$('#collectordown').mouseup(function() {
  loopCollectorDown(0);
}); 

function loopDispenserDown(trigger) {
  if (trigger == 1){
      $('#plate3').animate ({
        top: '+=1',
      }, 200, 'linear', function() {
        loopDispenserDown(1)
      });
    }
    else{
      $('#plate3').stop();
    }
  }

$('#dispenserdown').mousedown(function() {
  loopDispenserDown(1);
}); 

$('#dispenserdown').mouseup(function() {
  loopDispenserDown(0);
}); 
  // CTATCommShell.commShell.getLoggingLibrary().then(
  //   // success
  //   function () {
  //    parent.location.replace(newURL);
  //   },
  //   // error
  //   function() {
  //    alert("Cannot jump to the other chapter");
  //   }
  //  );

for(key in text_dict){
    $("#" + key).html(text_dict[key]);    
}

function processIncorrectMessageMountRecoater(answer){
  $("#hint_text").css("color","red");
  $('#hint_text').text(answer);
}

function loadComplete() {
    $("#hint_text").css("color","white");
    $('#hint_text').text("Press Next to continue.");
    console.log("Connected to Unity");
    setStep(currentScene);
    //gameInstance.SendMessage('JSManager', 'ToggleHint', 0);
    //$('#hint').show();
}

function setStep(stepId) {
    gameInstance.SendMessage('JSManager', 'SetStep', stepId);
}

function nextStep() {
    gameInstance.SendMessage('JSManager', 'NextStep');
}

let CheckAnswer = function(){
    result = $("#sortable2").children().attr("id") +":"+$("#sortable3").children().attr("id") +":"+$("#sortable4").children().attr("id");
    console.log(result)
    if( result != "undefined:undefined:undefined") {
        if(result.indexOf('undefined') > 0) {
            if(confirm(message_dict["confirm_skip"])) {
                CTATCommShell.commShell.gradeSAI("termAnswers", "UpdateCheckBox", result);
            } else {
                return;
            }  
        } else {
            CTATCommShell.commShell.gradeSAI("termAnswers", "UpdateCheckBox", result);
        }
    } 
}

$('#collectordown').mousedown(function() {
  gameInstance.SendMessage('JSManager', 'CollectorDown');
});

$('#collectordown').mouseup(function() {
  gameInstance.SendMessage('JSManager', 'CollectorStop');
});

$('#dispenserdown').mousedown(function() {
  gameInstance.SendMessage('JSManager', 'DispenserDown');
});

$('#dispenserdown').mouseup(function() {
  gameInstance.SendMessage('JSManager', 'DispenserStop');
});

function processUnity(){
  $('#unity').show();
  //CTATCommShell.commShell.gradeSAI("unity_recoater_blade", "grabOnItem", "HSS")
  console.log('load unity');
  //$('.webgl-content').append('<div id="gameContainer" style="width: 90%; height: 70%"></div>');
  gameInstance = UnityLoader.instantiate("gameContainer", "Assets/unity/Build/unity.json", {onProgress: UnityProgress});
  $("#hint_text").css("color","white");
  $('#hint_text').text(messages.question_text);
}

function reachLimit(type) {
  console.log("reachLimit type: " + type + " isComplete: " + isComplete);
  if (!isComplete) {
    isComplete = true;
    onCorrect();
    CTATCommShell.commShell.gradeSAI("UnityObject", "reachLimit", type);
  }
}

function spreadPowder(str){
  CTATCommShell.commShell.gradeSAI("UnityObject", "spreadPowder", str);
}

function onCorrect() {
  $('#next').attr("disabled", false);
  $('#hint_text').css('color', 'green');
  $('#hint_text').text(messages.success_text);
}

var dragOnItemRegistered = false;
var screwCount = 0;
var isComplete = false;
function dragOnItem(itemName) {
  console.log('dragOnItem: ' + itemName);
  assocRulesListener =
    {
      processCommShellEvent: function(evt, msg)
          {
              var events = ["AssociatedRules", "BuggyMessage"];
              if( events.indexOf(evt) == -1  || !msg)
              {
                  return;
              }
            window.assocrules = msg;
            var indicator = msg.getIndicator();
            console.log("this is the indicator" + indicator);
            var sai = msg.getSAI();
            var component = sai.getSelection();
            console.log(sai.getSelection() + ';' + sai.getAction() + ';' + sai.getInput() + ';' + indicator);
            if ("correct" == indicator.toLowerCase()) {
                //if (sav[i] != '#instruction10') {
                  isComplete = true;
                  onCorrect();
                //}
            } else {
                if (!isComplete)
                    $('#next').attr("disabled", true);
            }
            if("incorrect" == indicator.toLowerCase())
            {
                $("#hint_text").css("color","red");
                $('#hint_text').text("Sorry, you are incorrect. Please try another powder");
            }
    }
  };
  if (!dragOnItemRegistered) {
      dragOnItemRegistered = true;
      CTATCommShell.commShell.addGlobalEventListener(assocRulesListener);
  }
  CTATCommShell.commShell.gradeSAI("UnityObject", "dragOnItem", itemName);
}

function dragOut(name){
  console.log("dragOut name: " + name);
  CTATCommShell.commShell.gradeSAI("UnityObject", "dragOut", name);
}

// set id of the component
var i = 0;
$('#next').on("click", function() {
  if (sav[i] == '#instruction3') {
    processUnity();
  }
  if (intro[i] == '#introduction13') {
    console.log("this is the end")
    if(confirm(message_dict["confirm_done"])) {
      // CTATCommShell.commShell.processDoneContinue(7);
    } else {
        return;
    }
  }
  else{
    console.log("clicknext, sav[i] = " + sav[i]);
    if (sav[i] == '#instruction1' || sav[i] == '#instruction2' || sav[i] == '#instruction3' || sav[i] == '#instruction4')
      $(sav[i]).hide();
    if (sav[i] == '#unity8') {
      $('#unity1').remove();
    }
    $(intro[i]).hide();
    i += 1;
    if (sav[i] == '#instruction2' || sav[i] == '#instruction3' || sav[i] == '#unity1' || sav[i] == '#instruction4' || sav[i] == '#instruction5')
      $(sav[i]).show();
    $(intro[i]).show();
    $('#hint_text').text(messages.question_text);
    $("#hint_text").css("color","white");
    if (sav[i] != '#instruction2' && sav[i] != '#instruction3' && intro[i] != '#introduction12' && intro[i] != '#introduction13') {
      $('#next').attr("disabled", true);
      nextStep();
    }
    isComplete = false;
  }
 });

function processIncorrectMessage(answer){
  $("#hint_text").css("color","red");
  if (answer =="Sorry, but this answer is incorrect. The item Indicator is not PPE in EOS"){
    $("#checkB").css("color","red");
  }
  else{
    $("#checkB").css("color","white");
  }
  $('#hint_text').text(answer);
}

var cnt_hint = 0;
$('#hint').on("click",function(){
  if (sav[i] == '#question1') {
    console.log(assocrules.getIndicator())
    $("#hint_text").css("color","white");
    CTATCommShell.commShell.processComponentAction(new CTATSAI("hint", "ButtonPressed", -1));
    console.log(cnt_hint);
      $('#hint_text').text(hint[2]);
  }
  else {
    gameInstance.SendMessage('JSManager', 'ToggleHint', 1);
  }
})

//set component
var cnt_buggy =0;
$(document).on("ready",function () {
  $("#hint_text").css("color","white");
  $('#hint_text').text("Press Next to continue"); 
  console.log("pucca")
  let OnIncorrect = function(stu_input){
    console.log(stu_input);
  }
  assocRulesListener =
      {
        processCommShellEvent: function(evt, msg)
          {
            var events = ["AssociatedRules", "BuggyMessage"];
            if( events.indexOf(evt) == -1  || !msg)
            {
                return;
            }
            if("BuggyMessage" == evt)
              {
                console.log("this is the wrong answer");
                cnt_buggy += 1;
                if (cnt_buggy >3){
                  cnt_buggy += 0;
                  processIncorrectMessage(msg.getBuggyMsg())
                } else{
                processIncorrectMessage(msg.getBuggyMsg())}
              }
              window.assocrules = msg;
              var indicator = msg.getIndicator();
              var sai = msg.getSAI();                               // selection-action-input from tutor engine
              var selection = (sai ? sai.getSelection() : "_noSuchComponent_");
              // var comps = CTATShellTools.findComponent(selection);  // array of components with this name
              // var component = (comps && comps.length ? comps[0] : null); // ?? it returns null 
              var component = sai.getSelection();
              console.log(component);
              console.log(indicator);
              if(component =="termAnswers"&& "correct" == indicator.toLowerCase())
              {
                $("#hint_text").css("color","green");
                $('#hint_text').text("Yes, you are correct. Please press next to continue.");
                // $('#hint_text').text(messages["success_text"]); 
                $('#next').text("Next");
                $('#hint').hide();
                i += 1;
              }
              if(component =="termAnswers"&& "incorrect" == indicator.toLowerCase())
              {
                $("#hint_text").css("color","red");
                $('#hint_text').text("Sorry, you are incorrect. Please try other solution.");
              }
      }
    };
    CTATCommShell.commShell.addGlobalEventListener(assocRulesListener);
});



