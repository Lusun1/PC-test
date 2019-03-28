/** For problems that include a "how sure are you that you solved this problem correctly" question, 
 * shows the solution confidence question, and animates the question it's referring to if relevant.
 * Called once the finish button is clicked. 
 */

$('#leaveBlank').on('hidden.bs.modal', function(e) {
    unanswered = false;
});

var stay = false;
var wantsToAnswer = true;

function showSolutionConfidenceQuestion() {

    if ($("input[type='number']").length) {
        $("input[type='number']").focusout();
        unanswered = false;
    }
    if (wantsToAnswer) {
        $("input[type='number']").each(function() {
            if ($(this).val().trim() === "") {
                unanswered = true;
                return false;
            }
        });
    }
    if (unanswered) {
        $('#leaveBlank').modal('show');
        stay = true;
        $("#modelYes").click(function() {
            $('#leaveBlank').modal('hide');
            unanswered = false;
            stay = false;
            wantsToAnswer = false;
            showSolutionConfidenceQuestion();
        });
    } else {
        endQ();
        $("#solutionConfidenceQuestion").removeClass('hiddenElement');
        $("#btnFinish").hide();
        if (blue) {
            $("#probWithConfidenceQuestion").addClass("bluebg");
        }
    }
}

/**
 * Used to disable the answer choices in a radio question
 * @param groupName- name of radio group to disable
 */
function disableRadioGroup(groupName) {
    $("input[name='" + groupName + "']").attr('disabled', 'disabled');
}

/**
 * Shuffles MCQ options for the option group class that is passed to it.
 * @param optionClass The class that denotes the element that contains the options.
 */
function shuffleOptions(optionsClass) {
    $(optionsClass + " .row").each(function(index, value) {
        $(this).attr("data-sort-id", $(this).hasClass('always-top-row') ? 1000 : getRandomNumber100());
    });
    $(optionsClass + " .row").sort(function(a, b) {
        return parseInt($(b).data('sort-id')) - parseInt($(a).data('sort-id'));
    }).appendTo(optionsClass);
}

function nextInputBox(elem) {
    var num = parseInt(elem.attr('fsmOrder'));
    num = num + 1;
    elem.blur();

    if ($("input[fsmOrder=" + num + "]").length == 0) {
        $("input[fsmOrder=1]").focus();
    } else {
        $("input[fsmOrder=" + num + "]").focus();
    }
}

$("input[type='number']").keypress(function(evt) {
    if (evt.which < 45 || evt.which > 57 || evt.which == 47) {
        evt.preventDefault();
    }

    if (evt.keyCode == 13) {
        nextInputBox($(this));
    }
});

$("input[type='number'].digit-box").keypress(function(evt) {
    if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
    }

    if (evt.keyCode == 13) {
        nextInputBox($(this));
    } else {
        if (this.value.length > this.maxLength)
            this.value = this.value.slice(0, this.maxLength);
    }
});


function setupFrame() {
    var css = "#tutor_container { overflow: auto !important; -webkit-overflow-scrolling:touch !important; } div[tabindex='-1'] {height:150% !important;}",
        head = parent.parent.document.head || parent.parent.document.getElementsByTagName('head')[0],
        style = parent.parent.document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(parent.parent.document.createTextNode(css));
    }

    head.appendChild(style);
}

window.addEventListener("load", setupFrame, false);