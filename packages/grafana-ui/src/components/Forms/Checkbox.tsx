import React, { HTMLProps } from 'react';
import { GrafanaTheme } from '@grafana/data';
import { getLabelStyles } from './Label';
import { useTheme, stylesFactory } from '../../themes';
import { css, cx } from 'emotion';
import { getFocusCss } from './commonStyles';

export interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string;
  description?: string;
  value: boolean;
  onChange?: (checked: boolean) => void;
}

export const getCheckboxStyles = stylesFactory((theme: GrafanaTheme) => {
  const labelStyles = getLabelStyles(theme);
  const checkboxSize = '16px';
  return {
    label: cx(
      labelStyles.label,
      css`
        padding-left: ${theme.spacing.formSpacingBase}px;
      `
    ),
    description: cx(
      labelStyles.description,
      css`
        padding-left: ${theme.spacing.formSpacingBase}px;
      `
    ),
    wrapper: css`
      position: relative;
      padding-left: ${checkboxSize};
    `,
    input: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      &:focus + span {
        ${getFocusCss(theme)}
      }

      /**
       * Using adjacent sibling selector to style checked state.
       * Primarily to limit the classes necessary to use when these classes will be used
       * for angular components styling
       * */
      &:checked + span {
        background: blue;
        background: ${theme.colors.formCheckboxBgChecked};
        border: none;
        &:hover {
          background: ${theme.colors.formCheckboxBgCheckedHover};
        }
        &:after {
          content: '';
          position: absolute;
          left: 5px;
          top: 1px;
          width: 6px;
          height: 12px;
          border: solid ${theme.colors.formCheckboxCheckmark};
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }
      }
    `,
    checkmark: css`
      display: inline-block;
      width: ${checkboxSize};
      height: ${checkboxSize};
      border-radius: ${theme.border.radius.sm};
      margin-right: ${theme.spacing.formSpacingBase}px;
      background: ${theme.colors.formCheckboxBg};
      border: 1px solid ${theme.colors.formInputBorder};
      position: absolute;
      top: 1px;
      left: 0;
      &:hover {
        cursor: pointer;
        border-color: ${theme.colors.formInputBorderHover};
      }
    `,
  };
});

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  value,
  onChange,
  id,
  disabled,
  ...inputProps
}) => {
  const theme = useTheme();
  const styles = getCheckboxStyles(theme);

  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        className={styles.input}
        id={id}
        checked={value}
        disabled={disabled}
        onChange={event => {
          if (onChange) {
            onChange(event.target.checked);
          }
        }}
        {...inputProps}
      />
      <span className={styles.checkmark} />
      {label && <span className={styles.label}>{label}</span>}
      {description && (
        <>
          <br />
          <span className={styles.description}>{description}</span>
        </>
      )}
    </label>
  );
};

Checkbox.displayName = 'Checkbox';
