import React, { PureComponent } from 'react';
import memoizeOne from 'memoize-one';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Icon, AutoComplete } from 'antd';
import { Link } from 'umi';
import classNames from 'classnames';
import styles from './index.css';
import { routerRedux } from 'dva/router';
import { searchEqual } from './_';

/*
    问题1：点击能跳转
 问题2：回车跳转
 问题3：匹配上后自动选择
 */
const { Option } = AutoComplete;
 
class TestSearch extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [ 
                { title: 'a', year: 1994 },
                { title: 'b', year: 1972 },
                { title: 'c', year: 1974 },
                { title: 'd', year: 2008 },
                { title: 'e', year: 1957 },],
            value:"init",
   
        };
    }

    filterOption(input, option) {
        console.log("filterOption");
        return (
            option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
        );
    }

    handleSearch=value=> {
        console.log("handleSearch:", value);
        this.setState({
            value: value,
        });

        console.log("handleSearch:",this.state.value);
    }
    //点击选择或者回车选择
    onSelect=value=> {
        console.log("选择：",value);
        this.setState({
            value: value,
        });
        console.log("选择之后：",this.state.value);
    }
    //显示的值
    onChange = value => {
        console.log("onchange之前的值，value:",value,";initvalue:",this.state.value);
        //setState不执行
        this.setState({
            value: value,
        });
        console.log("onchange之后的值，value:",this.state.value);
    };
    leaveSearchMode = () => {
        console.log("鼠标离开输入框");
        this.setState({
            value: 'recover',
        });
    };

    //点击输入框时触发
    enterSearchMode = () => {
        console.log("enterSearchMode:");
        this.input.focus();
    };
    // onKeyDown = e => {
    //     console.log("onkeydown:", onkeydown);
    //     if (e.key === 'Enter') {
    //         this.debouncePressEnter();
    //     }
    // };
    // debouncePressEnter() {

    //     const { value } = this.state;
    //     console.log('enter：', value)
    // }
    render() {
        console.log("props  in search:", this.props);
        console.log("value in render",this.state.value);
        const value=this.state.value;

        return (
            <span>
                <Icon type="search" key="Icon" />
                <AutoComplete
                    id="auto-complete"
                    dataSource={this.state.dataSource.map((option) =>{
                        console.log("option:",option);
                        return (option.title);
                        
                    } )}
                    style={{
                        width: 200,
                      }}
                     
                    placeholder="try to type `b`"
                  
                  
                    onChange={this.onChange}
                    //输入框显示内容
                    value={value}
                    onSelect={value=>{
                        this.onSelect(value);
                    }}
                    onSearch={value=>{ this.handleSearch(value); }                    
                    }
                    
                   
                   
                    // 自动匹配
                    filterOption={
                        (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }

                />
                  {/* <Input
                        placeholder="test search"
                        ref={node => {
                            this.input = node;
                        }}
                        // onKeyDown={this.onKeyDown}
                        onBlur={this.leaveSearchMode}
                    /> */}
              
            </span>
        );
    }
}
function mapStateToProps({ menu: { flattenMenuData } }) {
    return {
        flattenMenuData
    };
}
export default connect(mapStateToProps)((TestSearch));