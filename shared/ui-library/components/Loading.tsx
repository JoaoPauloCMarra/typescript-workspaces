import { memo, useMemo } from 'react';

type LoadingTypes = 'dots' | 'spinner';

interface Props {
  type?: LoadingTypes;
  color?: string;
}

const Loading: React.FC<Props> = ({ type = 'dots', color }) => {
  const component = useMemo(() => {
    const style = {
      dots: {
        background: color,
      },
      spinner: {
        background: color,
        borderColor: color,
      },
    };
    const loadingTypes: { [key in LoadingTypes]: JSX.Element } = {
      dots: (
        <div className="loading-ellipsis">
          <div style={style.dots} />
          <div style={style.dots} />
          <div style={style.dots} />
          <div style={style.dots} />
        </div>
      ),
      spinner: (
        <div className="loading-spinner">
          <div style={style.spinner} />
          <div style={style.spinner} />
          <div style={style.spinner} />
          <div style={style.spinner} />
        </div>
      ),
    };
    try {
      return loadingTypes[type];
    } catch (error) {
      return loadingTypes.dots;
    }
  }, [type, color]);

  return (
    <div className="loading-wrapper center">
      <div className="loading-content">{component}</div>
    </div>
  );
};

export default memo(Loading);
