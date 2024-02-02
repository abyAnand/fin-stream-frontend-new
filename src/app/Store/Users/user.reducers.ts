import { createReducer, on } from "@ngrx/store";
import { UserStateInterface } from "../types/UserState.interface";
import * as UserActions from './user.action';

export const initialState: UserStateInterface = {
  isLoading: false,
  users: [],
  error: null
};

export const userReducers = createReducer(
  initialState,

  // get all users
  on(UserActions.getUsers, (state) =>({
    ...state,
    isLoading: true
  })),
  on(UserActions.getUsersSuccess, (state, action) =>({
    ...state,
    isLoading: false,
    users: action.users
  })),
  on(UserActions.getUsersFailure, (state, action) =>({
    ...state,
    isLoading: false,
    error: action.error
  })),

  //create user

  on(UserActions.createUser,(state) =>({
    ...state,
    isLoading: true
  })),

  on(UserActions.createUserSuccess, (state, action) =>({
    ...state,
    isLoading:false,
    users: [...state.users, action.user]
  })),

  on(UserActions.createUserFailure, (state, action) =>({
    ...state,
    isLoading: false,
    error: action.error
  })),

  //update user


  on(UserActions.updateUser, (state) =>({
    ...state,
    isLoading: true
  })),

  on(UserActions.updateUserSuccess, (state, action) =>({
    ...state,
    isLoading: false,
    users: state.users.map((user) => (user.id === action.user.id ? action.user : user))
  })),

  on(UserActions.updateUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),


  // delete user

  on(UserActions.deleteUser, (state) => ({
    ...state,
    isLoading : true
  })),

  on(UserActions.createUserSuccess, (state, action) =>({
    ...state,
    isLoading : false,
    users: state.users.filter((user) => user.id ! == action.user.id)
  })),

  on(UserActions.deleteUserFailure, (state, action) =>({
    ...state,
    isLoading: false,
    error: action.error
  }))

  )
