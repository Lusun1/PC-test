$('#unity').show();

var gameInstance = UnityLoader.instantiate("gameContainer", "Assets/unity/Build/unity.json", {onProgress: UnityProgress});
var currentScene = '6.1';

function loadComplete() {
    $("#hint_text").css("color","white");
    $('#hint_text').text("Press Next to continue.");
    console.log("Connected to Unity");
    setStep(currentScene);
    if (currentScene == '4.1') {
        $('#next').attr("disabled", false);
    } else {
        $('#next').attr("disabled", true);
    }
    //gameInstance.SendMessage('JSManager', 'ToggleHint', 0);
    //$('#hint').show();
}

function setStep(stepId) {
    gameInstance.SendMessage('JSManager', 'SetStep', stepId);
}

function nextStep() {
  isComplete = false;
    gameInstance.SendMessage('JSManager', 'NextStep');
}

function reachLimit(type) {
  if (!isComplete) {
    isComplete = true;
    onCorrect();
    CTATCommShell.commShell.gradeSAI("UnityObject", "reachLimit", type);
  }
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
            var sai = msg.getSAI();
            var component = sai.getSelection();
            console.log(sai.getSelection() + ';' + sai.getAction() + ';' + sai.getInput() + ';' + indicator);
            if ("correct" == indicator.toLowerCase()) {
                if (sav[i] == '#introduction2') {
                    console.log("screwCount++");
                    screwCount++;
                    if (screwCount == 4) {
                        isComplete = true; 
                        onCorrect();
                    }
                } else {
                    isComplete = true;
                    onCorrect();
                }
            } else {
                if (!isComplete)
                    $('#next').attr("disabled", true);
            }
            if("incorrect" == indicator.toLowerCase())
            {
                $("#hint_text").css("color","red");
                $('#hint_text').text("Sorry, you are incorrect. Please try another recoater blade.");
                // $('#hint_text').text(messages["success_text"]); 
                //processUnity();
            }
    }
  };
  if (!dragOnItemRegistered) {
      dragOnItemRegistered = true;
      CTATCommShell.commShell.addGlobalEventListener(assocRulesListener);
  }
  CTATCommShell.commShell.gradeSAI("UnityObject", "dragOnItem", itemName);
}

// this need to be set according to each question content
var text_dict = {
    questionId:"MFI Test",
    questionText:"Which of the following items is not belongs to EOS machine? Select all that apply.",
    checkA:"Process chamber",
    checkB:"Service Network",
    checkC:"Indicator",
    checkD:"Personal Protective Equipment"
};

// this need to be set according to each question success and buggy messages
var messages = {
  success_text:"Yes, you are correct!",
  buggy_text:"Sorry, but this answer is incorrect. Try it again.",
  question_text:"Press Next to continue.",
  confirm_done:"Do you want to complete the whole learning session and continue to the VR Tutorial?"
};

// set pages order
sav = new Array(
  "#introduction0",
  "#introduction2",
  "#introduction3",
  "#introduction4",
  "#introduction5",
  "#introduction6",
  "#introduction7",
  "#introduction8",
  "#introduction9",
  "#introduction10",
  "#introduction11"
  );

var chapterToId = {
  "PPE":1,
  "Safety":2,
  "EOS_Layout_Outside":3,
}

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

for(key in text_dict){
    $("#" + key).html(text_dict[key]);    
}

let CheckAnswer = function(){
    var input = []
    var answerText = ["A","B","C","D"]
    check1=$("input[name='checkGroup']")[0].checked;
    check2=$("input[name='checkGroup']")[1].checked;
    check3=$("input[name='checkGroup']")[2].checked;
    check4=$("input[name='checkGroup']")[3].checked;
    if(check1 || check2 || check3 || check4) {
      var response = '';
      for (i = 0; i < 4; i++) {
        if($("input[name='checkGroup']")[i].checked == true){
          response = response + answerText[i]   
        }
      }
      console.log(response);
      CTATCommShell.commShell.gradeSAI("checkGroup", "UpdateCheckBox", response);
      return response;
    }
    else {
        if(confirm(messages["warning_skip"])) {
            CTATCommShell.commShell.gradeSAI("termAnswers", "UpdateTextField", "Student skipped question.");
        } else {
            return;
        }
    }
}

