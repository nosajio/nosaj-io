const storeIndex = {};

/**
 * Add a fresh key to storeIndex object
 * @param {string} key - the key to create the object under.
 * @param {object} initialState - the init state object.
 */
const addIndex = (key, initialState) => {
  if (key in storeIndex) {
    console.warn('Can\'t add index to store - key %s already exists', key);
    return;
  }
  storeIndex[key] = initialState;
}

/**
 * Return current state object for key
 * @param {string} key
 */
const stateForKey = key => {
  if (! (key in storeIndex)) {
    console.warn('Tried to get key that isn\'t in index (%s)', key);
    return null;
  }
  return storeIndex[key];
}

/**
 * Update a state object with a fragment of data
 * @param {string} key
 * @param {object} fragment
 */
const updateIndex = (key, fragment) => {
  storeIndex[key] = Object.assign({}, storeIndex[key], fragment);
  const changeEvent = new CustomEvent('stateChange', { detail: { key, store: storeIndex[key] }});
  document.dispatchEvent(changeEvent);
}

/**
 * Create a new store instance
 * @param {string} key
 * @param {object} initialState
 * @return {object} store
 *         {string} store.key - the key for this instance.
 *         {string} store.initialState - the original initialState object for this instance.
 *         {func}   store.update<object> - pass a fragment of state to update.
 *         {func}   store.get - get state
 */
export const store = (key, initialState) => {
  addIndex(key, initialState);
  return { 
    key,
    initialState, 
    get: () => stateForKey(key),
    update: data => updateIndex(key, data),
  }
}
