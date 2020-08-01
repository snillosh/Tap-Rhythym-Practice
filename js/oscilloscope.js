/**
 Author: Phill Phelps
 Date: 2016 August 11
 this code is adapted from the Tone.js analyse.html example
 
 Date: 2017 November 2
 updated to reflect the way ToneJS R11 Tone.Analyzer() returns values
 "waveform" analysis now uses .getValue()
 and values returned range between -1.0 and +1.0
*/
var oscilloscope = {};

oscilloscope.setup = function(waveformAnalyser)
{
    // set up a reference to the external waveform analyser
    this.waveformAnalyser = waveformAnalyser;
    
    // get the first canvas element we can find in the document
    // set up a canvas context for it in 2d drawing mode
    // and keep a reference to the canvas context
    var canvasElement = document.querySelector("canvas");
    this.canvasContext = canvasElement.getContext("2d");
    
    // keep the canvas width and height
    // (we need this later for drawing our waveform)
    this.canvasWidth = canvasElement.width;
    this.canvasHeight = canvasElement.height;
    
    // start drawing
    oscilloscope.drawLoop()
}

oscilloscope.plot = function (waveformValues){
    //erase the canvas
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // set up a line "path" drawing style
    this.canvasContext.beginPath();
    this.canvasContext.lineJoin = "round"; // smooth line edges
    this.canvasContext.lineWidth = 3; // 3 pixels wide
    
    // map out the path for each point in the waveform sample values
    this.canvasContext.moveTo(0, (-waveformValues[0] + 1) / 2 * this.canvasHeight);
    for (var i = 1, len = waveformValues.length; i < len; i++){
        var val = (-waveformValues[i] + 1) / 2;
        var x = this.canvasWidth * (i / len);
        var y = val * this.canvasHeight;
        this.canvasContext.lineTo(x, y);
    }

    // tell the canvas to draw our line path now
    this.canvasContext.stroke();
}

// set up the oscilloscope animation drawing loop
oscilloscope.drawLoop = function() {
        
    // plot the waveform values in the oscilloscope
    var waveformValues = oscilloscope.waveformAnalyser.getValue();
    oscilloscope.plot(waveformValues);
    
    // and schedule the next animation frame
    requestAnimationFrame(oscilloscope.drawLoop);
}
