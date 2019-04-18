// this need to be set according to each question content
var text_dict = {
  questionId:"MFI Test",
  questionText:"Consider the risk and safety, which of these are apply for EOS machine? Select all that apply.",
  checkA:"The metal powders may cause irritation to eyes and skin.",
  checkB:"If the fire occurs in the build chamber(a small risk), it can be extinguished by closing chamber door and flood the chamber with water",
  checkC:"By pressing the EMERGENCY STOP button on the machine all axis movements are stopped, the laser shut down and the process chamber door unlocked.",
  checkD:"In order to reduce the likelihood of a spark, users should wear anti-static safety shoes and stand on the anti-static floor and boot straps"
};

// this need to be set according to each question success and buggy messages
var messages = {
  success_text:"Yes, you are correct! Flood the chamber with water will cause the reactivity of the metal powder with water.",
  warning_skip:"Are you sure you want to skip this problem?",
  reload_page:"Do you want to review this chapter again?"
};

// this need to be set according to each question hint messages
hint = new Array(
"The metal powder could have reactivity with water.  ",
"Flood the chamber with water will cause the reactivity of the metal powder with water.",
"Correct answer is a,c,d");

// set pages order
sav = new Array(
"#instruction1",
"#instruction2",
"#instruction3",
"#instruction4",
"#instruction5",
"#instruction6",
"#question1", 
);

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
      // response = "Respirators: " + check1 + ";Closed toe shoes: " + check2 + ";nitrile gloves: " + check3 + ";metal powder: " + check4;
      // response = {"checkA":check1, "checkB":check2,"checkC":check3,"checkD":check4}
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
  if ($('#question1').css('display') == 'none' & $('#instruction6').css('display') == 'block') {
    $('#instruction6').hide();
    $('#question1').show();
    $('#next').text("Submit");
    $('#hint').show();
    $('#hint_text').text("Answer the question and press submit to check your answer.");
    return
  } else {
    if($('#question1').css('display') == 'none') {
      console.log(sav[i]);
      console.log("then show");
      $(sav[i]).hide();
      i += 1;
      console.log(sav[i]);
      $(sav[i]).show();
    } else{
      $(sav[i]).hide();
      $('#question1').show();
      CheckAnswer();
    }
  }
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
  console.log(answer);
  $("#hint_text").css("color","red");
  if (answer == "Sorry, but this is not correct.  Flooding the chamber with water is very dangereous, since the metal powder will react with water.")
  {
    $("#checkB").css("color","red");
  }else{
    $("#checkB").css("color","white");
  }
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



