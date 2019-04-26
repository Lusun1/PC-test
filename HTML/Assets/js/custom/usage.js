$( document ).ready(function() {
});

var opts = {
  angle: -0.5, // The span of the gauge arc
  lineWidth: 0.5, // The line thickness
  radiusScale: 0.81, // Relative radius
  pointer: {
    length: 0.57, // // Relative to gauge radius
    strokeWidth: 0.033, // The thickness
    color: 'red' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#E0E0E0',   // Colors
  colorStop: '#E0E0E0',    // just experiment with them
  strokeColor: '#E0E0E0',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  // renderTicks is Optional
  renderTicks: {
    divisions: 5,
    divWidth: 1.1,
    divLength: 0.21,
    divColor: '#333333',
    subDivisions: 4,
    subLength: 0.21,
    subWidth: 0.4,
    subColor: '#666666'
  },
  staticLabels: {
  font: "10px sans-serif",  // Specifies font
  labels: [40, 30, 20, 10, 0],  // Print labels at these values
  color: "#000000",  // Optional: Label text color
  fractionDigits: 0  // Optional: Numerical precision. 0=round off.
}
};
var target = document.getElementById('foo'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 50; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 2; // set animation speed (32 is default value)
currentVal = 10;
gauge.set(currentVal); // set actual value

setTimeout(function() {
  gauge.animationSpeed = 32; // set animation speed (32 is default value)
  currentVal = 18;
  gauge.set(currentVal);
}, 500);


$( "#left" ).click(function() {
  if(currentVal> 0){
    currentVal -= 5;
    gauge.set(currentVal);
  }else{
    currentVal = 0;
  }
});


$( "#right" ).click(function() {
  if(currentVal < 50){
    currentVal += 5;
    gauge.set(currentVal);
  }else{
    currentVal = 50;
  }
});


$( "#up" ).click(function() {
  if(currentVal> 0){
    currentVal -= 2;
    gauge.set(currentVal);
  }else{
    currentVal = 0;
  }
});


$( "#down" ).click(function() {
  if(currentVal < 50){
    currentVal += 2;
    gauge.set(currentVal);
  }else{
    currentVal = 50;
  }
});

$( "#hint-btn" ).click(function() {
  updateHintText($( "#Hint" ));
});

function updateHintText( i ) {
  if(currentVal == 10){
    i.text( "Good job, you are correct!" );
  } else{
    i.text( "It seems your build platform is still not flat! You would like to make the value to be the same as the start point![maybe some simulation for build platform crash]" );
  }
}

$( "#continue" ).click(function() {
  updateFeedback($( "#Hint" ));
});

$( "#continue" ).click(function() {
  updateFeedback($( "#Hint" ));
});

function updateFeedback( i ) {
  if(currentVal == 10){
    i.text( "Good job, you are correct!" );
  } else{
    i.text( "It seems your build platform is still not flat, your recoater will crash the build! [maybe some simulation for build platform crash]" );
  }
}
