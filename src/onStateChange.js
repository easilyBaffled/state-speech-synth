export let changeHandlers = {};

const chr4 = () =>
  Math.random()
      .toString(16)
      .slice(-4);

/**
 * Generates a sufficiently random string.
 * Each of the resulting strings need to be unique so they can be used as keys in an object without clashing or overwriting.
 * @returns {string}
 */
const generateHandlerKey = () =>
    `${Date.now()}-${chr4()}${chr4()}`;


/**
 * Adds a new `changeHandler` function to the `changeHandlers` object.
 * Returns a function that will remove the `changeHandler` from the object.
 * @param {function(): *} changeHandler
 * @returns {function(): boolean}
 */
export default function onStateChange(changeHandler) {
  const key = generateHandlerKey();
  changeHandlers[key] = changeHandler;

  return () => delete changeHandlers[key];
}
