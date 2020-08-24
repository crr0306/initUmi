import { PureComponent } from "react"
import { Card, Row, Col, List, Avatar } from 'antd';
import { connect } from 'dva'
import moment from 'moment';
import Bar from '../../../../../components/Echarts'
import { formatMessage } from 'umi-plugin-locale';
import {
  Chart,
  Axis,
  Tooltip,
  Interval,
  Geom,
  Label
} from "bizcharts";
@connect(({ githubPro, loading }) => {
  const { account, reposInfo, received_events } = githubPro;
  return {
    account,
    reposInfo,
    received_events,
    loading: loading.models.githubPro
  }
})
class Content extends PureComponent {
  //获取柱状图数据
  getChartData = () => {
    const { reposInfo } = this.props;
    const data = 
      reposInfo.map(item => {
    
        const { name, stargazers_count, forks_count } = item;
        return {
          name,
          stargazers_count,
          forks_count
        };
      })
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
    
  
    var names=new Array();
    var yData1=new Array();
    var yData2=new Array();
    for(var i = 0; i < data.length; i++){
      names.push(data[i].name);
      yData1.push(data[i].stargazers_count);
      yData2.push(data[i].forks_count);
    }
    var allData={
      names,
      yData1,
      yData2
    }
    return allData;
  }

  render() {
    console.log("props in content of git:", this.props);
    const { loading, account, received_events } = this.props;
    const allData = this.getChartData();
    console.log("allData:", allData);
    return (
      <Row>
        <Col md={24} lg={24} xl={17} >
          <Card
            title={formatMessage({ id: "gitDataV.repos.overview" })}
            style={{ marginTop: 20, height: 510 }}
          >
            <Bar data={{
        xdata: allData.names,
        ydata: {
          ydata1:allData.stargazers_count,
          ydata2:allData.forks_count,
        },
        title:'top10',
        legendData:['stargazers_count','forks_count']
      }}/>
          </Card>
        </Col>
        <Col md={24} lg={24} xl={7} >
          <Card
            title={formatMessage({ id: "gitDataV.news" })}
            /* eslint-disable-next-line */
            extra={<a href={`https://github.com/${account}`} target="_blank">{formatMessage({ id: "gitDataV.more" })}</a>}
            style={{ marginTop: 20, height: 510, overflow: 'hidden' }}
          >
            <List
              size='small'
              dataSource={received_events.slice(0, 6)}
              loading={loading}
              renderItem={item => {
                const { type, payload: { action }, actor: { login, avatar_url }, repo: { name }, created_at } = item;
                const _action = type === 'ForkEvent' ? type : action;
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={avatar_url} />}
                      /* eslint-disable-next-line */
                      title={<a href={`https://github.com/${login}`} target="_blank">{login}</a>}
                      description={`[${moment(created_at).fromNow()}] ${_action} ${name}`}
                    />
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Content;