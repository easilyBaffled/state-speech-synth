export let changeHandlers = {};
function generateHandlerKey() {
  function chr4() {
    return Math.random()
      .toString(16)
      .slice(-4);
  }
  return `${Date.now()}-${chr4()}${chr4()}`;
}

export default function onStateChange(changeHandler) {
  const key = generateHandlerKey();
  changeHandlers[key] = changeHandler;
  return () => delete changeHandlers[key];
}
