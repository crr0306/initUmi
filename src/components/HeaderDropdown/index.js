import React, { PureComponent } from 'react';
// import { formatMessage } from 'umi/locale';
import { Menu, Icon, Spin, Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.css';
/*
   
 */
 export default   class HeaderDropdown extends PureComponent{
    render(){
        console.log("props in headerDropDown :",this.props);
       const {overlayClassName,...props}=this.props;
       return(
       <Dropdown overlayClassName={classNames(styles.container,overlayClassName)} {...props}></Dropdown>
       );
    }
}