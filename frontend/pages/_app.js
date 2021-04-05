import NProgress from 'nprogress';
import IndexPage from '../components/Page';
import Router from 'next/router'


import '../components/styles/nprogress.css';

Router.events.on('routerChangeStart', () => NProgress.start());
Router.events.on('routerChangeComplete', () => NProgress.done());
Router.events.on('routerChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <IndexPage>
      <Component {...pageProps} />
    </IndexPage>
  );
}
