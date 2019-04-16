// this need to be set according to each question content

var text_dict = {
    questionId:"MFI Test",
    questionText:"In the following, match the descriptions with the types of recoater blade by drag descriptions from the bottom list to the correct blade types.",
    blade1:"High speed steel",
    blade2:"Ceramic",
    blade3:"Brush",
    choiceAText:"It is used most of the time and it could hold up well.",
    choiceBText:"It is used when the powder is magnetic.",
    choiceCText:"It is used when you build small thin walls or fine delicate parts.",
    input_submitButtonLabel:"Submit"
};
// this need to be set according to each question success and buggy messages
var messages = {
  success_text:"Yes, you are correct!",
  buggy_text:"Sorry, but this answer is incorrect."
};

// this need to be set according to each question hint messages
hint = new Array(
  "Please recall each part's name and there is one distractot listed in the table",
  "The filling module is the distractor",
  "Correct answer is a-Recoater, b-Building platform, c-Collector duct, d-Dispenser duct, e-Rocket switches");

var message_dict = {
    warning_skip:"Are you sure you want to skip this problem?",
    confirm_skip:"Are you sure you complete the problem?"
}

// set pages order
sav = new Array(
  "#instruction1",
  "#instruction2", 
  "#instruction3",
  "#question1",
  "#instruction4", 
  "#instruction5",
  "#instruction6",
  );

for(key in text_dict){
    $("#" + key).html(text_dict[key]);    
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

// set id of the component
var i = 0;
$('#next').on("click", function() {
    if ($('#question1').css('display') == 'none' & $('#instruction3').css('display') == 'block') {
      $('#instruction3').hide();
      $('#question1').show();
      $('#next').text("Submit");
      $('#hint').show();
      $('#hint_text').text("Answer the question and press submit to check your answer.");
      return
    } else {
      if($('#question1').css('display') == 'none') {
        $(sav[i]).hide();
        i += 1;
        console.log(sav[i]);
        $(sav[i]).show();
      } else{
        $('#question1').show();
      }
    }
    CheckAnswer();
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
              if("AssociatedRules" != evt || !msg)
              {
                  return;
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
              if(component && "incorrect" == indicator.toLowerCase())
              {
                if (cnt_buggy < 2){
                  $('#hint_text').text(messages["buggy_text"]);
                  cnt_buggy += 1;
                }
                else{
                  $('#hint_text').text(messages["Please use hints to help you!"]);
                  // $('#hint_text').text("Tutor's answer is "+sai.getInput().toString());
                  // console.log("Tutor's answer is "+sai.getInput().toString());
                } 
              }
              if(component =="termAnswers"&& "correct" == indicator.toLowerCase())
              {
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



