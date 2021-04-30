import type { AppProps } from 'next/app';
import GraphqlProvider from '@shared/ui-library/components/GraphqlProvider';
import '@shared/ui-library/styles/globals.scss';

const MainApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <GraphqlProvider browser={process.browser}>
      <Component {...pageProps} />
    </GraphqlProvider>
  );
};

export default MainApp;
