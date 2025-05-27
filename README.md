# Web Audio Analyzer

- breaking the music or audio into chunks and using the underlying data or binary bytes to process to make the waveform of that audio (in graphical form, the audio data is represented as a waveform)
- using the Web Audio API to analyze and visualize audio data in real-time
- AudioContext, AnalyserNode, ScriptProcessorNode
- Audio Nodes
- processing audio data in real-time into samples or frames
- sampling rate, frequency domain, time domain
- effective size, byte length, sample rate

### AudioContext

- The AudioContext interface represents an audio-processing graph built from audio modules linked together, each represented by an AudioNode.
- It is the main entry point for using the Web Audio API.

  - Create an AudioContext instance (audio file, microphone input, etc.)
  - Create audio nodes (e.g., AnalyserNode, GainNode, OscillatorNode)
  - Connect the nodes together
  - Start the audio processing

- flow of audio processing: `AudioSource` -> `AudioEffects` -> `AudioDestination`

  - `AudioSource`: Represents the source of audio data (e.g., audio file, microphone input, oscillator, camera input)
  - `AudioEffects`: Represents audio processing effects (e.g., gain, filter, delay, volume, compressor)
  - `AudioDestination`: Represents the final output of the audio processing (e.g., speakers, headphones)

- nodes in AudioSource:

  - `MediaElementAudioSourceNode`: Represents an audio source from a media element (e.g., `<audio>`, `<video>`).
  - `MediaStreamAudioSourceNode`: Represents an audio source from a media stream (e.g., microphone input, webRTC, camera input).
  - `AudioBufferSourceNode`: Represents an audio source from an `AudioBuffer` (e.g., audio file loaded into memory).

- Nodes in AudioEffects:

  - `GainNode`: Represents a gain (volume) control.
  - `AnalyserNode`: Represents an audio analyzer for visualizing audio data.
  - `FilterNode`: Represents a filter for processing audio frequencies.
    - `BiquadFilterNode`: A specific type of FilterNode that allows for various filter types (e.g., low-pass, high-pass, band-pass).
  - `BiquadFilterNode`: Represents a biquad filter (e.g., low-pass, high-pass, band-pass).
  - `DelayNode`: Represents a delay effect.
  - `DynamicsCompressorNode`: Represents a dynamics compressor.

- Nodes in AudioDestination:
  - `AudioDestinationNode`: Represents the final output of the audio processing (e.g., speakers, headphones).
  - `MediaStreamAudioDestinationNode`: Represents a destination for audio data that can be used in a media stream (e.g., webRTC).
