import { Row, Col } from 'antd';
import React, { PureComponent } from 'react';
import styles from './index.css';
import { connect } from 'dva';
import UserCenter from "../../../components/UserCenter";
import Search from "../../../components/Search";
class RightHeader extends PureComponent {

  render() {
    const { userInfo, message, notification } = this.props;
    console.log("props in header", this.props);
    return (
      <div  className={styles.right_header}>
        <Search  />
        <UserCenter className={styles.action} userInfo={userInfo} />

      </div>

    );
  }
}


export default connect(({ global: { userInfo, message, notification } }) => {
  return {
    userInfo,
    message,
    notification
  };
})(RightHeader);