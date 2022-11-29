import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import cls from 'classnames';
import Button from '@components/Button';
import { ExclamationCircleOutline, BellOutline } from 'antd-mobile-icons';
import clickEvent from '@utils/clickEvent';
import { getOrderInfo, OrderInfoResponse } from '@/apis/index';
import { useSearchParams } from 'react-router-dom';
import { replaceTemplate } from '@/utils/index';

interface OutpatientCardProps {
  dataMap: Partial<COMMON.MedicalInformation>;
  config: OutpatientCardConfig;
}
const OutpatientCard: React.FC<OutpatientCardProps> = ({ dataMap, config }) => {
  const { typeCode, header, content, footer, reminder, color = 'primary' } = config;
  const [queueInfo, setQueueInfo] = useState<OrderInfoResponse>();
  const [time, setTime] = useState(false);
  const [timer, setTimer] = useState(false);
  const [searchParams] = useSearchParams();
  const corpId: string = searchParams.get('corpId') || '';
  const hospCode: string = searchParams.get('hospCode') || '';
  useEffect(() => {
    getOrderInfo({
      regId: dataMap?.regId,
      deptCode: dataMap?.deptCode,
      patientName: dataMap?.name,
      patientId: dataMap?.patientId,
      corpId,
      hospitalId: corpId,
      hospCode,
    })
      .then(res => {
        setQueueInfo(res.data[0]);
      })
      .catch(err => console.log(err));
  }, []);
  const getCurrentOrderInfo = (isHandle?: boolean) => {
    if (!timer) {
      setTimer(true);
      setTimeout(() => setTime(true), 10000);
    }
    if (time || !isHandle) {
      setTime(false);
      setTimer(false);
      getOrderInfo({
        regId: dataMap?.regId,
        deptCode: dataMap?.deptCode,
        patientName: dataMap?.name,
        patientId: dataMap?.patientId,
        corpId,
        hospitalId: corpId,
        hospCode,
      })
        .then(res => {
          setQueueInfo(res.data[0]);
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <div className={cls(styles.card, [styles[color]])}>
      <div className={cls(styles.header, [styles[color]], { [styles.queuing]: +typeCode === 2 })}>
        {+typeCode === 2 && (
          <>
            <span>
              <BellOutline />
            </span>
            <span>正在叫号</span>
          </>
        )}
        {+typeCode === 2 ? (
          header.map(x => (
            <span key={x.field} style={JSON.parse(x.style || '{}')}>
              {x?.fieldDesc ? x.fieldDesc?.replace('[]', dataMap[x.field] || '') : dataMap[x.field]}
            </span>
          ))
        ) : (
          <span>{reminder}</span>
        )}
      </div>
      <div className={styles.center}>
        <div className={styles.title}>
          {+typeCode !== 5 ? (
            content?.title?.map(x => (
              <span key={x.field} style={JSON.parse(x.style || '{}')}>
                {/* 可能会多一些定语 */}
                {x?.fieldDesc
                  ? x.fieldDesc.includes('[]')
                    ? x.fieldDesc?.replace('[]', dataMap[x.field] || '')
                    : x.fieldDesc + dataMap[x.field]
                  : dataMap[x.field]}
              </span>
            ))
          ) : (
            <span style={{ color: '#c2c2c4' }}>已停诊</span>
          )}
        </div>
        {+typeCode === 2 && (
          <div className={styles.notice}>
            <ExclamationCircleOutline style={{ marginRight: 4 }} />
            <span>{reminder}</span>
          </div>
        )}
        {+typeCode !== 5 ? (
          <ul className={styles.subtitleList}>
            {content?.subtitle?.map(x => (
              <li key={x.field} style={JSON.parse(x.style || '{}')}>
                {/* 字段描述 */}
                <div className={styles.left}>{x.fieldDesc}</div>
                {/* 值 */}
                <div className={styles.right}>{dataMap[x.field]}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.suspend}>{reminder}</div>
        )}

        {+typeCode === 1 ? (
          <div className={styles.queueDetail}>
            <div className={styles.current}>
              <div className={styles.desc}>当前叫号</div>
              <div className={styles.currentWait}>
                <span className={styles.font}>{queueInfo?.currentOrderNo || 0}</span>
                <span className={styles.ball}>号</span>
              </div>
            </div>
            <div className={styles.icon} />
            <div className={styles.all}>
              <div className={styles.desc}>需等待</div>
              <div>
                <span className={styles.font}>{queueInfo?.waitNum || 0}</span>
                <span className={cls(styles.font, styles.sprit)}>/</span>
                <span className={styles.ball}>人</span>
                <div className={styles.refresh} onClick={() => getCurrentOrderInfo(true)}>
                  刷新
                </div>
              </div>
            </div>
          </div>
        ) : (
          !!footer?.length && (
            <div className={styles.buttons}>
              {(footer as Array<CONFIG.ButtonFooter>)?.map(x =>
                x.clickEvent ? (
                  //event
                  <Button
                    key={x.text}
                    type={x.color}
                    onClick={() => clickEvent[x.clickEvent](dataMap)}
                  >
                    {x.text}
                  </Button>
                ) : (
                  //link
                  <Button
                    key={x.text}
                    type={x.color}
                    href={replaceTemplate(dataMap, x.href)}
                    target={x.target}
                  >
                    {x.text}
                  </Button>
                )
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OutpatientCard;
