import { Row, Col, Card } from 'antd';
import { useSelector } from 'react-redux';
import { LineChartOutlined, UserOutlined, ShopOutlined, FileDoneOutlined } from '@ant-design/icons';
import styles from './index.less';
import Chart1 from './components/Chart1';
import Chart2 from './components/Chart2';
import Chart3 from './components/Chart3';
import Chart4 from './components/Chart4';
import ChartCenter from './components/MapChart';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Row gutter={[{ xs: 8, sm: 16, md: 24 }, 16]}>
        <Col span={18}>
          <div className={styles.item}>
            <p style={{ fontSize: 21, color: '#758aee' }}>Hangzhou Ma</p>
            <p style={{ fontSize: 15 }}>
              开源等于互助；开源需要大家一起来支持，支持的方式有很多种，比如使用、推荐、写教程、保护生态、贡献代码、回答问题、分享经验、打赏赞助等；欢迎您加入我们！
            </p>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.item} />
        </Col>
        <Col span={6}>
          <div className={styles.item}>
            <div className={styles.name}>会员注册量</div>
            <div className={styles.data}>
              <div>
                <LineChartOutlined className={styles.icon} /> 5,456
              </div>
              <div className={styles.percent}>+14%</div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.item}>
            <div className={styles.name}>文件上传量</div>
            <div className={styles.data}>
              <div>
                <FileDoneOutlined className={styles.icon} /> 9,458
              </div>
              <div className={styles.percent}>+37%</div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.item}>
            <div className={styles.name}>店铺数量</div>
            <div className={styles.data}>
              <div>
                <ShopOutlined className={styles.icon} /> 1,130
              </div>
              <div className={styles.percent}>+16%</div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.item}>
            <div className={styles.name}>会员总数</div>
            <div className={styles.data}>
              <div>
                <UserOutlined className={styles.icon} /> 35,412
              </div>
              <div className={styles.percent}>+33%</div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <Card title="环形图">
            <Chart3 />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="热力图">
            <ChartCenter />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="词云">
            <Chart4 />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="折线图">
            <Chart1 />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="柱状图">
            <Chart2 />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
