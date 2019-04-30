var opts = {
  angle: -0.5, // The span of the gauge arc
  lineWidth: 0.5, // The line thickness
  radiusScale: 0.6, // Relative radius
  pointer: {
    length: 0.8, // // Relative to gauge radius
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
currentVal = 0;
// this function is used to set value
gauge.set(currentVal); // set actual value

// setTimeout(function() {
//     gauge.animationSpeed = 32; // set animation speed (32 is default value)
//     currentVal = 0;
//     gauge.set($("#recoater").position().down);
//   }, 500);