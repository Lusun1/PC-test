// this need to be set according to each question content

currentScene = '5.1';

var text_dict = {
    questionId:"MFI Test",
    questionText:"In the following, match the descriptions with the types of recoater blade by drag descriptions from the bottom list to the correct blade types.",
    blade1:"High speed steel",
    blade2:"Ceramic",
    blade3:"Brush",
    choiceAText:"It is used most of the time and it could hold up well.",
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
  "Please recall each part's different function",
  "Correct answer is: HSS is used most of the time and it could hold up well; Brush recoater blade is used when you build small thin walls or fine delicate parts; Ceramic recoater blade is used when the powder is magnetic.",
  "Correct answer is: HSS is used most of the time and it could hold up well; Brush recoater blade is used when you build small thin walls or fine delicate parts; Ceramic recoater blade is used when the powder is magnetic.");

var message_dict = {
    warning_skip:"Are you sure you want to skip this problem?",
    confirm_skip:"Are you sure you complete the problem?",
    confirm_done:"Do you want to complete the whole learning session and continue to the post test?"
}

// set pages order
sav = new Array(
  "#instruction1",
  "#instruction2", 
  "#question1",
  "#instruction3",
  "#instruction4",
  "#instruction5",
  "#instruction6"
  );

var chapterToId = {
    "PPE":1,
    "Safety":2,
    "EOS_Layout_Outside":3,
    "EOS_Layout_Inside":4,
    "Mount_Recoater_Blade":5
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
  $('#hint_text').text(messages.question_text);
}

// set id of the component
var i = 0;
$('#next').on("click", function() {
    if (sav[i] == '#instruction3') {
      $('#question1').hide();
      $('#instruction3').show();
      processUnity();
    } else if (sav[i] == '#instruction4' || sav[i] == '#instruction5') {
      $("#hint_text").css("color","white");
      $('#next').attr("disabled", true);
      nextHandler();
      $('#hint_text').text(messages.question_text);
    } else if (sav[i] == '#instruction6') {
      if(confirm(message_dict["confirm_done"])) {
        CTATCommShell.commShell.processDoneContinue(7);
      } else {
          return;
      }
    }
    if ($('#question1').css('display') == 'none' & $('#instruction2').css('display') == 'block') {
      $('#instruction2').hide();
      $('#question1').show();
      $('#next').text("Submit");
      $('#hint').show();
      $('#hint_text').text("Answer the question and press submit to check your answer.");
      i += 1;
      return
    } else {
      if($('#question1').css('display') == 'none' ) {
        console.log(sav[i]);
        $(sav[i]).hide();
        i += 1;
        $(sav[i]).show();
      } else{
        $(sav[i]).hide();
        $('#question1').show();
        if ($("#next").text() == "Submit"){
          CheckAnswer();
        }
        else{
          $('#question1').show();
        }
      }
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
                //processUnity();
              }
              // console.trace(msg);
      }
    };
    CTATCommShell.commShell.addGlobalEventListener(assocRulesListener);
});



