import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lltnqegjbzilitaitduj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjIwMTQxODMxLCJleHAiOjE5MzU3MTc4MzF9.NU1lCwjq1pYRMXsFMps230_F5UhZjVXwJ-JYw8i-QMQ";
const supabase = createClient(supabaseUrl, supabaseKey);

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

function createData(name, address, volunteers) {
  return {
    name,
    address,
    history: volunteers
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Volunteers
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.volunteers.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell align="right">{historyRow.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string
      })
    )
  }).isRequired
};

const rows = [
  createData("Frozen yoghurt", "159, 6.0, 24, 4.0, 3.99", [
    { name: "andy", email: "3012213213" }
  ]),
  createData("Ice cream sandwich", "237, 9.0, 37, 4.3, 4.99", [
    { name: "andy", email: "12213213" }
  ]),
  createData("Eclair", "262, 16.0, 24, 6.0, 3.79", [
    { name: "andy", email: "12213213" }
  ]),
  createData("Cupcake", "305, 3.7, 67, 4.3, 2.5", [
    { name: "andy", email: "12213213" }
  ]),
  createData("Gingerbread", "356, 16.0, 49, 3.9, 1.5", [
    { name: "andy", email: "12213213" }
  ])
];

export default function OtherNewTable() {
  const [db, setDb] = useState([]);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  const fetchDb = () => {
    supabase
      .from("families")
      .select(`*, volunteers(*)`)
      .then(({ data, error }) => {
        setDb(data);
      });
  };

  useEffect(() => {
    fetchDb();
  }, [needsUpdate]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Family Name</TableCell>
            <TableCell align="right">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {db ? db.map((row, index) => <Row key={index} row={row} />) : "NADA"}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
