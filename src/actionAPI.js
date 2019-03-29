import { polyfill } from "console.ident";
import handleStateChange from "./handleStateChange";
polyfill();

const defaultConfig = {
  voice: "Alex",
  rate: 1,
  volume: 1
};

let config = defaultConfig;

const synth = window.speechSynthesis;

export function speak(
  text,
  { voice = config.voice, rate = config.rate, volume = config.volume }
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
