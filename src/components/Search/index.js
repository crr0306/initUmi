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
   userInfo :从global中的state获取，而第一次请求是从第一次加载layout
 */
const { Option } = AutoComplete;

class HeaderSearch extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            initStatus: 0,
            searchData: [],
            searchMode: true,
            value: '',
            // dataSource:["aa","ab","bc"],
            // arr:[]  
        };
    }
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

    handleSearch(value) {
        console.log("输入", value);
        const { flattenMenuData } = this.props;
        const dataSource = flattenMenuData.filter(item => item.title.indexOf(value) > -1);
        this.setState({
            searchData: dataSource,
        });

    }
    //点击选择或者回车选择
    onSelect(value) {
        console.log("选择：");

        const { dispatch } = this.props;
        console.log("state:",this.state);
        const { searchData } = this.state;
      
        const res = searchEqual(value, this.state.searchData);
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
    onChange = value => {
        console.log("onchange:", value);
    };

    //点击输入框触发
    enterSearchMode = () => {
        this.setState({ searchMode: true }, () => {
            const { searchMode } = this.state;
            console.log("searchMode:", searchMode);
            if (searchMode) {
                this.input.focus();
            }
        });
    };
    onKeyDown = e => {
        console.log("onkeydown:", onkeydown);
        if (e.key === 'Enter') {
            this.debouncePressEnter();
        }
    };
    debouncePressEnter() {

        const { value } = this.state;
        console.log('enter：', value)
    }
    render() {
        console.log("props  in search:", this.props);
        const { searchData, value } = this.state;
        console.log("searchData:", searchData);


        return (
            <span onClick={this.enterSearchMode}>
                <Icon type="search" key="Icon" />
                <AutoComplete
                    id="auto-complete"
                    dataSource={searchData.map((item) => {
                        const { title, key, link, ...restState } = item;
                        if (key === undefined || link === undefined || title === undefined) {
                            console.error('The key or link is not defined:', item)
                        }
                        return (
                            <Option
                                key={key}
                                value={key}
                                text={title}
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
                  
                    onSelect={value=>{this.onSelect(value)}}
                    // onChange={this.onChange}
                    onSearch={value => {
                        this.handleSearch(value);
                    }}
                    placeholder="input here"
                    optionLabelProp="text"
                // filterOption={
                //     (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                //   }

                >
                    <Input

                        ref={node => {
                            this.input = node;
                        }}
                        onKeyDown={this.onKeyDown}

                    />
                </AutoComplete>
            </span>
        );
    }
}
function mapStateToProps({ menu: { flattenMenuData } }) {
    return {
        flattenMenuData
    };
}
export default connect(mapStateToProps)((HeaderSearch));