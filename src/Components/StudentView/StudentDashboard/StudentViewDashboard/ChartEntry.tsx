import { Component } from 'react'
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
// import { faUndo } from "@fortawesome/free-solid-svg-icons";
import API_URL from "../../../../environment";

import { Service } from '../../../types'

type ChartEntryProps = Service & {
  sessionToken: string;
  fetchServiceRequests: () => void;
  open: boolean;
}

export default class ChartEntry extends Component<ChartEntryProps, {}> {




  async deleteEntry () {
    try {
      const response = await fetch(
        `${API_URL}/service/${this.props.id}`,
        {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.sessionToken,
          }),
        }
      );
      console.log(await response.json())
      
      this.props.fetchServiceRequests();

    } catch (err) {
      console.log(err);
    }
  };

  render () {
    return (
      <>

        <TableRow style={{ height: "45px", marginRight: "3px", marginLeft: "3px" }}>
          <TableCell></TableCell>
          <IconButton
            aria-label="expand row"
            size="small"

            // onClick={(e) => {

            //   this.state.itemId !==
            //     this.props.id
            //     ? this.setState({
            //       itemId: this.props.id,
            //     })
            //     : this.setState({ itemId: 100 });

            //   this.props.setSpecificEntry(
            //     this.props.serviceRequests[index]
            //   );

            //   this.props.setIndexNumber(
            //     this.props.serviceRequests[index].id
            //   );







            // }}
          >
            {this.props.id ===
              this.state.itemId ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
          <TableCell align="left">
            {" "}
            {this.props.date}
          </TableCell>

          <TableCell align="left">
            {this.props.typeOfService}{" "}
          </TableCell>
          <Hidden xsDown>       <TableCell align="center">
            {this.props.hours}{" "}
          </TableCell></Hidden>

          <TableCell align="center" > {this.props.status === "Denied" ?

            <FontAwesomeIcon
              style={{
                backgroundColor: "white",
                fontSize: "20px",
                color: "#ef476f"
              }}
              icon={faTimesCircle}
            />

            : this.props.status === "Approved" ?

              <FontAwesomeIcon
                style={{
                  color: "#06d6a0",
                  fontSize: "20px",
                }}
                icon={faCheckSquare}
              />

              : <FontAwesomeIcon
                style={{
                  color: "#ffd166",
                  fontSize: "20px",
                }}
                icon={faQuestionCircle}
              />



          }


          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            className="noPadding"
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={6}
            onClick={() => {
              this.setState({
                itemId: this.props.id,
              })
            }
            }

          >
            <Collapse
              in={
                this.props.open
              }
              timeout="auto"
              unmountOnExit
            >
              <Box style={{ padding: "5px" }} margin={1}>
                <Box className="editIcon">
                  <h5 style={{ marginRight: "auto" }}>Details</h5>

                  <Link to="/editservice">
                    <EditIcon style={{ marginRight: "10px" }} />
                  </Link>
                  <DeleteIcon
                    onClick={() => {
                      this.deleteEntryAsync2();
                    }}
                  />
                </Box>

                <p style={{ padding: "15px" }}>
                  <Hidden smUp>
                    Hours: {this.props.hours} <br></br> Description:
                   </Hidden>
                  {this.props.description}
                </p>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }
}