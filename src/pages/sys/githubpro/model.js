
/**
 * @author M
 * @email mpw0311@163.com
 * @version  1.0.0
 * @description  菜单栏model
 */
import * as api from '../../../services/menu';
import orginalData from '../../../../conf/menu.config';
import { munesFilter, flattenMenu } from '../../../utils/_';
export default {
    namespace: 'menu',
    state: {
        menusData: [],
        flattenMenuData: [],
        diffMenuData: []
    },
    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
        },
    },
    effects: {
        *getMenuData({ payload: payload }, { call, put, select }) {
            //yield call(doSomethingFunc, parameter);
            //const data = yield select(state => state.data);
            //yield put({ type: 'fetch', payload: { page } });
            let menusData = yield select(({ menu }) => menu.menusData)
            console.log("menusData", menusData);
            if (!(menusData && menusData.length > 0)) {
                const { data = [] } = yield call(api.getMenuData, {});
            
                const { menusData, diffMenuData } = munesFilter(orginalData, data, "true");
                const flattenMenuData = flattenMenu(menusData);
                yield put({
                    type: 'save',
                    payload: {
                        menusData,
                        diffMenuData,
                        flattenMenuData
                    }
                });
            }

        }

    },
    reducers: {
        //更新了state:通过connect传到当前使用层
        save(state, action) {
            console.log("menusData4", { ...action.payload });
            return { ...state, ...action.payload };
        },
        clear(state) {
            return {
                ...state,
                menusData: [],
                flattenMenuData: [],
                diffMenuData: [],
            };
        }
    },
}