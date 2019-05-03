
var message_dict = {
    warning_skip:"Are you sure you want to skip this problem?",
    confirm_skip:"Are you sure you complete the problem?"
}

var text_dict = {
    questionId:"MFI Test",
    questionText:"The Integrated Process Chain Management (IPCM) with its components is a production tool for the cost-effective manufacture of parts in an industrial environment. Drag the parts listed below to the correct boxes on the right.  Click submit button below to submit your answer.",
    term1:"Machine with recirculating filter system",
    term2:"Comfort powder module",
    term3:"Electrical lifting truck",
    term4:"Collector duct",
    term5:"Filling module",
    input_submitButtonLabel:"Submit"
};

for(key in text_dict){
    $("#" + key).html(text_dict[key]);    
}

$('#input_submitButtonLabel').on("click", function() {
    result = $("#sortable2").children().attr("id") +":"+$("#sortable3").children().attr("id") +":"+$("#sortable4").children().attr("id") +":"+$("#sortable5").children().attr("id");
    console.log(result);
    if(result != "undefined:undefined:undefined:undefined") {
        if(result.indexOf('undefined') > 0) {
            if(confirm(message_dict["confirm_skip"])) {
                CTATCommShell.commShell.gradeSAI("termAnswers", "UpdateTextField", result);
            } else {
                return;
            }  
        } else {
            CTATCommShell.commShell.gradeSAI("termAnswers", "UpdateTextField", result);
        }
    } else {
        if(confirm(message_dict["warning_skip"])) {
            CTATCommShell.commShell.gradeSAI("termAnswers", "UpdateTextField", "Student skipped question.");
        } else {
            return;
        }
    }
    CTATCommShell.commShell.processDoneContinue(7);
 });