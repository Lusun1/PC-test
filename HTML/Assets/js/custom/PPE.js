// this need to be set according to each question content
var text_dict = {
    questionId:"MFI Test",
    questionText:"Which of the following items are in the PPE for EOS? Please select all that apply.",
    checkA:"Respirators",
    checkB:"Indicator",
    checkC:"Nitrile gloves",
    checkD:"Closed toe shoes"
};

// this need to be set according to each question success and buggy messages
var messages = {
  success_text:"Yes, you are correct. Indicator is not PPE.",
  buggy_text_indicator:"Sorry, but this answer is incorrect. Indicator is not PPE.",
  buggy_text_less:"Sorry, but this answer is incorrect. You may want to select all that apply.",
  warning_skip:"Are you sure you want to skip this problem?",
  reload_page:"Do you want to review this chapter again?"
};

// this need to be set according to each question hint messages
hint = new Array(
  "Try to think about PPE definition. PPE is for personal protection equipment",
  "Indicator is not PPE, because PPE is for personal protection equipment. Indicator cannot be used to pretect people",
  "Correct answer is Respirators, Nitrile gloves and Closed toe shoes.");

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

let GetAnswer = function(){
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
    if ($('#question1').css('display') == 'none' & $('#instruction2').css('display') == 'block') {
      $('#instruction2').hide();
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
//   var XML_hint = assocrules.getXMLString();
//   console.log(XML_hint);
//   xmlDoc = $.parseXML(XML_hint);
//   $xml = $( xmlDoc);
//   if($xml.find("Indicator").text() == "Hint"){
//   var hint_text = $xml.find("TutorAdvice").text();
//   console.log(hint_text);
//   $('#hint_text').text(hint_text);
// }
})


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



