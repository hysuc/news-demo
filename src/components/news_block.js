import React , {Component , PropTypes} from 'react';

import axios from 'axios'

import {Card} from 'antd'
import {Link} from 'react-router'

export default class NewsBlock extends Component{
    static propTypes = {

    };
    constructor(props){
        super(props)
        this.state = {
            newsArr:[]
        }
    }
    componentWillMount(){
        const {type , count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`

        axios.get(url)
            .then(response => {
                const data = response.data;

                this.setState({
                    newsArr:data
                })
            })
    }

    render(){
        const {newsArr} = this.state;
        const newsList = newsArr.length > 0
        ? (
            <ul>
                {
                    newsArr.map((news , index) => {
                        const {title , uniquekey} = news;
                        return (
                            <li key={index}>
                                <Link to={`/detail/${uniquekey}`}>{title}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
        :'没有任何新闻';
        return (
            <Card className="topNewsList">
                {newsList}
            </Card>
        )
    }
}
