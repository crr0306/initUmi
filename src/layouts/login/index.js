import styles from './index.css';
import { Component } from 'react';
import { Layout } from 'antd';
import MyFooter from './Footer';
import {  Row, Col } from 'antd';
import logo from '../../assets/login_right.png';
const {
  Footer, Content,
} = Layout;
class loginLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <Layout className={styles.login_container}>
        <div className={styles.login_top_content}>
          
          <div className={styles.login_left_content}>
              <Content className={styles.login_content}>
                {children}
              </Content>
          </div>
          <div className={styles.login_right_content}>
            <Row >
              <Col   className={styles.login_logo}>
                <img alt='logo' src={logo}></img>
              </Col>
            </Row>
          </div>
        </div>


        <Footer>
          <MyFooter />
        </Footer>
      </Layout>
    );
  }
}
export default loginLayout;