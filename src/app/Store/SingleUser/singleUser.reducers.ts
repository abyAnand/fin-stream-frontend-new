import { updateUserSuccess } from './../Users/user.action';
import { SingleUserStateInterface } from "../types/SingleUserState.interface";
import { UserDto } from '../../core/models/user/UserDto.model';
import { createReducer, on } from "@ngrx/store";
import * as UserActions from './singleUser.action';

export const initialState: SingleUserStateInterface = {
  isLoading: false,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    employmentStatus: null,
    monthlyIncome: null,
    totalAssets: null,
    totalLiabilities: null,
    accountList: null
  },
  error: null
};

export const singleUserReducer = createReducer(
  initialState,

  // get all users
  on(UserActions.getSingleUser, (state) =>({
    ...state,
    isLoading: true
  })),
  on(UserActions.getSingleUserSuccess, (state, action) =>({
    ...state,
    isLoading: false,
    user: action.user
  })),
  on(UserActions.getSingleUserFailure, (state, action) =>({
    ...state,
    isLoading: false,
    error: action.error
  })),


  //update user


  on(UserActions.updateSingleUser, (state) =>({
    ...state,
    isLoading: true
  })),

  on(UserActions.updateSingleUserSuccess, (state, action) =>({
    ...state,
    isLoading: false,
    user: action.user
  })),

  on(UserActions.updateSingleUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),

  )
