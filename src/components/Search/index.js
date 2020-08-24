import React, { PureComponent } from 'react';
import memoizeOne from 'memoize-one';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Icon, AutoComplete } from 'antd';
import { Link } from 'umi';
import classNames from 'classnames';

import { routerRedux } from 'dva/router';
import { searchEqual } from './_';
import styles from './index.css';

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
            searchMode: false,
            value: '',

        };
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



    //根据输入参数来匹配，更新动态数据源
    handleSearch(value) {
        console.log("输入", value);
        const { flattenMenuData } = this.props;
        const dataSource = flattenMenuData.filter(item => item.title.indexOf(value) > -1);
        this.setState({
            searchData: dataSource,
        });
        console.log("重新render");

    }
    //点击或者回车下拉条触发
    onSelect(value) {
        console.log("onSelect,value:", value);

        const { dispatch } = this.props;
        console.log("state:", this.state);
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
        console.log("选择之后会重新渲染,this.state.value:",this.state.value);

    }


    //点击输入框会触发
    enterSearchMode = () => {
        console.log("点击输入框触发：展开和获取焦点");
        this.setState({ searchMode: true }, () => {
            const { searchMode } = this.state;
            console.log("searchMode:", searchMode);
            if (searchMode) {
                this.input.focus();//获取焦点
            }
        });
    };
    leaveSearchMode = () => {
        console.log("鼠标离开输入框");
        this.setState({
            searchMode: false,
            value: '',
        });
    };
    onChange = value => {
        console.log("onchange");
        this.setState({
            searchMode: false,
            value: value,
        });
        console.log("onchange，this.state.value:",this.state.value);
       
    };

    render() {
        console.log("props  in search:", this.props);
        const {className} =this.props;
        const { searchData, value,searchMode } = this.state;
        console.log("className:", className);

        const inputClass = classNames(styles.input, {
            [styles.show]: searchMode,
        });
        return (
            <span onClick={this.enterSearchMode} className={(className, styles.headerSearch)}>
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
                    value={value}
                    className={inputClass}
                    onSelect={value => { this.onSelect(value) }}
                   
                    onSearch={value => {
                        this.handleSearch(value);
                    }}
                    onChange={this.onChange}
                
                    optionLabelProp="text"

                >
                    <Input
                        placeholder="站内搜索"
                        ref={node => {
                            this.input = node;
                        }}
                        onBlur={this.leaveSearchMode}


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