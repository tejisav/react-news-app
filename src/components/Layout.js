import React from 'react'
import Package from '../../package.json'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#3f51b5",
    color: "white"
  },
  title: {
    flexGrow: 1
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: theme.spacing(1),
    width: 'auto'
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: 120,
    '&:focus': {
      width: 200
    }
  },
  main: {
    marginTop: "2rem",
  },
  footer: {
    marginTop: "2rem",
    marginBottom: "2rem"
  }
}))

const Layout = (props) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <header className={classes.root}>
        <Container>
          <Toolbar>
            <Typography className={classes.title} component="h1" variant="h5" align="left">
              {Package.name}
            </Typography>
            <form className={classes.search} onSubmit={props.handleSearchSubmit}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
                onChange={props.handleSearchValueChange}
              />
          </form>
          </Toolbar>
        </Container>
        <AppBar position="static">
          <Tabs value={props.tabValue} onChange={props.handleTabValueChange} centered>
            <Tab value="in" label="India" />
            <Tab value="ca" label="Canada" />
            <Tab value="search" label="Search Results" />
            <Tab value="us" label="USA" />
            <Tab value="au" label="Australia" />
          </Tabs>
        </AppBar>
      </header>
      <main className={classes.main}>
        {props.children}
      </main>
      <footer className={classes.footer}>
        <Container>
          <Typography color="textSecondary" align="center">
            {'Built with '}
            <Link color="textPrimary" href="https://github.com/facebook/react">
              React {Package.dependencies.react.replace('^', '')}
            </Link>
            {' & powered by '}
            <Link color="textPrimary" href="https://newsapi.org/">
              NewsAPI.org
            </Link>
          </Typography>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Layout