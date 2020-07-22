import styles from './index.css';
import { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';


const FormItem = Form.Item;
class Login extends PureComponent {
  handleSubmit = (e) => {
    console.log("login inside");
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields(
      { force: true },
      (errors, values) => {
        onSubmit(errors, values);
      }
    );
  }

  render() {
    const {  form  } = this.props;
    const {
      getFieldDecorator: fd,
    } = form;
    return (
      <div className={styles.lg_cp_form}>
        <Form  onSubmit={this.handleSubmit}>
          <FormItem>
            {
              fd('username', {
                initialValue: "admin",
                rules: [{
                  requires: true,
                  message: '请输入用户名字'
                }]
              })
                (
                  <Input prefix={<Icon type='user' />}
                    onChange={this.handleChange}
                    placeholder={"username"}
                  >
                  </Input>
                )
            }
          </FormItem>
          <FormItem>
            {
              fd('password', {
                initialValue: "admin",
                rules: [{
                  requires: true,
                  message: '请输入密码'
                }]
              })
                (
                  <Input prefix={<Icon type='lock' />}
                    onChange={this.handleChange}
                    placeholder={"passeord"}
                  >
                  </Input>
                )
            }
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' className={styles.lg_cp_button}>登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Login);