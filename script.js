const inputElement = document.getElementById("audioFileInput");
const audioElement = document.getElementById("audio");
const canvasElement = document.getElementById("canvas");

const canvasContext = canvasElement.getContext("2d");
// Set the canvas dimensions to match the window size
canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

inputElement.addEventListener("change", (e) => {
  // inputElement element on change returns the selected file(s) in the FileList object (as an array-like object)
  // and the File object contains information about the file such as name, size, type, etc.
  // Get the first file from the FileList
  const file = inputElement.files[0];
  if (!file) {
    console.error("No file selected");
    return;
  }

  // Create a URL for the file and set it as the source of the audio element
  audioElement.src = URL.createObjectURL(file);
  // play the audio
  audioElement.play().catch((error) => {
    console.error("Error playing audio:", error);
  });

  // audio processing
  // 1. Create an AudioContext
  // 2. create audio source from the audio element inside the AudioContext (audio, oscillator, etc.)
  // 3. create audio effects (analyser such as reverb, biquad filter, panner, compressor, etc.)
  // 4. connect the audio source to the analyser and then to the destination (speakers)

  // Create an AudioContext
  const audioContext = new AudioContext();

  // Create an audio source from the audio element
  const audioSource = audioContext.createMediaElementSource(audioElement);

  // Create an analyser node
  const analyser = audioContext.createAnalyser();

  // connect the audio source to the analyser and then to the destination (speakers)
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);

  // Set up the analyser properties (for example, FFT size determines the frequency resolution or count of sound bars)
  // 512 is a common size, can be adjusted for more or less detail
  analyser.fftSize = 512;

  // how many (actual data sound bars) frequency data points to analyze (256 is half of the FFT size)
  // this will determine how many sound bars will be displayed in the UI
  // bufferDataLength is the number of frequency data points to analyze
  // It is half of the FFT size because the FFT produces a symmetric output
  const bufferDataLength = analyser.frequencyBinCount;

  // Create a buffer to hold the frequency data (Uint8Array for 256 sound bars)
  // Uint8Array is used to store the frequency data as unsigned 8-bit integers (0-255)
  // This will be used to visualize the frequency data in the UI
  const frequencyDataArray = new Uint8Array(bufferDataLength);

  // width of each sound bar in the UI
  const barWidth = canvasElement.width / bufferDataLength;
  let x = 0;

  // Function to update the frequency data
  const drawAndAnimateSoundBars = () => {
    // Clear the canvas before drawing
    x = 0;
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    // Get the frequency data from the analyser
    analyser.getByteFrequencyData(frequencyDataArray);
    // map the frequency data to the UI
    frequencyDataArray.forEach((dataValue) => {
      // Calculate the height of each sound bar based on the frequency data value
      //   const barHeight = (dataValue / 255) * canvasElement.height;
      const barHeight = dataValue;

      // Draw the sound bar on the canvas
      canvasContext.fillStyle = `rgb(${dataValue + 100}, 50, 50)`; // Color based on data value
      canvasContext.fillRect(
        x,
        canvasElement.height - barHeight,
        barWidth,
        barHeight
      );
      //  Move to the next bar position
      x += barWidth;
    });
    // Draw a line at the bottom of the canvas
    canvasContext.fillStyle = "black"; // Set the color for the bottom line
    canvasContext.fillRect(0, canvasElement.height - 1, canvasElement.width, 1);

    // call the drawAndAnimateSoundBars function again for the next frame
    // This creates a smooth animation effect

    if (!audioElement.paused && !audioElement.ended) {
      // If the audio is playing, continue animating
      requestAnimationFrame(drawAndAnimateSoundBars);
    }
  };

  drawAndAnimateSoundBars();
  // This function draws the sound bars and animates them based on the frequency data

  // create an animation loop to continuously update the sound bars
  //   const animate = () => {
  //     drawAndAnimateSoundBars();
  //     requestAnimationFrame(animate); // Call animate again for the next frame
  //   };
  //   // Start the animation loop
  //   animate();
  // Uncomment the following line to update the sound bars at a fixed interval
  // This is an alternative to using requestAnimationFrame, but it's less efficient

  //   setInterval(() => {
  //     drawAndAnimateSoundBars();
  //   }, 1000 / 60); // 60 FPS
});
