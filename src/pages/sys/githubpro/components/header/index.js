import styles from './index.css';
import { PureComponent, Fragment } from 'react';
import { Col, Row, Statistic, Card, Avatar, Divider } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import { connect } from 'dva';
import Account from './Account/index';
/**
 * connect和dispatch要配合使用，否则无法获取props
 */
const { Meta } = Card;
@connect(({ githubPro }) => {
  const { account, accountInfo } = githubPro
  return {
    account,
    accountInfo,
  };
})

class Index extends PureComponent {

  handleSubmit = ({ account }) => {
    console.log("account by submit :",account);
    
    this.props.dispatch({
        type: 'githubPro/getAccountInfo',
        payload: {
            account
        }
    });
}
  render() {
    console.log("props in header  of githubPro:", this.props);
    const { accountInfo: { login, avatar_url, name, bio, public_repos, followers, following } } = this.props;
    const title = (
      <Fragment>
        {/* eslint-disable-next-line  */}
        <a className={styles.a} href={`https://github.com/${login}`} target="_blank">{name}</a>
        <span style={{ paddingLeft: '10px', fontSize: '12px' }}>({login})</span>
      </Fragment>
    );
    const layout = {
      sm: 24,
      md: 12,
      lg: 12,
      xl: 5
    };
    return (
      <div className={styles.right_main_content_header}>
        <p>右边头</p>
        <Card>
          <Account value={login}  onSubmit={this.handleSubmit}/>
          <Divider />
          <Row>
            <Col {...layout} xl={7}>
              <Card style={{ textAlign: 'left', minHeight: 140 }}>
                <Meta
                  avatar={<Avatar size={64} src={avatar_url} />}
                  title={title}
                  description={bio}
                />
              </Card>
            </Col>
            <Col  {...layout} >
              <Card style={{ minHeight: 140 }}>
                <Statistic
                  title={formatMessage({ id: 'gitDataV.repositories' })}
                  value={public_repos}
                //   suffix={'个'}
                //   prefix={<Icon type="like" />}
                />
              </Card>
            </Col>
            <Col  {...layout} >
              <Card style={{ minHeight: 140 }}>
                <Statistic
                  title={formatMessage({ id: 'gitDataV.followers' })}
                  value={followers}
                // suffix="人"
                />
              </Card>
            </Col>
            <Col  {...layout} >
              <Card style={{ minHeight: 140 }}>
                <Statistic
                  title={formatMessage({ id: 'gitDataV.following' })}
                  value={following}
                // suffix="人"
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}
export default Index;