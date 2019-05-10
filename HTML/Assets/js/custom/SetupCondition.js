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
  "#instruction4",
  "#instruction5",
  "#instruction6",
  "#instruction7",
  "#instruction8",
  "#instruction9"
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
    "#introduction9"
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

function processUnity(){
  $('#unity').show();
  //CTATCommShell.commShell.gradeSAI("unity_recoater_blade", "grabOnItem", "HSS")
  console.log('load unity');
  //$('.webgl-content').append('<div id="gameContainer" style="width: 90%; height: 70%"></div>');
  gameInstance = UnityLoader.instantiate("gameContainer", "Assets/unity/Build/unity.json", {onProgress: UnityProgress});
  $("#hint_text").css("color","white");
  $('#hint_text').text(messages.question_text);
}

// set id of the component
var i = 0;
$('#next').on("click", function() {
  if (sav[i] == '#instruction3') {
    processUnity();
  }
  if (sav[i] == '#instruction9') {
    console.log("this is the end")
    if(confirm(message_dict["confirm_done"])) {
      // CTATCommShell.commShell.processDoneContinue(7);
    } else {
        return;
    }
  }
  else{
    console.log(sav[i]);
    $(sav[i]).hide();
    $(intro[i]).hide();
    i += 1;
    $(sav[i]).show();
    $(intro[i]).show();
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



