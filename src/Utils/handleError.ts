import Toast from 'Utils/Toast';
import store from 'redux/store';
import { loginFail } from 'redux/actions';

export const handleError = <E>(error: E | any): E => {
  if (!error.response) {
    //NOTE:this will also happen if server request fails
    // error.toJSON()
    Toast({
      msg: 'Connection timeout. Please Refresh',
      type: 'error',
      notify: true,
    });
    return error;
  }

  if (error.response.status === 403) {
    Toast({
      msg: error.response.data,
      type: 'error',
      notify: true,
    });
    return error;
  }

  if (error.response.status === 401) {
    store.dispatch(loginFail());
    return error;
  }

  if (error.response.status > 400 && error.response.status <= 500) {
    Toast({
      msg: error.response.statusText,
      type: 'error',
    });
    return error;
  }

  if (typeof error.response.data === 'string') {
    Toast({
      msg: error.response.data,
      type: 'error',
      notify: true,
    });
    return error;
  }

  if (error.response.data.errors) {
    try {
      const obj = Object.keys(error.response.data.errors)[0];
      const err = error.response.data.errors[obj][0];
      if (err) {
        Toast({
          msg: (obj.split('.')[1] ?? obj) + '=>' + err.split('. Path')[0],
          type: 'error',
          notify: true,
        });
      }
      return error;
    } catch (error) {
      Toast({
        msg: 'Could not get error message',
        type: 'error',
        notify: true,
      });
      return error;
    }
  }
  return error;
};
