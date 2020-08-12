import styles from './index.css';
import { Component } from 'react';
import { Layout } from 'antd';
import Logo from './logo';
import Menus from './menus';
import RightHeader from './header';
import MyFoot from './footer';
import router from 'umi/router';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Media from 'react-media';

const { Header, Sider, Content } = Layout;
class PlatformLayout extends Component {
  constructor(props) {
    super(props);
    console.log("props1", props);
    this.state = {
      // 侧边栏状态
      collapsed: false,
      // 系统主题
      theme: 'light',
      // 菜单主题
      menuTheme: 'dark',
    };
  };
  componentDidMount() {
    console.log("props2", this.props);
    const { dispatch } = this.props;
    const isLogin = sessionStorage.getItem("isLogin");
    if (isLogin === 'false') {
      router.push('/login?status=1');
      return;
    }
    // 请求系统基本信息
    dispatch({
      type: 'global/getSysInfo',
    });
    dispatch({
      type: 'global/getMessage',
    });
    dispatch({
      type: 'menu/getMenuData',
    });

  }
  render() {
    const { location, menusData = [], } = this.props;
    console.log("menusData3", menusData);
    const { children } = this.props;
    return (
      <Layout className={styles.whole_container}>
        {/* 左边 */}
        <Sider className={styles.sider}>
          <Logo></Logo>
          <Menus menusData={menusData}></Menus>
        </Sider>
        {/* 右边 */}
        <Layout id="backTop" className={styles.right_content} >
          {/* 右边：头 */}
          <Header className={styles.contentHeader}>
            <RightHeader></RightHeader>
          </Header>


          <Content className={styles.mainContent}>
            <p>主要内容，显示内容是children，而children是来自layout/index.js中,它是根据不同路径转到不同的布局上</p>
            {children}
          </Content>
          <MyFoot></MyFoot>
        </Layout>

      </Layout>
    );
  }
}
function mapStateToProps({ menu, }) {
  //从model为menu中的state映射到当前组件props
  console.log("menus:", { ...menu });
  return {

    ...menu,

  };
}
export default connect(mapStateToProps)(props =>
  // 媒体查询 小于1200px 判断为mobile
  <Media query="(max-width: 1200px)">
    {isMobile => <PlatformLayout {...props} isMobile={isMobile} />}
  </Media>
);
PlatformLayout.propTypes = {
  children: PropTypes.element.isRequired,
  //用户信息
  userInfo: PropTypes.object,
  //菜单数据
  menusData: PropTypes.arrayOf(PropTypes.object),
  //有路由权限菜单一维数组
  flattenMenuData: PropTypes.arrayOf(PropTypes.object),
  //无路由权限菜单一维数组
  diffMenuData: PropTypes.arrayOf(PropTypes.object),
};