import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import { Provider } from 'react-redux'
import myStore from './redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Provider store={myStore()}>
      <Component {...pageProps} />
    // </Provider>
  );
}

export default myStore.withRedux(MyApp);
