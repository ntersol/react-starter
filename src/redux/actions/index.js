import { SET_GLOBAL_STATE } from '../types'
export const setGlobalState = (clientState) => (dispatch, getState) => {
  console.log(`setGlobalState invoked with ${JSON.stringify(clientState)}`)
  try {
    dispatch({
      type: SET_GLOBAL_STATE,
      payload: {
        clientState,
        message: `Update client ${// TODO remove if not used
          getState().ourReducer.client
        } to ${clientState} `
      }
    })
  } catch (error) {
    console.log('Error', error)
  }
}
