import { SET_GLOBAL_STATE } from '../types'
export const setGlobalState = (state) => (dispatch, getState) => {
  console.log(`setGlobalState invoked with ${JSON.stringify(state)}`)
  try {
    dispatch({
      type: SET_GLOBAL_STATE,
      payload: {
        ...state,
        message: `Update client ${// TODO remove if not used
          getState().ourReducer.client
        } to ${state} `
      }
    })
  } catch (error) {
    console.log('Error', error)
  }
}
