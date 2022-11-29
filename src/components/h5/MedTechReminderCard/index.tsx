import React from 'react';
import styles from './index.module.scss';
import Icon from '@components/Icon';
import { replaceTemplate } from '@/utils/index';

interface MedTechReminderCardProps {
  dataMap: Partial<COMMON.MedicalInformation>;
  config?: MedTechReminderCardConfig;
}
const MedTechReminderCard: React.FC<MedTechReminderCardProps> = ({ config, dataMap }) => {
  return (
    <div className={styles.card}>
      <span>{config?.reminder}</span>
      <a href={replaceTemplate(dataMap, config?.href)}>
        <div className={styles.toReverse}>
          <span>{config?.buttonText}</span>
          <Icon name="round-right" />
        </div>
      </a>
    </div>
  );
};

export default MedTechReminderCard;
