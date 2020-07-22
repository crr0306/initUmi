import styles from './index.css';
import { PureComponent } from 'react';
import logo from '../../assets/logo.png';
import Login from './components/Login';
import { message, Row, Col } from 'antd';
import { connect } from 'dva';
/**
 * connect和dispatch要配合使用，否则无法获取props
 */
@connect(
  ({ login }) => ({
    ...login,
  })
)
class Index extends PureComponent {
  componentDidMount() {
    const { location: { query = {} } } = this.props;
    if (query.status === '1') {
      message.warning("用户未登录");
    }
  }
  handleSubmit=(err,values)=>{
    console.log("values:",values);
    for(const name in values){
      if(values[name]===undefined){
        message.error("用户或者密码错误");
      }
    }
    this.props.dispatch({
      type:"login/login",
      payload:{
        ...values,
      },
    });
  };
  render() {
    return (
      <div className={styles.login_content}>
        <Row >
          <Col span={24} className={styles.login_logo}>
            <img alt='logo' src={logo}></img>
          </Col>
        </Row>
        <h2 className={styles.login_title}>大头系统</h2>
        <Login onSubmit={this.handleSubmit}></Login>
      </div>
    );
  }
}
export default Index;