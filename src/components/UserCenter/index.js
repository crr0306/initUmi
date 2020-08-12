import React, { PureComponent } from 'react';
// import { formatMessage } from 'umi/locale';
import { Menu, Icon, Spin } from 'antd';
import classNames from 'classnames';
import styles from './index.css';
import HeaderDropdown from '../HeaderDropdown';
/*
   userInfo :从global中的state获取，而第一次请求是从第一次加载layout
 */
export default class UserCenter extends PureComponent {
    render() {
        console.log("props in userCenter", this.props);
        const { userInfo = {}, className } = this.props;
        const { userName } = userInfo;
        const menuList = (
            <Menu>
                <Menu.Item key={'sys/user'} state={{ userName, pathtitles: ["个人中心"] }} disabled>
                    <Icon type="user"></Icon>
                    用户中心
                </Menu.Item>
                <Menu.Item key="logout" state={{ userName }}>
                <Icon type="logout" />  
                退出
            </Menu.Item>
            </Menu>
        );
        if (userName === '') {
            return "大傻子"
        }
        return userName ? (
            <HeaderDropdown overlay={menuList} placement='bottomRight'>
                <span className={classNames(styles.dropDown, className,
                    )} >
                    <Icon type="user" />{userName}
                </span>
            </HeaderDropdown>
        )
            :
            (<Spin size="small" style={{ marginLeft: 8, marginRight: 8 }}></Spin>);
    }
}