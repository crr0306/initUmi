import { Row, Col } from 'antd';
import logo from "../../../assets/logo.png";
import React, { PureComponent } from 'react';
import styles from './index.css';
class Logo extends PureComponent{

  render(){
    
  
    return(
      <div className={styles.header}> 
      
              <p>右边标题信息1</p>
              <p>右边标题信息2</p>
     
      </div>
    
    );
  }
}
export default Logo;