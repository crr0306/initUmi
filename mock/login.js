const Mock = require('mockjs');//eslint-disable-line
//路径格式：全路径
export default {
    'POST /login1': (req, res) => {
        console.log("login in mock");
        const { body } = req;

        console.log("body:",body);
        const { password, username } = body;
 
        if (password === 'admin' && username === 'admin') {
            res.status(200).json({
                data: {
                    alertDesc: '登录成功！'
                },
                status: 0
            });
        } else {
            res.status(200).json({
                data: {
                    alertDesc: '账号或密码错误！'
                },
                status: -1
            });
        }
    },
};