$('#down').mousedown(function() {
  gameInstance.SendMessage('JSManager', 'BuildPlateDown');
});

$('#down').mouseup(function() {
  gameInstance.SendMessage('JSManager', 'BuildPlateStop');
});

$('#up').mousedown(function() {
  gameInstance.SendMessage('JSManager', 'BuildPlateUp');
});

$('#up').mouseup(function() {
  gameInstance.SendMessage('JSManager', 'BuildPlateStop');
});


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

// set id of the component
var i = 0;
$('#next').on("click", function() {
  if (sav[i] == '#introduction7') {
    if(confirm(message_dict["confirm_done"])) {
      CTATCommShell.commShell.processDoneContinue(7);
    } else {
        return;
    }
  }
  else {
    console.log(sav[i]);
    $(sav[i]).hide();
    i += 1;
    $(sav[i]).show();
    // CheckAnswer();
    console.log(222222222222222222)
    $('#hint_text').text(messages.question_text);
    $("#hint_text").css("color","white");
    $('#next').attr("disabled", true);
    nextStep();
    //gameInstance.SendMessage('JSManager', 'ToggleHint', 0);
  }
 });

var cnt_hint = 0;
$('#hint').on("click",function(){
  gameInstance.SendMessage('JSManager', 'ToggleHint', 1);
})


function processIncorrectMessage(answer){
  $("#hint_text").css("color","red");
  $('#hint_text').text(answer);
}

//set component
var cnt_buggy =0;
$(document).on("ready",function () {
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
                    if(confirm(messages["reload_page"])) {
                        window.location.href=window.location.href;
                    } else {
                        processIncorrectMessage(msg.getBuggyMsg())
                    }
                  } else{
                  processIncorrectMessage(msg.getBuggyMsg())}
                }
              window.assocrules = msg;
              var indicator = msg.getIndicator();
              var sai = msg.getSAI();                               // selection-action-input from tutor engine
              var selection = (sai ? sai.getSelection() : "_noSuchComponent_");
              var component = sai.getSelection();
              if(component =="checkGroup"&& "correct" == indicator.toLowerCase())
              {
                $("#hint_text").css("color","white");
                // onCorrectEventHandler();
                $('#hint_text').text(messages["success_text"]); 
                $('#next').text("Next");
                $('#hint').hide();
                CTATCommShell.commShell.processDoneContinue(7);
              }
              // console.trace(msg);
      }
    };
    CTATCommShell.commShell.addGlobalEventListener(assocRulesListener);
});

// var opts = {
//   angle: -0.5, // The span of the gauge arc
//   lineWidth: 0.5, // The line thickness
//   radiusScale: 0.81, // Relative radius
//   pointer: {
//     length: 0.57, // // Relative to gauge radius
//     strokeWidth: 0.033, // The thickness
//     color: 'red' // Fill color
//   },
//   limitMax: false,     // If false, max value increases automatically if value > maxValue
//   limitMin: false,     // If true, the min value of the gauge will be fixed
//   colorStart: '#E0E0E0',   // Colors
//   colorStop: '#E0E0E0',    // just experiment with them
//   strokeColor: '#E0E0E0',  // to see which ones work best for you
//   generateGradient: true,
//   highDpiSupport: true,     // High resolution support
//   // renderTicks is Optional
//   renderTicks: {
//     divisions: 5,
//     divWidth: 1.1,
//     divLength: 0.21,
//     divColor: '#333333',
//     subDivisions: 4,
//     subLength: 0.21,
//     subWidth: 0.4,
//     subColor: '#666666'
//   },
//   staticLabels: {
//   font: "10px sans-serif",  // Specifies font
//   labels: [40, 30, 20, 10, 0],  // Print labels at these values
//   color: "#000000",  // Optional: Label text color
//   fractionDigits: 0  // Optional: Numerical precision. 0=round off.
// }
// };
// var target = document.getElementById('foo'); // your canvas element
// var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
// gauge.maxValue = 50; // set max gauge value
// gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
// gauge.animationSpeed = 2; // set animation speed (32 is default value)
// currentVal = 10;
// gauge.set(currentVal); // set actual value

// setTimeout(function() {
//   gauge.animationSpeed = 32; // set animation speed (32 is default value)
//   currentVal = 18;
//   gauge.set(currentVal);
// }, 500);

