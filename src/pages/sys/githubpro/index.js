import styles from './index.css';
import { PureComponent } from 'react';

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
 
  render() {
    return (
      <div className={styles.right_main_content}>
      
       <p>默认页面</p>
        
      </div>
    );
  }
}
export default Index;