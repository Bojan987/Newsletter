import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'



const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow)





const useStyles = makeStyles((theme) => ({
    table: {
      
        [theme.breakpoints.down('md')]: {
            maxWidth: '80%',
            margin: '0 auto',
            marginBottom: '2rem'
        },
    },

    headBorder: {
        border: '2px solid black',
    },
    head: {
        fontFamily: "'Bitter', serif",
        fontWeight: 700,
        fontSize: 12,
        padding: 0,
        borderBottom: '2px solid black',
        margin: 1,
    },
    cell: {
        borderRight: '2px solid #CCCCCC',
        padding: 8,
        [theme.breakpoints.down('dm')]: {
            padding: 2,
        },
    },
}))

const ExchangeRate = ({rates}) => {
    const classes = useStyles()

//     const currency = async () => {
//       const api_id = 'f88bdceba3eef45ff0a26bcb2fbdfe37'
//       const response = await axios.get(
//           `https://api.kursna-lista.info/${api_id}/kursna_lista/json`
//       )
//       console.log(response.result.eur)
//   }

    return (
        <TableContainer component={Paper} elevation={0} >
            <Table className={classes.table} aria-label="customized table">
                <TableHead className={classes.headBorder}>
                    <TableRow>
                        <StyledTableCell
                            className={classes.head}
                            align="center"
                        >
                            VALUTA
                        </StyledTableCell>
                        <StyledTableCell
                            className={classes.head}
                            align="center"
                        >
                            PRODAJNI
                        </StyledTableCell>
                        <StyledTableCell
                            className={classes.head}
                            align="center"
                        >
                            SREDNJI
                        </StyledTableCell>
                        <StyledTableCell
                            className={classes.head}
                            align="center"
                        >
                            KUPOVNI
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rates.map((curr) => (
                        <StyledTableRow
                            key={curr.code + Math.ceil(Math.random() * 2000)}
                        >
                            <StyledTableCell
                                align="center"
                                className={classes.cell}
                            >
                                {curr.code.toUpperCase()}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                className={classes.cell}
                            >
                                {curr.exchange_sell}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                className={classes.cell}
                            >
                                {curr.exchange_middle}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                className={classes.cell}
                            >
                                {curr.exchange_buy}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ExchangeRate
