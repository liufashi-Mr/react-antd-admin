import React, { useState } from 'react';
import styles from './index.less';
import cls from 'classnames';
import Button from '../Button';
import { Popup } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import renderEvent from '@utils/renderEvent';
import clickEvent from '@utils/clickEvent';
import moment from 'moment';
import { replaceTemplate } from '@/utils/index';
/*
  预约信息卡片
*/

const ReservationsCard = ({ config, dataMap }) => {
  const {
    typeCode,
    header,
    content,
    footer = [],
    reminder,
    reminderList,
    color = 'primary',
  } = config;
  const [reserveVisible, setReserveInfoVisible] = useState(false);
  const [reminderVisible, setReminderVisible] = useState(false);

  return (
    <div className={cls(styles.card, styles[color])}>
      <div className={cls(styles.header, styles[color])}>
        {header.map(x => (
          <span key={x.field} style={JSON.parse(x.style)}>
            {x?.fieldDesc ? x.fieldDesc?.replace('[]', dataMap[x.field] || '') : dataMap[x.field]}
          </span>
        ))}
      </div>
      <div className={styles.center}>
        <div className={styles.title}>
          {content?.title
            ? content.title?.map(x => (
                <span key={x.field} style={JSON.parse(x.style)}>
                  {x.fieldDesc
                    ? // 存在描述时会将[]替换为显示的字段
                      x.fieldDesc?.replace(
                        '[]',
                        x.render
                          ? //对字段处理,在utils->renderEvent添加处理函数
                            renderEvent[x.render] && renderEvent[x.render](dataMap[x.field])
                          : //直接显示字段
                            dataMap[x.field] || ''
                      )
                    : //不存在直接显示字段
                    x.render
                    ? renderEvent[x.render] && renderEvent[x.render](dataMap[x.field])
                    : dataMap[x.field] || ''}
                </span>
              ))
            : null}
        </div>
        <ul className={styles.subtitleList}>
          {content?.subtitle?.map(x => (
            <li key={x.field} style={JSON.parse(x.style)}>
              <div className={styles.left}>{x.fieldDesc}</div>
              <div className={styles.right}>{dataMap[x.field]}</div>
            </li>
          ))}
        </ul>
        {footer?.length > 0 && (
          <div className={styles.buttons}>
            {footer?.map(x => {
              return x.clickEvent ? (
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
              );
            })}
          </div>
        )}
        {typeCode === 0 && (
          <div className={styles.reminder}>
            <div>{reminderList?.reminderName || '温馨提示'}</div>
            <div className={styles.reminderPackUp}>
              {reminderList?.headImg && (
                <div className={styles.img}>
                  <img src={reminderList?.headImg} />
                </div>
              )}
              <div className={styles.text}>
                <ul>
                  {reminderList?.list.map((x, i) => (
                    <li key={i}>
                      {x.content}
                      {i === reminderList.list.length - 1 && (
                        <div className={styles.packUpBtn} onClick={() => setReminderVisible(true)}>
                          更多...
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.detail} onClick={() => setReserveInfoVisible(true)}>
          <span>预约挂号信息</span>
          <span>
            <RightOutline />
          </span>
        </div>
      </div>
      {/* 预约信息上拉 */}
      <Popup
        visible={reserveVisible}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          minHeight: '20vh',
          maxHeight: '70vh',
          overflow: 'auto',
        }}
        bodyClassName={styles.InfoContent}
        onMaskClick={() => {
          setReserveInfoVisible(false);
        }}
      >
        <div className={styles.title}>预约挂号信息</div>
        <div className={styles.content}>
          <ul>
            {dataMap.appoNo && (
              <li className={styles.item}>
                <div className={styles.key}>就诊号：</div>
                <div className={styles.value}>{dataMap.appoNo}号</div>
              </li>
            )}
            {dataMap.deptName && (
              <li className={styles.item}>
                <div className={styles.key}>科室：</div>
                <div className={styles.value}>{dataMap.deptName}</div>
              </li>
            )}
            {dataMap.doctName && (
              <li className={styles.item}>
                <div className={styles.key}>医生：</div>
                <div className={styles.value}>{dataMap.doctName}</div>
              </li>
            )}
            {dataMap.medDate && (
              <li className={styles.item}>
                <div className={styles.key}>就诊日期：</div>
                <div className={styles.value}>
                  <span style={{ marginRight: 6 }}>
                    {moment(dataMap.medDate).format('YYYY-MM-DD')}
                  </span>
                  <span>{renderEvent.getWeek(dataMap.medDate)}</span>
                </div>
              </li>
            )}
            {dataMap.medBegtime && dataMap.medEndtime && (
              <li className={styles.item}>
                <div className={styles.key}>就诊时间：</div>
                <div className={styles.value}>
                  <span style={{ marginRight: 6 }}>
                    {dataMap.medBegtime}~{dataMap.medEndtime}
                  </span>
                  <div className={styles.timeReminder}>(时间仅供参考，以医院实际情况为准）</div>
                </div>
              </li>
            )}
            {dataMap.hospName && (
              <li className={styles.item}>
                <div className={styles.key}>医院：</div>
                <div className={styles.value}>{dataMap.hospName}</div>
              </li>
            )}
          </ul>
          {/* <div className={styles.cancelBtn}>
            <Button type="primary" href="//www.liufashi.top">
              去取消
            </Button>
          </div> */}
        </div>
      </Popup>
      {/* 温馨提示上拉 */}
      <Popup
        visible={reminderVisible}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          minHeight: '40vh',
          maxHeight: '70vh',
          overflow: 'auto',
        }}
        bodyClassName={styles.reminderContent}
        onMaskClick={() => {
          setReminderVisible(false);
        }}
      >
        <div className={styles.title}>{reminderList?.reminderName || '温馨提示'}</div>
        <div className={styles.content}>
          {reminderList?.list?.map(x => (
            <div className={styles.item} key={x.content}>
              <div>{x.content}</div>
              {x?.urlList?.map(
                item =>
                  item.src && (
                    <div key={item.src} className={styles.img}>
                      {/* video / img */}
                      <item.type src={item.src} alt="" />
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
      </Popup>
    </div>
  );
};

export default ReservationsCard;
