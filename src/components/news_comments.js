import React , {Component , PropTypes} from 'react';
import axios from 'axios'
import {
    Card,
    Form,
    Button,
    Input,
    notification,
    message,
    Row,
    Col
} from 'antd'

const FormItem = Form.Item;

class NewsComments extends Component{
    static propTypes = {
        uniquekey:PropTypes.string.isRequired
    }
    constructor(props){
        super(props)
        this.state = {
            comments : []
        }
    }
    componentWillMount(){
        const {uniquekey} = this.props;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const comments = response.data
                this.setState({comments})
            })
            .catch(error => {
                console.log(error)
            })
    }
    componentWillReceiveProps(){

        this.componentWillMount()
    }

    //提交评论
    submitComment = (event) => {
        event.preventDefault();
        //获取新闻id
        const {uniquekey} = this.props;
        //检查是否登录，如果没有，提示登录
        const userId = JSON.parse(localStorage.getItem('user_Key') || "[]").userId;
         if(!userId){
              message.warn('请先登录');
             return;
         }
         //获取文本内容
        const content = this.props.form.getFieldValue("content");
          if(!content){
               message.warn('请输入评论内容')
              return;
          }
        const url =  `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${content}`
        //发送ajax请求
        axios.get(url)
            .then(response => {
                message.success('评论提交成功!');
                this.props.form.resetFields();
                this.componentWillMount();
            })
            .catch(error => {
                console.log(error)
            });
    };

    //收藏文章
    collectArticle = () => {

        const userId = JSON.parse(localStorage.getItem('user_Key') || "[]").userId;

        if(!userId){
            message.warning('请先登录');
            return;
        }
        const {uniquekey} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                notification.success({
                    message:'收藏成功！',
                    description:''
                });
            })
            .catch(error => {
                console.log(error)
            })
    };

    render(){
        const {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length === 0
        ?"没有任何评论"
        :comments.map((comment , index) => {
            const {UserName , datetime , Comments} = comment;
            return (
                <Card key={index} title={UserName} extra={`发布与${datetime}`} style={{marginBottom:"8px"}}>
                    <p>{Comments}</p>
                </Card>
            )
        });
        return (
            <div>
                {commentList}
                <Form onSubmit={this.submitComment}>
                    <FormItem label='您的评论' labelCol={{span:12}}>
                        {
                            getFieldDecorator('content')(
                                <Input type="textarea" placeholder="随便写点什么" />
                            )
                        }
                    </FormItem>
                    <Row>
                        <Col span={5} push={10}>
                            <Button type='primary' htmlType='submit'>提交评论</Button>&nbsp;&nbsp;
                            <Button type='primary' onClick={this.collectArticle}>收藏文章</Button>
                        </Col>
                    </Row>

                </Form>
            </div>
        )
    }
}
export default Form.create()(NewsComments)