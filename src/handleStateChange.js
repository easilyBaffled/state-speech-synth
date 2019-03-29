import { changeHandlers } from "./onStateChange";

export const IDLE = Symbol("idle"),
  PROCESSING = Symbol("processing"),
  PLAYING = Symbol("playing"),
  PAUSED = Symbol("paused");

const states = {
  [IDLE]: {
    process: PROCESSING
  },
  [PROCESSING]: {
    start: PLAYING,
    cancel: IDLE,
    pause: PAUSED
  },
  [PLAYING]: {
    end: IDLE,
    cancel: IDLE,
    pause: PAUSED
  },
  [PAUSED]: {
    cancel: IDLE,
    resume: PLAYING
  }
};

let currentState = IDLE;

export default function handleStateChange(event) {
  const previousState = currentState;
  const validTransition =
    states[previousState] && states[previousState][event.type];
  if (validTransition) currentState = states[previousState][event.type];

  Object.values(changeHandlers).forEach(handler =>
    handler(currentState, event.type, event, validTransition)
  );

}
