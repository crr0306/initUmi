import React, { Component, Children } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
class UserEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showModalHandler = (e) => {
    if (e) e.preventDefault();
    this.setState({
      visible: true,
    });
  }
  hideModalHandler = () => {
    this.setState({
      visible: false,
    });
  }
  onHandler=()=>{
    const {onOk}=this.props;
    this.props.form.validateFields((err,vaules)=>{
      console.log("values:",vaules);
      if(!err){
        console.log("onOk in children");
        onOk(vaules);
        this.hideModalHandler();
      }
    });
  }
  render(){
    const { children, form, record } = this.props;
    const { getFieldDecorator } = form;
    const { name, email, website } = record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return(
      <span>
        <span onClick={this.showModalHandler}>
          {children}
        </span>
        <Modal
          title="create user"
          visible={this.state.visible}
          onOk={this.onHandler}
          onCancel={this.hideModalHandler}
        >
           <Form onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Email"
            >
              {
                getFieldDecorator('email', {
                  initialValue: email,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Website"
            >
              {
                getFieldDecorator('website', {
                  initialValue: website,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }




}
export default Form.create()(UserEditModal);
