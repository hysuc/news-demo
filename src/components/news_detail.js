import React , {Component} from 'react';

import {
    Row,
    Col,
    BackTop
} from 'antd'

import axios from 'axios'

import NewsImages from './news_images'
import NewsComment from './news_comments'

export default class NewsDetail extends Component{
    constructor(props){
        super(props)
        //初始化状态
        this.state = {
            news:{}
        }
    }

    componentWillMount(){
        const {uniqueKey} = this.props.params;
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`
        axios.get(url)
            .then(response => {
                const news = response.data

                //更新状态
                this.setState({news})
            })
    }

    //实时获取最新的新闻
    componentWillReceiveProps(newProps){

        this.componentWillMount();

    }

    render(){
        const {pagecontent} = this.state.news
        const {uniqueKey} = this.props.params
        return (
            <div>
                <Row>
                    <Col span={1}/>
                    <Col span={16}>
                        <div dangerouslySetInnerHTML={{__html:pagecontent}}></div>
                        <hr/>
                        <NewsComment uniquekey={uniqueKey}/>
                    </Col>
                    <Col span={6}>
                        <NewsImages type="top" count={20} title="相关新闻" width="100%" imageWidth="132px"/>
                    </Col>
                    <Col span={1}/>
                </Row>
                <BackTop/>
            </div>

        )
    }
}