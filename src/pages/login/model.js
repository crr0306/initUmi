import * as api from './service';
import { notification } from 'antd';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'login',
  state: {
    isError: false
  },
  effects: {
    *login({ payload: payload }, { call, put, select }) {
      console.log("login in model");
      console.log("payload",payload);
      const { password, ...rest } = payload;
      const { status } = yield call(api.login, { password, ...rest });
      if (status === 0) {
        sessionStorage.setItem("isLogin", true);
        //登录成功后跳转页面
        yield put(routerRedux.push('/sys'));
      }
      //yield call(doSomethingFunc, parameter);
      //const data = yield select(state => state.data);
      //yield put({ type: 'fetch', payload: { page } });

    },
  },
}
