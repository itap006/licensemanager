import React from 'react';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';

export const Toast = ({
  duration = 2000,
  component,
  msg = 'Default message',
  type = 'default',
}: {
  duration?: null | number;
  component?: (onClose: () => void) => JSX.Element;
  msg?: string;
  type?: 'success' | 'success-outline' | 'default' | 'primary' | 'danger' | 'danger-outline' | 'warning';
  notify?: boolean;
}) => {
  const bgColor = `slick-alert alert-${type}`;
  let icon: any;

  type === 'success' || type === 'success-outline' ? (icon = 'alert-icon outline feather icon-check-circle') : (icon = '');

  toaster.notify(
    ({ onClose }: any) =>
      component ? (
        component(onClose)
      ) : (
        <div className={bgColor}>
          <i className={icon} onClick={onClose}></i>
          <span>{msg}</span>
          <i className="feather icon-x alert-icon" onClick={onClose}></i>
        </div>
      ),
    {
      duration,
    }
  );
};

export default Toast;
