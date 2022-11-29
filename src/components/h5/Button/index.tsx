import React from 'react';
import './index.scss';
import cls from 'classnames';

type ButtonProps = {
  type?: 'default' | 'primary' | 'disabled' | 'warning';
  style?: React.CSSProperties;
  target?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;
const Button: React.FC<ButtonProps> = ({ children, style, type = 'default', ...rest }) => {
  const prefixCls = 'guide-btn';
  if ('href' in rest && type !== 'disabled') {
    return (
      <a
        className={cls(prefixCls, {
          [`${prefixCls}-${type}`]: type,
        })}
        style={style}
        {...rest}
        target={rest.target || '_blank'}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      className={cls(prefixCls, {
        [`${prefixCls}-${type}`]: type,
      })}
      style={style}
      {...rest}
      disabled={type === 'disabled'}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
