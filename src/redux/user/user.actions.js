import { UserActionTypes } from './user.types'

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
})

export const updateCurrentUser = user => ({
  type: UserActionTypes.UPDATE_CURRENT_USER,
  payload: user,
})

export const getAllUsers = users => ({
  type: UserActionTypes.GET_ALL_USERS,
  payload: users,
})
