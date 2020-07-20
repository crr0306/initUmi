import styles from './index.css';
import { Component } from 'react';
import { Layout } from 'antd';
import MyFooter from './Footer';
const {
  Footer, Content,
} = Layout;
class loginLayout extends Component{
  render(){
    const {children} =this.props;
    return(
        <Layout className='login-container'>
          <p>登录页面布局</p>
          <Content className='login-content'>{children}</Content>
          <Footer>
            <MyFooter/>
          </Footer>
        </Layout>
    );
  }
}
export default loginLayout;