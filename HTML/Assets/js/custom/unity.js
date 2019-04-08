var gameInstance = UnityLoader.instantiate("gameContainer", "Assets/unity/Build/unity.json", {onProgress: UnityProgress});

function loadComplete() {
    console.log("Connected to Unity");
    setStep('4.1');
}

function setStep(stepId) {
    gameInstance.SendMessage('JSManager', 'SetStep', stepId);
}

function nextStep() {
    gameInstance.SendMessage('JSManager', 'NextStep');
}

function clickObject(objectName) {
    console.log("clickObject: " + objectName);
    if (objectName == "HolderTrigger") {
        document.getElementById("next").style.visibility = "visible";
    }
}

function nextHandler() {
    console.log("nextHandler");
    //document.getElementById("next").style.visibility = "hidden";
    //document.getElementById("p1").innerHTML = "Find Building Platform";
    //setStep('4.3');
    nextStep();
}