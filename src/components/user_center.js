import React , {Component} from 'react';

import axios from 'axios'

import {
    Card,
    Tabs,
    Row,
    Col,
    Upload,
    Icon,
    Modal
} from 'antd'
const TabPane = Tabs.TabPane;

export default class UserCenter extends Component{
    constructor(props){
        super(props);
        this.state = {
            comments:[],
            collections:[],
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]
        }
    }
    componentWillMount(){
        const {userId} = JSON.parse(localStorage.getItem('user_Key'))
        //获取评论列表
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(url)
            .then(response => {
                const comments = response.data
                this.setState({comments})
            });


        //获取收藏列表
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(url)
            .then(response => {
                const collections = response.data
                this.setState({collections})
            })
    }

    // 显示预览窗口
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    // 更新列表
    handleChange = ({ fileList }) => {
        this.setState({ fileList })
    }

    // 关闭预览窗口
    handleCancel = () => {
        this.setState({ previewVisible: false })
    }
    render(){
        const {collections , comments} = this.state;
        let commentList = comments.length === 0
        ?'暂时没有任何评论'
        :comments.map((comment , index) => {
                const {datetime , uniquekey , Comments} = comment;
                return (
                    <Card key={index} title={`于${datetime}评论新闻${uniquekey}`} extra={<a href={`#/detail/${uniquekey}`}>查看</a>}>
                        <p>{Comments}</p>
                    </Card>
                )
            });

         let collectionList = collections.length === 0
        ?"没有任何收藏"
        :collections.map((collection , index) => {
            const {uniquekey , Title} = collection;
                 return (
                     <Card key={index} title={uniquekey} extra={<a href={`#/detail/${uniquekey}`}>查看</a>}>
                        <p>{Title}</p>
                     </Card>
                 )
        });

        const { previewVisible, previewImage, fileList } = this.state
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <Row>
                <Col span={1}/>
                <Col span={22}>
                    <Tabs>
                        <TabPane key="1" tab="历史评论">
                            {commentList}
                        </TabPane>
                        <TabPane key="2" tab="新闻收藏">
                            {collectionList}
                        </TabPane>
                        <TabPane key="3" tab="头像设置">
                            <div className="clearfix">
                                <Upload
                                    action="http://jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}>
                                    {uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={1}/>
            </Row>

        )
    }
}