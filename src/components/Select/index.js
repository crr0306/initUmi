import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select } from 'antd';
import { Link } from 'umi';
import styles from './index.css';
import {  Icon,  } from 'antd';
import classNames from 'classnames';
import { routerRedux } from 'dva/router';
import { searchEqual } from './_';
/*
https://blog.csdn.net/youyou_LIN/article/details/79673026
 */
const { Option } = Select;


class TestSelect extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            initStatus: 0,
            searchData: [],
            searchMode:false,
            value: '',
            style: {display:"none"},
        };
        this.onBlur=this.onBlur.bind(this);
    }
    //动态更新searchData
    static getDerivedStateFromProps(nextProps, prevState) {
        const { flattenMenuData } = nextProps;
        const { initStatus } = prevState;
        if (Array.isArray(flattenMenuData) && flattenMenuData.length > 0 && initStatus === 0) {
            return {
                searchData: flattenMenuData,
                initStatus: 1
            };
        }
        return prevState;
    }

    filterOption(input, option) {
        console.log("filterOption");
        return (
            option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
        );
    }
    onBlur() {
        console.log('blur');
        this.setState({
            searchMode: false,
            style: { display: "none", }
        });
         
    }

   


    //点击选择或者回车选择：
    onSelect = value => {
       
        console.log("onSelect,value:", value);

        const { dispatch } = this.props;
        
        const { searchData } = this.state;
   
        const res = searchEqual(value, searchData);
        const { link, key, query, ...rest } = res;
        if (link) {
            dispatch(routerRedux.push({
                pathname: link,
                query: { ...query, key: link.indexOf("frame") > -1 ? key : undefined },
                state: {
                    key,
                    ...rest,
                },
            }));
        }
        
        
    }
    //显示的值
    onChange = value => {
        console.log("onchange之前的值，value:", value, ";initvalue:", this.state.value);
        //setState不执行
        this.setState({
            value: value,
        });
        console.log("onchange之后的值，value:", this.state.value);
    };


   
  //点击输入框会触发:展开和获取焦点，如果不获取焦点，则无法失去焦点
  enterSearchMode = () => {
    console.log("点击输入框触发：展开和获取焦点");
    this.setState({ 
        searchMode: true ,
        style: { background:"red" }
    },
        
        () => {
            const { searchMode } = this.state;
            if (searchMode) {
                this.select.focus();//获取焦点
            }
        }
     );
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
        console.log("searchMode in render", this.state.searchMode);
        const { searchData, value, searchMode } = this.state;
        const { className } = this.props;
        const inputClass = classNames(styles.select, {
            [styles.show]: searchMode,
        });
        console.log("inputClass:",inputClass);
        return (
            <span className={(className, styles.headerSearch)} onClick={this.enterSearchMode} >
                 <Icon type="search" key="Icon" />
                <Select
                    showSearch
                  
                    
                    // mode="tags"
                    className={inputClass}
                    ref={node=>this.select=node}
                    showSearch={true}//是否能输入
                    placeholder="站内搜索2"
                    optionFilterProp="children"
                    //选择或者回车触发
                    onSelect={value => { this.onSelect(value) }}
                    // onBlur={this.leaveSearchMode}
                    onBlur={this.onBlur}
                    style={this.state.style}

                >
                      {/* <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option> */}
                    {searchData.map(
                        (item) => {
                            const { title, key, link, ...restState } = item;
                            if (key === undefined || link === undefined || title === undefined) {
                                console.error('The key or link is not defined:', item)
                            }
                            return (
                                <Option value={key}
                                >
                                    <Link style={{ display: "block" }}
                                        to={{
                                            pathname: link,
                                            query: { key: link.indexOf("frame") > -1 ? key : undefined },
                                            state: { key, ...restState }
                                        }}>
                                        <span>{title}</span>
                                    </Link>

                                </Option>
                            );
                        })}
                </Select>
            </span>

        );
    }
}
function mapStateToProps({ menu: { flattenMenuData } }) {
    return {
        flattenMenuData
    };
}
export default connect(mapStateToProps)((TestSelect));