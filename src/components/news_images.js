import React, {Component, PropTypes} from 'react';

import axios from 'axios'

import {Link} from 'react-router'

import {Card} from 'antd'


export default class NewsImages extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        width: PropTypes.string.isRequired,
        imageWidth: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props)

        this.state = {
            newsArr: []
        }
    }

    componentWillMount() {
        let {type, count} = this.props;
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

    render() {
        let {title , width, imageWidth} = this.props;
        let {newsArr} = this.state;

        let newsList = newsArr.length > 0
            ? (
                newsArr.map((news, index) => {
                    return (

                        <div key={index} className="newsImagesContainer">
                            <Link to={`/detail/${news.uniquekey}`}>
                                <div>
                                    <img style={{width:imageWidth}} src={news.thumbnail_pic_s} alt=""/>
                                </div>
                                <div style={{width:imageWidth}}>
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
            <Card style={{width , marginTop:'20px'}} title={title} className="topNewsList">
                {newsList}
            </Card>
        )

    }
}