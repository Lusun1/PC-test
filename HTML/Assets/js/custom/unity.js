var gameInstance = UnityLoader.instantiate("gameContainer", "Assets/unity/Build/unity.json", {onProgress: UnityProgress});

function loadComplete() {
    console.log("Connected to Unity");
    setStep('4.1');
    $('#next').attr("disabled", false);
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
                    $('#hint_text').text(messages.success_text);
                }
                if ("incorrect" == indicator.toLowerCase()) {
                    $('#hint_text').text(messages.buggy_text);
                }
              }
              else {
                if(component && "correct" == indicator.toLowerCase())
                {
                    $('#hint_text').text(messages.success_text);
                    $('#next').attr("disabled", false);
                }
                if(component && "incorrect" == indicator.toLowerCase())
                {
                    $('#hint_text').text(messages.buggy_text + ' You selected ' + idToName[objectName]);
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
}