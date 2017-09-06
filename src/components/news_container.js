import React , {Component} from 'react'

import {
    Carousel,
    Row,
    Col,
    Tabs
} from 'antd'

import NewsImages from './news_images'
import NewsBlock from './news_block'
import NewsProducts from './news_products'

//引入图片
import img01 from '../images/carousel_1.jpg'
import img02 from '../images/carousel_2.jpg'
import img03 from '../images/carousel_3.jpg'
import img04 from '../images/carousel_4.jpg'

const TabPane = Tabs.TabPane;

export default class NewsContainer extends Component{
    render(){
        return (
           <div className="containerTop">
               <Row>
                   <Col span={1}></Col>
                   <Col span={22}>
                           {/*轮播图*/}
                           <div className="leftContainer1">

                               <Carousel autoplay>
                                   <div><img src={img01} alt=""/></div>
                                   <div><img src={img02} alt=""/></div>
                                   <div><img src={img03} alt=""/></div>
                                   <div><img src={img04} alt=""/></div>
                               </Carousel>

                               {/*左侧新闻区*/}

                               <NewsImages title="国际头条" type='guoji' count={6} width="100%" imageWidth="110px"/>

                           </div>

                           {/*中间新闻区*/}

                           <Tabs className='tab_news'>
                               <TabPane tab="头条新闻" key="1">
                                   <NewsBlock type="top" count={20}/>
                               </TabPane>

                               <TabPane tab="国际新闻" key="2">
                                   <NewsBlock type="guoji" count={20}/>
                               </TabPane>
                           </Tabs>

                       <Tabs className="tab_product">
                           <TabPane tab="news产品" key="1">
                               <NewsProducts />
                           </TabPane>
                       </Tabs>

                       {/*底部新闻区*/}
                       <div>
                           <NewsImages type="guonei" count={8} title="国内新闻" width="100%" imageWidth="130px"/>
                           <NewsImages type="yule" count={16} title="娱乐新闻" width="100%" imageWidth="130px"/>
                       </div>
                   </Col>
                   <Col span={1}></Col>
               </Row>
           </div>
        )
    }
}