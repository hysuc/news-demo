import React , {Component} from 'react'

import {Link} from 'react-router';

import axios from 'axios';

import logo from '../images/logo.png'

import {
    Row,//行
    Col,//列
    Menu,//菜单
    Icon,//图标
    Button,//按钮
    Modal,//模态框
    Tabs,//页签
    Form,//表单
    Input,//文本框
    Checkbox,//多选框
    Tooltip,
    message
} from 'antd'

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class NewsHerder extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectKey:'top',
            username:null,
            userId:null,
            modalShow:false
        }
    }

    componentWillMount(){
        let user = JSON.parse(localStorage.getItem('user_Key'));
         if(user){
             this.setState({
                 username:user.username,
                 userId:user.userId
             })
         }
    }

    //切换菜单的回掉函数
    handleClick = (event) => {
        this.setState({
            selectKey:event.key
        });

        //判断点击的是否是注册按钮
         if(event.key === 'register'){
              this.setState({
                  modalShow:true
              })
         }
    };

    handleClose = () => {
        this.setState({
            modalShow:false
        })
        this.props.form.resetFields();
    };

    handleSubmit = (isRegister , event) => {
        event.preventDefault();
        let url = 'http://newsapi.gugujiankong.com/Handler.ashx?';
        const action = isRegister ? 'register' : 'login';
        url += `action=${action}`;

        const formData = this.props.form.getFieldsValue();

         if(isRegister){//注册
              const {r_username , newPassword , confirm , nickname} = formData;
              url += `&r_username=${r_username}&newPassword=${newPassword}&confirm=${confirm}&nickname=${nickname}`
         }else {//登录
             const {username , password} = formData;
             url += `&username=${username}&password=${password}`
         }

         //2.发送ajax请求
        axios.get(url)
            .then(response => {
                const data = response.data;
                 if(isRegister){
                       if(data === true){
                           message.success('恭喜你！注册成功')
                       }else {
                            message.error('对不起！注册失败')
                       }
                 }else{
                      if(!data){
                           message.error('登录失败')
                      }else{
                          message.success('登录成功！');
                          this.setState({
                              username:data.NickUserName,
                              userId:data.UserId,
                              modalShow:false
                          });

                          let {username , userId} = this.state;
                          localStorage.setItem('user_Key' , JSON.stringify({username , userId}))
                      }
                 }
            })
    };

    handleOut = () => {
        this.setState({
            username:null
        });

        localStorage.removeItem('user_Key')
    };

    render(){
        const {selectKey , username , modalShow} = this.state;

        const formItemLayout = {
            labelCol:{
                xs:{span:24},
                sm:{span:6}
            },
            wrapperCol:{
                xs:{span:24},
                sm:{span:14}
            }
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        const userInfo = username

        ? (
            <MenuItem key="logout" className="register">
                <Button type="primary">{username}</Button>&nbsp;&nbsp;
                <Link to="/userCenter"><Button type="Ghost">个人中心</Button></Link>&nbsp;&nbsp;
                <Button onClick={this.handleOut}>退出</Button>
            </MenuItem>

            )
        : (
            <MenuItem key="register" className="register">
                <Icon type="appstore-o" />登录/注册
            </MenuItem>

            );
        const {getFieldDecorator} = this.props.form;
        return (
            <herder>
                <Row>
                    <Col span={1}/>
                    <Col span={3}>
                        <a href="/" className="logo">
                            <img src={logo} alt="logo"/>
                            <span>Today News</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <div>

                            {/*导航菜单*/}
                            <Menu
                                onClick={this.handleClick}
                                selectedKeys={[selectKey]}
                                mode="horizontal"
                            >
                                <MenuItem key="top">
                                    <Icon type="appstore"/><Link to={`/newsList/top/50/${"头条新闻"}`}>头条</Link>
                                </MenuItem>
                                <MenuItem key="shehui">
                                    <Icon type="appstore"/><Link to={`/newsList/shehui/50/${"社会新闻"}`}>社会</Link>
                                </MenuItem>
                                <MenuItem key="guonei">
                                    <Icon type="appstore"/><Link to={`/newsList/guonei/50/${"国内新闻"}`}>国内</Link>
                                </MenuItem>
                                <MenuItem key="guoji">
                                    <Icon type="appstore"/><Link to={`/newsList/guoji/50/${"国际新闻"}`}>国际</Link>
                                </MenuItem>
                                <MenuItem key="yule">
                                    <Icon type="appstore"/><Link to={`/newsList/yule/50/${"娱乐新闻"}`}>娱乐</Link>
                                </MenuItem>
                                <MenuItem key="tiyu">
                                    <Icon type="appstore"/><Link to={`/newsList/tiyu/50/${"体育新闻"}`}>体育</Link>
                                </MenuItem>
                                <MenuItem key="keji">
                                    <Icon type="appstore"/><Link to={`/newsList/keji/50/${"科技新闻"}`}>科技</Link>
                                </MenuItem>
                                <MenuItem key="shishang">
                                    <Icon type="appstore"/><Link to={`/newsList/shishang/50/${"时尚新闻"}`}>时尚</Link>
                                </MenuItem>
                                {userInfo}
                            </Menu>

                            {/*模态框*/}
                            <Modal title="用户中心"
                                visible={modalShow}
                                onOk={this.handleClose}
                                onCancel={this.handleClose}
                                okText="关闭">

                                <Tabs type="card" onChange={() => this.props.form.resetFields()}>
                                   <TabPane tab="登录" key="1">
                                       {/*登录表单*/}
                                       <Form onSubmit={this.handleSubmit.bind(this , false)} className="form-login">
                                           {/*用户名*/}
                                           <FormItem>
                                               {
                                                   getFieldDecorator('username')
                                                   (
                                                       <Input prefix={<Icon type="user" style={{fontSize:13}} />} placeholder="Username" />
                                                   )
                                               }
                                           </FormItem>
                                           {/*密码*/}
                                           <FormItem>
                                               {
                                                   getFieldDecorator('password')
                                                   (
                                                       <Input prefix={<Icon type="lock" style={{fontSize:13}} />} type="password" placeholder="Password" />
                                                   )
                                               }
                                           </FormItem>
                                           {/*记住密码*/}
                                           <FormItem>
                                               {
                                                   getFieldDecorator('remember' , {
                                                       valuePropName:'checked',
                                                       initialValue:false
                                                   })
                                                   (
                                                       <Checkbox>记住密码</Checkbox>
                                                   )
                                               }
                                               <Button type="primary" htmlType="submit" className='login-form-button'>登录</Button>

                                           </FormItem>

                                       </Form>

                                   </TabPane>


                                    <TabPane tab="注册" key="2">
                                        {/*注册表单*/}
                                        <Form onSubmit={this.handleSubmit.bind(this ,true)}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="Username"
                                                hasFeedback
                                            >
                                                {
                                                    getFieldDecorator('r_username')(
                                                        <Input />
                                                    )
                                                }

                                            </FormItem>

                                            <FormItem
                                                {...formItemLayout}
                                                label="Password"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('newPassword')(
                                                    <Input type="password" />
                                                )}
                                            </FormItem>

                                            <FormItem
                                                {...formItemLayout}
                                                label="Confirm Password"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('confirm')(
                                                    <Input type="password" onBlur={this.handleConfirmBlur} />
                                                )}
                                            </FormItem>

                                            <FormItem
                                                {...formItemLayout}
                                                label={(
                                                    <span>
                                                    Nickname&nbsp;
                                                        <Tooltip title="What do you want other to call you?">

                                                        <Icon type="question-circle-o" />

                                                      </Tooltip>

                                                    </span>
                                                )}
                                                hasFeedback
                                            >
                                                {getFieldDecorator('nickname')(
                                                    <Input />
                                                )}
                                            </FormItem>

                                            <FormItem {...tailFormItemLayout}>
                                                <Button type="primary" htmlType="submit" size="large">注册</Button>
                                            </FormItem>


                                        </Form>

                                    </TabPane>
                                </Tabs>

                            </Modal>
                        </div>
                    </Col>
                    <Col span={1}/>
                </Row>
            </herder>
        )
    }
}
export default  Form.create()(NewsHerder)