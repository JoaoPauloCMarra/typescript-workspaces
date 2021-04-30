import { memo } from 'react';

interface Props {
  children: string | JSX.Element;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'link';
  disabled?: boolean;
  'data-testid'?: string;
  onPress?: () => void;
}

const Button: React.FC<Props> = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled,
  'data-testid': testId,
  onPress,
}) => {
  return (
    <button
      type={type}
      data-testid={testId || 'button'}
      className={`button ${variant}`}
      onClick={onPress}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default memo(Button);
