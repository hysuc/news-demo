import React , {Component} from 'react';

import {
    Row,
    Col
} from 'antd'

export default class NewsFooter extends Component{
    render(){
        return (
            <Row>
                <Col span={24} className='newsFooter'>
                    &copy; 2017 ReactNews. All Rights Reserved
                </Col>
            </Row>
        )
    }
}