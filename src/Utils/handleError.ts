import Toast from 'Utils/Toast';
import store from 'redux/store';
import { loginFail } from 'redux/actions';

export const handleError = <E>(error: E | any): E => {
  if (!error.response) {
    //NOTE:this will also happen if server request fails
    // error.toJSON()
    Toast({
      msg: 'Connection timeout. Please Refresh',
      type: 'danger',
      notify: true,
    });
    return error;
  }

  if (error.response.status === 403) {
    Toast({
      msg: error.response.data,
      type: 'danger',
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
      type: 'danger',
    });
    return error;
  }

  if (typeof error.response.data === 'string') {
    Toast({
      msg: error.response.data,
      type: 'danger-outline',
      notify: true,
    });
    return error;
  }

  if (error.response.data.errors) {
    try {
      const obj = Object.keys(error.response.data.errors)[0];
      const err = error.response.data.errors[obj][0];
      // const err2 = error.response.data.title;
      if (err) {
        // Toast({ msg: err, type: 'danger-outline', notify: true });
        Toast({
          msg: (obj.split('.')[1] ?? obj) + '=>' + err.split('. Path')[0],
          type: 'danger-outline',
          notify: true,
        });
      }
      // if (err2) {
      //   Toast({ msg: err2, type: 'danger', notify: true });
      // }
      return error;
    } catch (error) {
      Toast({
        msg: 'Could not get error message',
        type: 'danger-outline',
        notify: true,
      });
      return error;
    }
  }
  return error;
};
