import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  },
  tableCell: {
    paddingTop: "0px",
    paddingLeft: "0px",
    verticalAlign: "top"
  },
  tableImg: {
    width: "100%"
  }
}))

const Results = (props) => {
  
  const classes = useStyles()

  return(
    <React.Fragment>
      <Table className={classes.table}>
        <TableBody>
          {props.newsData.map((data, key) => (
            <TableRow key={key}>
              <TableCell scope="row">
                <img className={classes.tableImg} alt={data.title} src={data.urlToImage} />
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                <h3>{data.title}</h3>
                <p>{data.content}</p>
                <h5>{data.author}</h5>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={props.newsDataTotalResults}
        rowsPerPage={10}
        page={props.newsDataPage}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={props.handlePageChange}
      />
    </React.Fragment>
  )
}

export default Results