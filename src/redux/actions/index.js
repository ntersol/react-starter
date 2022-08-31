import { SET_GLOBAL_STATE } from '../types'
export const setGlobalState = (state) => (dispatch, getState) => {
  try {
    dispatch({
      type: SET_GLOBAL_STATE,
      payload: {
        ...state
      }
    })
  } catch (error) {
    console.log('Error', error)
  }
}
