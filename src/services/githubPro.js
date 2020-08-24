import  request  from '../utils/request';
import getStarHistory from '../utils/getStarHistory';
//获取账户信息api
export const getAccountInfo = async function ({ account }) {
    console.log("account:",account);
    return await request(`https://api.github.com/users/${account}`);

};

export const getData = async function ({ url }) {
    return await request(url);
}
//获取历史stars趋势图数据
export const getReposStargazers = async function (payload) {
    const { gitname } = payload;
    if (!gitname) {
        throw new Error("getReposStargazers：gitname参数为空");
    }
    return await getStarHistory(gitname)
        .catch(err => {
            console.log(err);
        });;
};