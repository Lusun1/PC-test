/** 
 * For problems that include a "how sure are you that you solved this problem correctly" question, shows the done button 
 * once the confidence question is answered
 * (name of the confidence question radio buttons should be "confidenceValues")
 */

$("input[name='confidenceValues']").change(function() {
    $($("input[name='confidenceValues']").parent()).removeClass('text-blue');
    $($("input[name='confidenceValues']:checked").parent()).addClass('text-blue');
    updateLikert($("#probWithConfidenceQuestion").attr('data-input'), 'UpdateLikert', $(this).val());
    $("#btnDone").removeClass('hiddenElement');
});

/** 
 * Once the done button is clicked, disables the question,
 * tells CTAT the problem is done, and disables the done button. 
 */

$("#btnDone").click(function() {
    disableRadioGroup('confidenceValues');
    disableRadioGroup(testName);
    disableRadioGroup(testName2);
    completeProblem();
    $("#btnDone").attr('disabled', 'disabled');
});

$('form').on('keydown', 'input[type=number]', function(e) {
    if (e.which == 38 || e.which == 40)
        e.preventDefault();
});