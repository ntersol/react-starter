import { SET_CLIENT_STATE } from '../types'
export const setClientState = (clientState) => (dispatch, getState) => {
  try {
    console.log(`setClientState invoked with ${JSON.stringify(clientState)}`)
    dispatch({
      type: SET_CLIENT_STATE,
      payload: {
        clientState,
        message: `Update client ${// TODO remove if not used
          getState().nameReducer.client
        } to ${clientState} `
      }
    })
  } catch (error) {
    console.log('Error', error)
  }
}
