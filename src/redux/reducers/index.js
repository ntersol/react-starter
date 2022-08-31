import { SET_GLOBAL_STATE } from '../types'
const INITIAL_STATE = {
  ourValue: 'fred'
}

export default (state = INITIAL_STATE, action) => {
  console.log(`reducer called with state = ${JSON.stringify(state)}`)
  switch (action.type) {
  case SET_GLOBAL_STATE:
    return {
      ...state,
      ...action.payload
    }
  default:
    return INITIAL_STATE
  }
}
