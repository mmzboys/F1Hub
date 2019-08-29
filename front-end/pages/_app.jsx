import App from "next/app";
import Layout from "components/Layout";
import themes from "../material-ui/themes";
import { ThemeProvider } from "@material-ui/styles";
import parseCookies from 'util/parseCookies.js'
import Cookie from 'js-cookie'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


class MyApp extends App {
  constructor(props) {
    super(props)

    this.state = {
      darkTheme: JSON.parse(props.pageProps.darkTheme)
    }
  }

  handleThemeChange = () => {
    // change value both in the state and cookie
    Cookie.set("darkTheme", JSON.stringify(!this.state.darkTheme));
    this.setState(state => {
      return { darkTheme: !state.darkTheme };
    });
  };

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // add value from cookie
    const cookies = parseCookies(ctx.req);
    pageProps.darkTheme = typeof cookies.darkTheme == "undefined" ? false : cookies.darkTheme
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider
        theme={this.state.darkTheme ? themes.darkTheme : themes.lightTheme}
      >
        <Layout
          name={pageProps.name}
          darkTheme={this.state.darkTheme}
          handleThemeChange={this.handleThemeChange}
        >
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}

export default MyApp;
