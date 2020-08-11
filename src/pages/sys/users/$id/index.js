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


  render() {
    console.log("detail", this.props.match);
    const { params } = this.props.match;

    console.log("params:", params);
    console.log("id:", params.id);

    return (
      <div className={styles.right_main_content}>

        <p>用户详情:{params.id}</p>

      </div>
    );
  }
}
export default Index;