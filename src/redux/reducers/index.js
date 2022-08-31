import { SET_CLIENT_STATE } from '../types'
const INITIAL_STATE = {
  clientState: { key: 'fred', type: 'splash' } // type can be 'splash' or 'gallery'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CLIENT_STATE:
    return {
      ...state,
      ...action.payload
    }
  default:
    return INITIAL_STATE
  }
}
