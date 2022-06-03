import axios from 'axios';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_RESET,
} from '../constans';

export const loginFunc = (login, password) => async (dispatch) => {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    axios.post(
      '/api/user/login',
      { login, password },
      config
    ).then(data => {
      if(data && data.data){
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data));
    autoLogout(data.data.token);
  }else{
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: { status: 500, message: "Application error" }
  })}
  }).catch(error => {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : error,
    })})
}

const autoLogout = (token) => {
    if (!token) {
        logout();
    }

    const tokenDetails = new Date(
      new Date().getTime() + token.expiresIn * 1000,
  );
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
      logout();
    }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
}

export const register = (firstName, lastName, login,password, phoneContact, emailContact, profilePhoto) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/user/create',
      { firstName,lastName, login,password, phoneContact, emailContact, profilePhoto },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

