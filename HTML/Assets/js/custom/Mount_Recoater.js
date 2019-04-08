// this need to be set according to each question content


// this need to be set according to each question success and buggy messages
var messages = {
  success_text:"Yes, you are correct. Indicator is not PPE.",
  buggy_text_indicator:"Sorry, you are wrong. Indicator is not PPE.",
  buggy_text_less:"Sorry, you are wrong. You may want to select all that apply."
};

// this need to be set according to each question hint messages
hint = new Array(
  "General Hint: Try to think about PPE definition. PPE is for personal protection equipment",
  "Specific Hint: Indicator is not PPE, because PPE is for personal protection equipment. Indicator cannot be used to pretect people",
  "Answer: Correct answer is Respirators, Nitrile gloves and Closed toe shoes.");

// set pages order
sav = new Array(
  "#instruction1",
  "#instruction2",
  "#instruction3",
  "#instruction4",
  "#instruction5",
  "#question1", 
  );


let GetAnswer = function(){
  check1=$("input[name='checkGroup']")[0].checked;
  check2=$("input[name='checkGroup']")[1].checked;
  check3=$("input[name='checkGroup']")[2].checked;
  check4=$("input[name='checkGroup']")[3].checked;
  check1Text = $("#checkA").text()
  check2Text = $("#checkB").text()
  check3Text = $("#checkC").text()
  check4Text = $("#checkD").text()
  response = check1Text+": "+check1+";"+check2Text+": "+check2+";"+check3Text+": "+check3+";"+check4Text+": "+check4;
  return response;
}

let CheckAnswer = function(){
    check1=$("input[name='checkGroup']")[0].checked;
    check2=$("input[name='checkGroup']")[1].checked;
    check3=$("input[name='checkGroup']")[2].checked;
    check4=$("input[name='checkGroup']")[3].checked;
    check1Text = $("#checkA").text()
    check2Text = $("#checkB").text()
    check3Text = $("#checkC").text()
    check4Text = $("#checkD").text()
    if(check1 || check2 || check3 || check4) {
        // response = "Respirators: " + check1 + ";Closed toe shoes: " + check2 + ";nitrile gloves: " + check3 + ";metal powder: " + check4;
        // response = check1Text+": "+check1+";"+check2Text+": "+check2+";"+check3Text+": "+check3+";"+check4Text+": "+check4;
        // console.log(response);
        response = $("#sortable2").children().attr("id") +":"+$("#sortable3").children().attr("id") +":"+$("#sortable4").children().attr("id");
    console.log(result);
        CTATCommShell.commShell.gradeSAI("checkGroup", "UpdateCheckBox", response);
        return response;
    }
}

// set id of the component
var i = 0;
$('#next').on("click", function() {
    if ($('#question1').css('display') == 'none' & $('#instruction5').css('display') == 'block') {
      $('#instruction6').hide();
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
                if ($("input[name='checkGroup']")[1].checked == true){
                  $('#hint_text').text(messages["buggy_text_indicator"])
                }
                else{
                  $('#hint_text').text(messages["buggy_text_less"])
                }
                // onIncorrectEventHandler();
                // if (cnt_buggy < 2){
                  // $('#hint_text').text(messages["buggy_text"]);
                  // cnt_buggy += 1;
                // }
                // else{
                //   $('#hint_text').text("Tutor's answer is "+sai.getInput().toString());
                //   console.log("Tutor's answer is "+sai.getInput().toString());
                // } 
              }
              if(component =="checkGroup"&& "correct" == indicator.toLowerCase())
              {
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



