import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { Table, Pagination, Popconfirm, Button } from 'antd';

import styles from './index.css';
import CreateUser from './components/CreateUser';
/**
 * 1、connect和dispatch要配合使用，否则无法获取props
 * 2、初始化(直接)请求的数据：model中的subscriptions
 * 3、传入多个参数：https://blog.csdn.net/qq_33323469/article/details/88951347
 */

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // render: (text, record) => <Link to={`/sys/users/${record.id}`}>{text}</Link>,
      render:(text,record)=><Link to={{pathname:'/sys/users/detail',query:{
        id: record.id,
        text:text
      }}}>{text}</Link>
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
      
        <span className={styles.operation}>
          <CreateUser selfRecord={record} onOk={editHandler.bind(null, record.id)}>
            <a href="/">Edit</a>
          </CreateUser>
          <Popconfirm title="Confirm to delete?" okText='拖出去斩了'
						  cancelText='容朕再想想'  onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="/">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  
  ];
  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }
  function deleteHandler(id) {
    // 调用models users 内remove方法
    dispatch({
      type: 'users/removeuser',
      payload: id,
    });
  }
  // function pageChangeHandler(page) {
  //   dispatch({
  //     type: 'users/fetch',
  //     payload: { page },
  //   });
  // }
  function createHandler(values) {
    console.log("onOk in parent");
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }
  return (

    <div className={styles.children}>
      <div className={styles.create}>
        <CreateUser
          selfRecord={{}}
          onOk={createHandler}
        >
          <Button type="primary">Create User</Button>
        </CreateUser>
      </div>
      <Table
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        rowKey={record => record.id}
        pagination={{ pageSize: 3, showTotal: total => `总共${total}条` }}
      />
      {/* <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={10}
        onChange={pageChangeHandler}
      /> */}
    </div>




  );
}
function mapStateToProps(state) {
  const { list, total, page } = state.users;
  console.log("list:",list);
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
  };
}
export default connect(mapStateToProps)(Users);