import { Row, Col } from 'antd';
import logo from "../../../assets/logo.png";
import React, { PureComponent } from 'react';
import styles from './index.css';
class Logo extends PureComponent{

  render(){
    
  
    return(
      <div className={styles.header}> 
      
              <p>元素1</p>
              <p>元素2</p>
     
      </div>
    
    );
  }
}
export default Logo;