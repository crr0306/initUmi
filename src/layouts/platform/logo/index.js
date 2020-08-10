import { Row, Col } from 'antd';
import logo from "../../../assets/logo.png";
import React, { PureComponent } from 'react';
import { sysName } from '../../../../conf/platform.config';
import styles from './index.css';
class Logo extends PureComponent {

  render() {
    const imgLogo = <img src={logo} alt="logo" style={{ height: '44px' }} />;
    const { children } = this.props;
    return (
      <Row>
        <Col span={7}>
          {imgLogo}
        </Col>
        <Col span={17} >
          <h2 className={styles.animation} style={{ height: '44px', lineHeight: '44px', fontSize: '20px', color: '#efefef' }}>
            {sysName}
          </h2>
        </Col>
      </Row>
    );
  }
}
export default Logo;