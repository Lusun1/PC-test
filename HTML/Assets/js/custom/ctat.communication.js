/**
 * Requests CTAT to grade an item by passing the id of the component, the action that was performed on the component and that value that is to be graded as an input.
 * @param selection - The value of the id attribute for the component that the student has interacted with.
 * @param action - The action that was performed on the component.
 * @param input - The value that is to be graded.
 * @example
 * // Requests CTAT to grade a multiple choice question that uses a radio button group called 'whyQchoices'.
 * // The action that is performed on the radio option in CTAT is an 'UpdateRadioButton'.
 * // In this case, CTAT expects a value of the radio button clicked by the student as an input, which is choiceC.
 * gradeItem('whyQchoices', 'UpdateRadioButton', 'choiceC').
 */
var unanswered = false;

function gradeItemSAI(selection, action, input) {
    if (selection != undefined && action != undefined && input != undefined && input != "" && input != ".") {
        CTATCommShell.commShell.gradeSAI(selection, action, input);
    }
}

/**
 * Requests CTAT to grade a text input item by passing the id of the component
 * Equivalent to gradeItemSAI(id,'UpdateTextField',$(#id).val())
 */

function gradeItem(item) {
    CTATCommShell.commShell.gradeSAI($(item).attr('id'), 'UpdateTextField', $(item).val());
}

/**
 * Tells CTAT that the current question is complete (causes it to transition to the "done" state)
 */

function completeProblem() {
    CTATCommShell.commShell.processDoneContinue(7);
}

/**
 * Logs a student's response to a level of confidence question on a 5-point Likert scale to the dataset designated in MathTutor.
 * @param selection - The value of the id attribute for the component that the student has interacted with.
 * @param action - The action that was performed on the component.
 * @param input - The value that is to be graded.
 */
function updateLikert(selection, action, input) {
    setTimeout(function() {
        (CTATCommShell.commShell.getLoggingLibrary()).logInterfaceAttempt(selection, action, input);
    }, 2000);
}