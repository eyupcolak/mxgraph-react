import { Modal, Form, Input, message } from "antd";
import React from "react";
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 4 },
    sm: { span: 16 }
  }
};
const CreateTaskNode = Form.create()(
  class extends React.Component {
    state = {
      taskDesc: "",
      confirmLoading: false
    };
    componentDidMount() {
      message.config({
        top: 100,
        duration: 1.5
      });
    }
    hideModal = () => {
      this.props.handleCancel();
    };
    handleConfirm = () => {
      const form = this.props.form;
      let error = false;
      form.validateFields((err, values) => {
        if (err) {
          error = true;
          return;
        }
      });
      if (error) {
        return;
      }
      const taskName = form.getFieldValue("taskName");
      const { taskDesc } = this.state;
      this.setState({
        confirmLoading: true
      });
      setTimeout(() => {
        this.setState({
          confirmLoading: false
        });
        const id = Math.ceil(Math.random() * 100);
        this.props.handleConfirm({
          type: this.props.currentTask,
          taskName,
          taskDesc,
          id
        });
      }, 1000);
    };
    handleDescChange(e) {
      this.setState({
        taskDesc: e.target.value
      });
    }
    render() {
      const form = this.props.form;
      const { getFieldDecorator } = form;
      return (
        <div>
          <Modal
            title="New node"
            visible={this.props.visible}
            onOk={this.handleConfirm}
            onCancel={this.hideModal}
            confirmLoading={this.state.confirmLoading}
            okText="confirm"
            cancelText="cancel"
            width="800px"
          >
            <Form>
              <FormItem
                label="Task type"
                layout="horizontal"
                {...formItemLayout}
              >
                <Input disabled value={this.props.currentTask} />
              </FormItem>
              <FormItem
                label="mission name"
                required
                layout="horizontal"
                {...formItemLayout}
              >
                {getFieldDecorator("taskName", {
                  rules: [{ required: true, message: "Task name must be filled in" }]
                })(<Input />)}
              </FormItem>
              <FormItem
                label="mission details"
                layout="horizontal"
                {...formItemLayout}
              >
                <TextArea
                  rows={4}
                  value={this.state.taskDesc}
                  onChange={e => this.handleDescChange(e)}
                />
              </FormItem>
            </Form>
          </Modal>
        </div>
      );
    }
  }
);

export default CreateTaskNode;
