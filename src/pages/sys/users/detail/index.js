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
    console.log("detail", this.props.location);
    const { query } = this.props.location;

    console.log("params:", query);
    console.log("id:", query.id);
    console.log("text:", query.text);

    return (
      <div className={styles.right_main_content}>

        <p>用户详情：</p>
        <p>id={query.id}</p>
        <p>name={query.text}</p>
        <p>根据获取到的id再次查询，来获取用户详细信息</p>
        <p>传入多个参数，<a href='https://blog.csdn.net/qq_33323469/article/details/88951347'  target="_blank">参考文档</a></p>

      </div>
    );
  }
}
export default Index;