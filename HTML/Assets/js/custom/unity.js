//var gameInstance = UnityLoader.instantiate("gameContainer", "Assets/unity/Build/unity.json", {onProgress: UnityProgress});
var gameInstance;
var currentScene = 'none';

function loadComplete() {
    $("#hint_text").css("color","white");
    $('#hint_text').text("Press Next to continue.");
    console.log("Connected to Unity");
    setStep(currentScene);
    if (currentScene == '4.1') {
        $('#next').attr("disabled", false);
    } else {
        $('#next').attr("disabled", true);
    }
}

function setStep(stepId) {
    gameInstance.SendMessage('JSManager', 'SetStep', stepId);
}

function nextStep() {
    gameInstance.SendMessage('JSManager', 'NextStep');
}

var dropObject = {
}

var dropArr = ['Recoater', 'Building Platform', 'Collector Duct', 'Dispenser Duct', 'Rocker Swithches'];

var dropIdToName = {
    RecoaterText: 'Recoater',
    BuildingPlatformText: 'Building Platform',
    CollectorDuctText: 'Collector Duct',
    DispenserDuctText: 'Dispenser Duct',
    RockerSwitchesText: 'Rocker Swithches'
}

function dropText(objectId, objectText) {
    console.log("dropText: " + objectId + ", " + objectText);
    var dropName = dropIdToName[objectId];
    dropObject[dropName] = objectText;
}

function getDropSubmit() {
    var arr = [];
    for (var dropName of dropArr) {
        console.log("dropName: " + dropName + " dropObject[dropName]: " + dropObject[dropName]);
        if (dropObject[dropName] == '' || dropObject[dropName] == null)
            arr.push('undefined');
        else
            arr.push(dropObject[dropName]);
    }
    return arr.join(':');
}

var idToName = {
    RecoaterBody: 'Recoater',
    'Building Platform': 'Building Platform',
    CollectorBinModel: 'Collector Duct',
    DispenserModel: 'Dispenser Duct',
    Rocker: 'Rocker Swithches'
}

var termToId = {
    "#term1": 'RecoaterBody',
    "#term2": 'Building Platform',
    "#term3": 'CollectorBinModel',
    "#term4": 'DispenserModel',
    "#term5": 'Rocker'
}

var isComplete = false;
var screwCount = 0;
var dragOnItemRegistered = false;
function dragOnItem(itemName) {
    console.log('dragOnItem: ' + itemName);
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
                    processIncorrectMessageMountRecoater(msg.getBuggyMsg())}
              window.assocrules = msg;
              var indicator = msg.getIndicator();
              var sai = msg.getSAI();
              var component = sai.getSelection();
              console.log(sai.getSelection() + ';' + sai.getAction() + ';' + sai.getInput() + ';' + indicator);
              if (component == 'recoaterBlade') {
                if ("correct" == indicator.toLowerCase()) {
                    $('#hint_text').css('color', 'green');
                    $('#hint_text').text(messages.success_text);
                    if (sav[i] == '#instruction6') {
                        console.log("screwCount++");
                        screwCount++;
                        if (screwCount == 7) {
                            $('#next').attr("disabled", false);
                            isComplete = true; 
                        }
                    } else {
                        $('#next').attr("disabled", false);
                        isComplete = true;
                    }
                } else {
                    if (!isComplete)
                        $('#next').attr("disabled", true);
                }
                if("incorrect" == indicator.toLowerCase())
                {
                    $("#hint_text").css("color","red");
                    $('#hint_text').text("Sorry, you are incorrect. Please try another recoater blade.");
                    // $('#hint_text').text(messages["success_text"]); 
                    //processUnity();
                }
              }
      }
    };
    if (!dragOnItemRegistered) {
        dragOnItemRegistered = true;
        CTATCommShell.commShell.addGlobalEventListener(assocRulesListener);
    }
    CTATCommShell.commShell.gradeSAI("recoaterBlade", "dragOnItem", itemName);
}

var dropNameToId = {
    Recoater: 'RecoaterText',
    'Building Platform': 'BuildingPlatformText',
    'Collector Duct': 'CollectorDuctText',
    'Dispenser Duct': 'DispenserDuctText',
    'Rocker Swithches': 'RockerSwitchesText'
}

function clickObject(objectName) {
    console.log("clickObject: " + objectName);
    console.log("currentId: " + currentId);
    if (objectName == 'RockerA' || objectName == 'RockerC')
        objectName = 'Rocker';
    //CTATCommShell.commShell.processComponentAction(new CTATSAI(objectName, "nextState", 1));
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
              var sai = msg.getSAI();
              var component = sai.getSelection();
              console.log(sai.getSelection() + ';' + sai.getAction() + ';' + sai.getInput() + ';' + indicator);
              if (component == 'termAnswers') {
                if ("correct" == indicator.toLowerCase()) {
                    $('#hint_text').css('color', 'green');
                    $('#hint_text').text(messages.success_text);
                    for (let key in dropObject) {
                        gameInstance.SendMessage('JSManager', 'SetNormalLabel', dropNameToId[key]);
                    }
                }
                if ("incorrect" == indicator.toLowerCase()) {
                    $('#hint_text').css('color', 'red');
                    $('#hint_text').text(messages.buggy_text);
                    for (let key in dropObject) {
                        if (dropObject[key] != key) {
                            gameInstance.SendMessage('JSManager', 'SetErrorLabel', dropNameToId[key]);
                        } else {
                            gameInstance.SendMessage('JSManager', 'SetNormalLabel', dropNameToId[key]);
                        }
                    }
                }
              }
              else {
                if(component && "correct" == indicator.toLowerCase())
                {
                    $('#hint_text').css('color', 'green');
                    $('#hint_text').text(messages.success_text);
                    $('#next').attr("disabled", false);
                }
                if(component && "incorrect" == indicator.toLowerCase())
                {
                    $('#hint_text').css('color', 'red');
                    $('#hint_text').text('Sorry, you selected ' + idToName[objectName]);
                    $('#next').attr("disabled", true);
                }
            }
      }
    };
    CTATCommShell.commShell.addGlobalEventListener(assocRulesListener);
    if (termToId[currentId] != '' && termToId[currentId] != null)
        CTATCommShell.commShell.gradeSAI(termToId[currentId], "nextState", objectName);
}

function nextHandler() {
    console.log("nextHandler");
    //document.getElementById("next").style.visibility = "hidden";
    //document.getElementById("p1").innerHTML = "Find Building Platform";
    //setStep('4.3');
    nextStep();
    isComplete = false;
}