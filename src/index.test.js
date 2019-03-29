import api, { onStateChange, speak, states } from "./index";

const willCatch = doomedFunc => {
  try {
    doomedFunc();
  } catch (error) {
    return error;
  }
};

// describe("SpeechSynthisis", () => {
//   describe("thre is only one instance of SpeechSynthesis", () => {});
// });

// describe("onStateChange", () => {
//   afterEach(() => {
//     api.handler.__clearAll();
//   });
//   describe("takes a function that will be called when state changes", () => {
//     test("will not fail if a function is passed in", () => {
//       const handler = jest.fn();
//       const expected = onStateChange(handler);
//       const actual = expect.any(Function);
//       expect(actual).toEqual(expected);
//     });
//     test("will throw if nothing is passed in", () => {
//       const expected = willCatch(onStateChange());
//       const actual = TypeError;
//       expect(actual).toBeInstanceOf(expected);
//     });
//     test("will throw if anything but a function is passed in", () => {
//       const expected = willCatch(onStateChange([]));
//       const actual = TypeError;
//       expect(actual).toBeInstanceOf(expected);
//     });
//   });
//   describe("returns a function that you can call to remove the passed in `changeHandler`.", () => {
//     test("will return a function", () => {
//       const handler = jest.fn();
//       const expected = onStateChange(handler);
//       const actual = Function;
//       expect(actual).toBeInstanceOf(expected);
//     });
//     test("function will remove only the associated handler", () => {
//       const handler1 = jest.fn();
//       handler1.id = 1;
//       const handler2 = jest.fn();
//       handler2.id = 2;
//       const remove1 = onStateChange(handler1);
//       const remove2 = onStateChange(handler2);
//       remove1();

//       const expected =
//         api.handlers.every(hs => hs.id !== handler1.id) &&
//         api.handlers.some(hs => hs.id === handler2.id);
//       const actual = true;
//       expect(actual).toEqual(expected);
//     });
//   });
//   describe("you can add any number of `changeHandlers`", () => {
//     test("function will remove only the associated handler", () => {
//       const handler1 = jest.fn();
//       const handler2 = jest.fn();
//       const handler3 = jest.fn();

//       const expected = api.handlers.size === 2;
//       const actual = true;
//       expect(actual).toEqual(expected);
//     });
//   });
// });

// describe("speak", () => {
//   describe("takes in at least a block of text", () => {
//     test("will throw if nothing is passed in", () => {
//       const expected = willCatch(speak());
//       const actual = TypeError;
//       expect(actual).toBeInstanceOf(expected);
//     });
//   });
//   describe("can take in an utterance configuration object", () => {
//     test("will throw the second param is not an object", () => {
//       const expected = willCatch(speak("", ""));
//       const actual = TypeError;
//       expect(actual).toBeInstanceOf(expected);
//     });
//   });
// });

// describe("intergration tests", () => {
//   let changeResult;
//   beforeEach(() => {
//     api.onStateChange(v => (changeResult = v));
//   });
//   afterEach(() => {
//     api.handler.__clearAll();
//     changeResult = undefined;
//   });
//   describe("onStateChange", () => {
//     describe("all `changeHandlers` will be called in the order they were added", () => {});
//     describe("removing a `changeHandler` will not affect the call order", () => {});

//     describe("changeHandler callbacks", () => {
//       describe("will recive the current state", () => {
//         const handler1 = v => v;
//       });
//     });
//   });

//   describe("speak", () => {
//     describe("will trigger a processing event", () => {
//       test("", async () => {
//         speak("text");
//         const expected = await getChangeResult();
//         const actual = states.processing;
//         expect(actual).toEqual(expected);
//       });
//     });
//   });

//   describe("configure", () => {
//     describe("takes in utterance configuration object", () => {});
//     describe("sets the configuration for future utterances", () => {});
//     describe("sets the configuration for the current utterances", () => {});
//   });

//   describe("resume", () => {
//     describe("will only trigger a start event if the current state is paused", () => {});
//   });

//   describe("pause", () => {
//     describe("will only trigger a pause event if the current state is playing", () => {});
//   });

//   describe("cancel", () => {
//     describe("will trigger a pause event if the current state is playing", () => {});
//     describe("will trigger a pause event if the current state is paused", () => {});
//     describe("will trigger a pause event if the current state is processing", () => {});
//   });
// });
