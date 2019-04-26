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
}

function setStep(stepId) {
    gameInstance.SendMessage('JSManager', 'SetStep', stepId);
}

function nextStep() {
    gameInstance.SendMessage('JSManager', 'NextStep');
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
                        $('#next').attr("disabled", false);
                        isComplete = true; 
                        $('#hint_text').css('color', 'green');
                        $('#hint_text').text(messages.success_text);
                    }
                } else {
                    $('#next').attr("disabled", false);
                    isComplete = true;
                    $('#hint_text').css('color', 'green');
                    $('#hint_text').text(messages.success_text);
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
  question_text:"Press Next to continue."
};

// this need to be set according to each question hint messages
hint = new Array(
  "Please only select the items which is belongs to EOS layout. That does not include wearable facilities ",
  "EOS layout does not have indicator on that.",
  "Correct answer is Process chamber, Service Network.");

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

// set id of the component
var i = 0;
$('#next').on("click", function() {
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
 });

var cnt_hint = 0;
$('#hint').on("click",function(){
  console.log(assocrules.getIndicator())
  CTATCommShell.commShell.processComponentAction(new CTATSAI("hint", "ButtonPressed", -1));
  console.log(cnt_hint);
  if (cnt_hint < 3){
    $('#hint_text').text(hint[cnt_hint]);
    cnt_hint += 1;
  } else{
    $('#hint_text').text(hint[2]);
  }
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