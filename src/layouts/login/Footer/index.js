import { Layout ,Icon} from 'antd';
import React, { Fragment } from 'react';
import GlobalFooter from '../../components/GlobalFooter';
const {  Footer} = Layout;
const LoginFooterLayout = () => (
  <Footer style={{ padding: 0 }}>
      <GlobalFooter
            links={[
              {
                key: 'UmiJS 首页',
                title: 'UmiJS 首页',
                href: 'https://umijs.org/zh/',
                blankTarget: true,
              },
              {
                key: 'github',
                title: <Icon type="github" />,
                href: 'https://github.com/mpw0311/antd-umi-sys',
                blankTarget: true,
              },
              {
                key: 'Ant Design',
                title: 'Ant Design',
                href: 'https://ant.design',
                blankTarget: true,
              },
            ]}
          copyright={
              <Fragment>
                  Copyright <Icon type="copyright" /> chengranran
              </Fragment>
          }
      />
  </Footer>
);
export default LoginFooterLayout;