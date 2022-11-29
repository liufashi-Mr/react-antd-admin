import React from 'react';
import styles from './index.module.scss';
import cls from 'classnames';
import Button from '@components/Button';
import { Tag } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import renderEvent from '@utils/renderEvent';
import clickEvent from '@utils/clickEvent';
import { replaceTemplate } from '@utils/index';

/*
  门诊缴费卡片
*/
interface MedicineCardProps {
  dataMap: Partial<COMMON.MedicalInformation>;
  config: MedicineCardConfig;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ config, dataMap }) => {
  const { content, footer, header, color = 'primary' } = config;
  const { DrugOrders = [] } = dataMap;
  return (
    <div className={cls(styles.card, styles[color])}>
      <div className={cls(styles.header, styles[color])}>
        {header?.length > 0 &&
          header.map(x => (
            <span key={x.field} style={JSON.parse(x.style || '{}')}>
              {x?.fieldDesc ? x.fieldDesc?.replace('[]', dataMap[x.field] || '') : dataMap[x.field]}
            </span>
          ))}
      </div>
      <div className={styles.center}>
        <div className={cls(styles.title, { [styles['disabled']]: color === 'disabled' })}>
          {content?.title?.map(x => (
            <span key={x.field} style={JSON.parse(x.style || '{}')}>
              {/* 可能会多一些定语 */}
              {x?.fieldDesc
                ? x.fieldDesc.includes('[]')
                  ? x.fieldDesc?.replace('[]', dataMap[x.field] || '')
                  : x.fieldDesc + dataMap[x.field]
                : dataMap[x.field]}
            </span>
          ))}
        </div>
        <ul className={styles.medicineList}>
          {DrugOrders.map((x, i) => (
            <li key={i} style={JSON.parse(x.style || '{}')}>
              <div className={styles.order}>
                <div className={styles.left}>{x[content?.medicine?.field]}</div>
                <div className={styles.right}>
                  x{x[content?.count?.field]}
                  {x[content?.unit?.field]}
                </div>
              </div>
              <div className={styles.medication}>{replaceTemplate(x, content?.medication)}</div>
            </li>
          ))}
        </ul>
        {footer && footer?.length > 0 && (
          <div className={styles.buttons}>
            {footer?.map(x =>
              x.clickEvent ? (
                //event
                <Button key={x.text} type={x.color} onClick={clickEvent[x.clickEvent]}>
                  {x.text}
                </Button>
              ) : (
                //link
                <Button key={x.text} type={x.color} href={x.href} target={x.target}>
                  {x.text}
                </Button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineCard;
