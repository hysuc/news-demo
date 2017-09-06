import React, {Component, PropTypes} from 'react';

import axios from 'axios'

import {Link} from 'react-router'

import {
    Card,
    Row,
    Col

} from 'antd'


export default class NewsLists extends Component {
    static propTypes = {
        type: PropTypes.string,
        count: PropTypes.number,
        title: PropTypes.string
    };

    constructor(props) {
        super(props)

        this.state = {
            newsArr: []
        }
    }

    componentWillMount(){

        let {type, count , title} = this.props.params;

        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response => {
                let newsArr = response.data;
                this.setState({newsArr})
            })
            .catch(error => {
                console.log(error)
            })
    }
    componentWillReceiveProps(){
        this.componentWillMount()
    }


    render() {
        let {newsArr} = this.state;
        let {title} = this.props.params

        let newsList = newsArr.length > 0
            ? (
                newsArr.map((news, index) => {
                    return (

                        <div key={index} className="newsImagesContainer">
                            <Link to={`/detail/${news.uniquekey}`}>
                                <div>
                                    <img style={{width:"142px"}} src={news.thumbnail_pic_s} alt=""/>
                                </div>
                                <div style={{width:"142px"}}>
                                    <h3>{news.title}</h3>
                                    <p>{news.author_name}</p>
                                </div>
                            </Link>
                        </div>
                    )

                })
            )
            : '暂时没有新闻'
        return (
            <Row>
                <Col span={1}/>
                <Col span={22}>
                    <Card style={{width: "100%", marginTop:'20px'}} title={title} className="topNewsList">
                        {newsList}
                    </Card>
                </Col>
                <Col span={1}/>
            </Row>

        )

    }
}