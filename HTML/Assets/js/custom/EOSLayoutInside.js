// this need to be set according to each question content
var text_dict = {
    questionId:"MFI Test",
    questionText:"The picture on the right shows the process chamber interior. Drag the parts listed below to the correct boxes on the right.  Click submit button below to submit your answer.",
    term1:"Recoater",
    term2:"Building platform",
    term3:"Rocker switches",
    term4:"Dispenser duct",
    term5:"Filling module",
};

// this need to be set according to each question success and buggy messages
var messages = {
  success_text:"Yes, you are correct!",
  buggy_text:"Sorry, you are wrong. Try it again."
};

// this need to be set according to each question hint messages
hint = new Array(
  "General Hint: Please only select the items which is belongs to EOS layout. That does not include wearable facilities ",
  "Specific Hint: EOS layout does not have indicator on that.",
  "Answer: Correct answer is a,b");

var message_dict = {
    warning_skip:"Are you sure you want to skip this problem?",
    confirm_skip:"Are you sure you complete the problem?"
}

// set pages order
sav = new Array(
  "#instruction1",
  "#question1", 
  );

for(key in text_dict){
    $("#" + key).html(text_dict[key]);    
}

let GetAnswer = function(){
  result = $("#sortable2").children().attr("id") +":"+$("#sortable3").children().attr("id") +":"+$("#sortable4").children().attr("id") +":"+$("#sortable5").children().attr("id");
  return result;
}



let CheckAnswer = function(){
    result = $("#sortable2").children().attr("id") +":"+$("#sortable3").children().attr("id") +":"+$("#sortable4").children().attr("id") +":"+$("#sortable5").children().attr("id");
    if( result != "undefined:undefined:undefined:undefined") {
        if(result.indexOf('undefined') > 0) {
            if(confirm(message_dict["confirm_skip"])) {
                CTATCommShell.commShell.gradeSAI("termAnswers", "UpdateTextField", result);
            } else {
                return;
            }  
        } else {
            CTATCommShell.commShell.gradeSAI("termAnswers", "UpdateTextField", result);
        }
    } 
}

// set id of the component
var i = 0;
$('#next').on("click", function() {
    if ($('#question1').css('display') == 'none' & $('#instruction6').css('display') == 'block') {
      $('#instruction1').hide();
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
              var response = GetAnswer();
              console.log(component);
              console.log(indicator);
              if(component && "incorrect" == indicator.toLowerCase())
              {
                if (cnt_buggy < 2){
                  $('#hint_text').text(messages["buggy_text"]);
                  cnt_buggy += 1;
                }
                else{
                  $('#hint_text').text("Tutor's answer is "+sai.getInput().toString());
                  console.log("Tutor's answer is "+sai.getInput().toString());
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



