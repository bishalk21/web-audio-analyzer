const inputElement = document.getElementById("audioFileInput");
const audioElement = document.getElementById("audio");

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
});
