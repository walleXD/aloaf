import React, { ReactElement } from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../utils/theme'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../utils/withApollo'

class MyApp extends App {
  public componentDidMount(): void {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector(
      '#jss-server-side'
    )
    if (jssStyles) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jssStyles.parentNode!.removeChild(jssStyles)
    }
  }

  public render(): ReactElement {
    // @ts-ignore
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Head>
            <title>My page</title>
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
