import "./styles.css";
import { polyfill } from "console.ident";
import { PAUSED, PLAYING, PROCESSING, IDLE } from "./handleStateChange";
import { speak, pause, resume, cancel, configure } from "./actionAPI";
import onStateChange, { changeHandlers } from "./onStateChange";
export { speak, pause, resume, cancel, configure, onStateChange };

polyfill();
console.clear();
console.log(speechSynthesis);
console.log(changeHandlers);

document.addEventListener("click", () => {
  console.log("clicked");
  console.log(changeHandlers);
  setTimeout(() => {
    speechSynthesis.cancel();
  }, 250);
  setTimeout(() => {
    speak(text, { rate: 2 });
  }, 500);
});

var time;
var stepCount = 0;
onStateChange((currentState, eventType, event, validTransition) => {
  console.log(
    { currentState, eventType, event, validTransition },
    new Date().toTimeString().match(/\d\d:\d\d:\d\d/)[0]
  );
  var a = {
    [PROCESSING]: () => "",
    [PLAYING]: () => {
      stepCount += 1;
      if (stepCount === 1) setTimeout(pause, 1000);
      else setTimeout(cancel, 1000);
    },
    [PAUSED]: () => setTimeout(resume, 1000),
    [IDLE]: () => stepCount === 2 && speak(text, { rate: 2 })
  }[currentState]();
});

/*
  At { rate: 2 } the text takes ~24ms to process and ~7060ms to do a full readthrough 
*/

const text = `you never forget a place like Morrowind. It’s like something out of a dream, only you’ve actually been there. Maybe you used a mouse and keyboard, or the Xbox “Duke” controller, to visit it. But that doesn’t make it any less real.`;

// setTimeout(() => {
//   speechSynthesis.pause();
// }, 2000);
// setTimeout(() => {
//   speechSynthesis.resume();
// }, 4000);
// setTimeout(() => {
//   speechSynthesis.cancel();
// }, 6000);

/*
 * This function is called when the app's state updates.
 * The results are set in the DOM.
 * It then sits and waits for the next change in state, which may never come
 * It can take in an event and emit the results, all in one function.
 * The data is pushed to it via the props.
 *
 * Event handlers are set once and can't have data pushed to it.
 * The event emittet won't have context to push to the handler other than the event itself.
 */
/*
const AudibleWeb = ({ currentState, api, ...props }) => {
  const icons = {
    [IDLE]: <Idle/>,
    [PLAYING]: <Playing>,
    [PAUSED]: <Paused>
  };
  const playActions = {
    [IDLE]: () => api.play(props.text, props.settings),
    [PLAYING]: api.pause,
    [PAUSED]: api.play
  };
  return (
    <div>
      <div>{ }
      <input onChange={this.setText} value={props.text} />
      <Key.x onActive={playActions[currentState]} />
      <Key.z onActive={api.cancel} />
    </div>
  );
};

const Key = new Proxy(() => '', {
  get(_, name) {
    return ({ onActive }) => (
      <div onKeyDown={event => event.key === name && onActive(event)} />
    );
  }
});
*/

// setTimeout(() => {
//   console.log(speechSynthesis);
//   speechSynthesis.pause();
//   console.log(speechSynthesis);
//   console.log(utterance);
//   utterance.rate = 1;
//   console.log(speechSynthesis);
//   speechSynthesis.resume();
//   console.log(speechSynthesis);
// }, 4000);

/*xState/statechart version */
const Machine = v => v;
const lightMachine = Machine({
  id: "audio",
  initial: "idle",
  states: {
    idle: {
      on: {
        play: "processing"
      }
    },
    processing: {
      on: {
        start: "playing",
        cancel: "idle",
        pause: "paused"
      }
    },
    playing: {
      on: {
        cancel: "idle",
        pause: "paused"
      }
    },
    paused: {
      on: {
        cancel: "idle",
        resume: "playing"
      }
    }
  }
});
