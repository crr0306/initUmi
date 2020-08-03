import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { Table, Pagination, Popconfirm, Button } from 'antd';

import styles from './index.css';
import UserModal from './components/Modal';
/**
 * connect和dispatch要配合使用，否则无法获取props
 */

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <Link to={`/sys/users/${text}`}>{text}</Link>,
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    }, 
  
    // {
    //   title: 'Operation',
    //   dataIndex: 'operation',
    //   key: 'operation',
    //   render: (text, record) => (
    //     <span className={styles.operation}>
    //       <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
    //         <a href="/">Edit</a>
    //       </UserModal>
    //       <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
    //         <a href="/">Delete</a>
    //       </Popconfirm>
    //     </span>
    //   ),
    // },
  ];

  function pageChangeHandler(page) {
    dispatch({
      type: 'users/fetch',
      payload: { page },
    });
  }
  let paginatinProp={
    
  };
  return (
    <div>
       <Table
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        rowKey={record => record.id}
        pagination={{pageSize:3,showTotal:total=>`总共${total}条`}}
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
  return {
    list,
    total,
    page,
    loading: state.loading.models.users,
  };
}
export default connect(mapStateToProps)(Users);