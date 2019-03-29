
[![Greenkeeper badge](https://badges.greenkeeper.io/easilyBaffled/state-speech-synth.svg)](https://greenkeeper.io/)

> This is a reactive(?) alternative to the current SpeechSynthesis and SpeechSynthesisUtterance models
> This sits onto of the native SS and translates the sometimes inconstant state that requires constant checking into a reactive model where you can subscribe to changes with a single function.
> The new model offers to parts
> The first is a single function `onStateChange`. This is how you subscribe to the SS and it's changes.
> `onStateChange` This takes a function that will be called when the SS's state changes. It returns a function that you can call to remove the passed in `changeHandler`. You can call `onStateChange` as many times as you want to add any number of `changeHandler` to the SS. When the state changes they will each be called and in the order they were added. Removing a `changeHandler` will not alter the remaining order.
> There is only one instance of SS (because browsers can only have one sounding off at a time(?)).
>
> The second part are the functions to control the SS state. `speak`, `resume`, `pause`, `cancel`, `configure`.
> These replicate the functions available from the native SpeechSynthesis.
> The only difference between these and the native is that `speak` takes an optional second argument which will be the configuration for the SSU.
> There is also a standalone `configuraiton` function to server that purpose as well. Calling these will trigger changes to SS regardless of `changeHandler`s.
