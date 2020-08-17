import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select } from 'antd';

/*
    问题1：点击能跳转
 问题2：回车跳转
 问题3：匹配上后自动选择
 */
const { Option } = Select;
function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }
class TestSelect extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    filterOption(input, option) {
        console.log("filterOption");
        return (
            option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
        );
    }
    onBlur() {
        console.log('blur');
    }

    onFocus() {
        console.log('focus');
    }

    handleSearch = value => {
        console.log("handleSearch:", value);
        this.setState({
            value: value,
        });

        console.log("handleSearch:", this.state.value);
    }
    //点击选择或者回车选择
    onSelect = value => {
        console.log("选择：", value);
        this.setState({
            value: value,
        });
        console.log("选择之后：", this.state.value);
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
        console.log("value in render", this.state.value);
        const value = this.state.value;

        return (
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                // onChange={ onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                // filterOption={(input, option) =>{
                //     console.log("option:",option);
                //     return( option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0);
                   
                // }
                   
                // }
            >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
            </Select>
        );
    }
}
function mapStateToProps({ menu: { flattenMenuData } }) {
    return {
        flattenMenuData
    };
}
export default connect(mapStateToProps)((TestSelect));