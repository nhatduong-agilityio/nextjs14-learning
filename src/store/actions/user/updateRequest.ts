// Types
import { IUser } from '~/types/user';
import { DispatchProps } from '~/types/common';

// Constants
import { UPDATE_USER } from '~/constants/action';

/**
 * Handle request update data from action
 * @param dispatch dispatch props
 * @returns call to function update data and return response to reducer
 */
export const requestUpdateUser = (dispatch: DispatchProps<IUser>) => (data: IUser) => {
  dispatch({ type: UPDATE_USER.PENDING });

  try {
    return dispatch({ type: UPDATE_USER.SUCCESS, payload: { response: [data] } });
  } catch (error: Error | unknown) {
    return dispatch({ type: UPDATE_USER.FAILURE, payload: { error } });
  }
};
