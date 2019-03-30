import handleStateChange, { currentState, PAUSED, PLAYING } from "./handleStateChange";

window.speechSynthesis.getVoices(); // Sometimes voices will not load right away. This is a hack to preload the voice list.
const defaultConfig = {
  voice: "Alex",
  rate: 1,
  volume: 1
};

let config = defaultConfig;

const synth = window.speechSynthesis;

//TODO: speak needs to throw when there is nothing in it
export function speak(
  text,
  { voice = config.voice, rate = config.rate, volume = config.volume } = config
) {
  const utterance = Object.assign(new SpeechSynthesisUtterance(text), {
    voice: speechSynthesis.getVoices().find(v => v.voice === voice),
    rate,
    volume,
    onerror: handleStateChange,
    onend: handleStateChange,
    onstart: handleStateChange,
    onpause: handleStateChange,
    onresume: handleStateChange
  });
  synth.speak(utterance);
  handleStateChange({ type: "process", text, config: { voice, rate, volume } });
}

export function resume() {
  synth.resume();
}

export function pause() {
  synth.pause();
}

export function cancel() {
  synth.cancel();
}

export function configure(configOptions) {
  config = { ...defaultConfig, ...config, ...configOptions };
}

export function togglePlayPause() {
  if ( currentState === PLAYING )
    synth.pause();
  else if ( currentState === PAUSED )
    synth.resume()
}
