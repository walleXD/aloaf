import React, { ReactElement, FC, ReactNode } from 'react'
import Head from 'next/head'
import {
  Container,
  makeStyles,
  Typography
} from '@material-ui/core'
import { CSSProperties } from '@material-ui/styles'

interface Props {
  children: ReactNode
  title?: string
}

const useStyles = makeStyles(
  (
    theme
  ): Record<
    string,
    CSSProperties | (() => CSSProperties)
  > => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2)
    },
    footer: {
      padding: theme.spacing(2),
      marginTop: 'auto',
      backgroundColor: 'white'
    }
  })
)

export const Layout: FC<Props> = ({
  children,
  title
}): ReactElement => {
  //@ts-ignore
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Head>
        <title>
          {title ? `${title} - A Loaf` : 'A Loaf'}
        </title>
      </Head>
      <Container
        component="main"
        className={classes.main}
        maxWidth="sm"
      >
        {children}
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="body1">
            This is our footer
          </Typography>
        </Container>
      </footer>
    </div>
  )
}
