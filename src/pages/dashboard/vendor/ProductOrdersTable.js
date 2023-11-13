import React, {useState, useEffect} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_SINGLE_SERVICE } from "../../../redux/actions/services";
import DatanotFound from "../../../components/datanotfound/index";

function createData(name, code, population, size) {
  const density = population / size;
  const action = 1;
  return { name, code, population, size, density, action };
}
const ProductOrdersTable = ({
  tHeadData,
  tRowData,
  activeCard,
  edit,
  open,
  setOpen,
  setDeleteProduct,
  onDelete,
}) => {
  console.log(tRowData, "vbjvgh")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("activeCard", activeCard);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [productitemsData, setProductitemsData ] = useState();
  console.log(productitemsData,"???????????")

  useEffect(() => {
    if (tRowData) {
      const productItems = tRowData.map((item) => item.items).flat();
      setProductitemsData(productItems);
    }
  }, [tRowData]);
  
// const {user} = useSelector((state) => state.AuthReducer);

// console.log(user, "jkjkjkj")

  // const deleteProduct = async (id) => {
  //   try {
  //     const res = await DELETE(`products/${id}`)
  //   } catch (error) {
      
  //   }
  // }

  return (
    <> 
     {tRowData?.length <=0 ? (
          <DatanotFound />
        ) :
    <Paper
      sx={{
        margin: "20px",
        // border: "1px solid white",
        // borderColor: "white",
        // minHeight: 50,
        borderRadius: "20px",
        backgroundColor: "#1e1e1e",
        // zIndex: 10,
      }}
      // elevation={24}
    >
       
  
      <TableContainer
        className="scroll-bar-hide"
        sx={{
          maxHeight: "360px",
          maxWidth: "80vw",
          // minHeight: "100px",
          border: "1px solid white",
          borderRadius: "20px 20px 0 0",
          backgroundColor: "white",
        }}
      >
      
          <Table
          size="medium"
          stickyHeader
          aria-label="sticky table"
          sx={{
            color: "white",
            overflowX: "scroll",
            backgroundColor: "white",
          }}
        >
          <TableHead>
            <TableRow>
              {tHeadData.map((column) => (
                <TableCell
                  sx={{
                    backgroundColor: "#1e1e1e",
                    color: "#FFFFFF",
                    fontSize: "13px",
                  }}
                  key={column.id}
                  align={"center"}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#1e1e1e", color: "#FFFFFF" }}>
            {tRowData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                console.log("Rooooooooooooooooooooooooooow", row)
                return (
                  <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                    {tHeadData.map((column, index1) => {
                      // console.log("helloo", column.id, row);
                      console.log("helloo", column);
                      let value;
                      if (column.id == "order_id") {
                       
                        {row?.items?.map(((orderNo) => {
                            // console.log("orderNo", orderNo?.price)
                            value =   orderNo?.productId?._id
                            .substr(orderNo?.productId?._id.length - 4)
                            .toUpperCase();
                        }))}
                       
                      } else if (column.id == "user_id") {
                        value = row?.userId?._id
                          .substr(row?.userId?._id?.length - 5)
                          .toUpperCase();
                      } else if (column.id == "productName") {
                        {row?.items?.map((itemsData) => {
                            console.log("itemsData", itemsData)
                            value = itemsData?.productId?.productName || row?.serviceName;
                        })}
                      } else if (column.id == "updateDate") {
                        value = moment(row?.updatedAt).format("YYYY/MM/DD");
                      } else if (column.id == "totalPrice") {
                        
                        {row?.items?.map(((totalPrice) => {
                            // console.log("orderNo", orderNo?.price)
                            value = `$${totalPrice?.price}`
                        }))}
                          
                      } 
                      else if (column.id == "status") {
                        value = row?.status;
                      } 
                      else {
                        value = row[column.id];
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align={"center"}
                          sx={{
                            color: "#FFFFFF",
                            height: "50px",
                            fontSize: "13px",
                          }}
                        >
                          {column.id == "action" || column.id == "_id" ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                              }}
                            >
                              <button
                              state={{status: row?.isActive}}
                                className="btn btn-solid btn-solid-primary table-btn"
                                onClick={() => {
                                  if (edit == "services") {
                                    dispatch(SAVE_SINGLE_SERVICE(row));
                                    navigate(
                                      "/vendor-agricultural-services/details",
                                      {
                                        state: { data: row },
                                      }
                                    );
                                  } else if (edit == "serviceOrder") {
                                    navigate("/vendor-serviceorders/details", {
                                      state: { data: row },
                                    });
                                  } else if (edit == "productOrderDetails") {
                                    navigate("/vendor-productorders/details", {
                                      state: { data: row },
                                    });
                                  } else if (edit == "products") {
                                    navigate("/vendor-my-products/details", {
                                      state: { data: row },
                                    });
                                  } else if (edit == "featured") {
                                    navigate(
                                      "/vendor-my-products/details",{
                                        // /vendor-make-it-featured/view-featured-details
                                        state:{
                                          data:row
                                        }
                                      }
                                    );
                                  } else if (edit == "ratings") {
                                    setOpen(true);
                                  }
                                }}
                              >
                                View
                              </button>
                              {edit == "services" ? (
                                <button
                                  onClick={() => {
                                    onDelete(row?._id);
                                    // setOpen(true);
                                  }}
                                  className="btn btn-solid btn-solid-danger table-btn"
                                  style={{ marginLeft: "10px" }}
                                >
                                  Delete
                                </button>
                              ) : edit == "ratings" ? (
                                <button
                                  // onClick={() => {
                                  //   setOpen(true);
                                  // }}
                                  className="btn btn-solid btn-solid-secondary table-btn"
                                  style={{ marginLeft: "10px" }}
                                >
                                  Page View
                                </button>
                              ) : (
                                edit == "products" && (
                                  <button
                                    onClick={() => {
                                      setOpen(true);
                                      setDeleteProduct &&
                                        setDeleteProduct(row?._id);
                                    }}
                                    className="btn btn-solid btn-solid-danger table-btn"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    Delete...
                                  </button>
                                )
                              )}
                            </div>
                          ) : column.id == "createdAt" ? (
                            moment(value).format("MMM Do YY")
                          ) : column.id == "price" ? (
                            `$${value}`
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
          
            }
           
          </TableBody>
        </Table>
       
      
      </TableContainer>
      
      
      {tRowData.length > 0 && ( // Conditionally render TablePagination if tRowData is available
    <TablePagination
      sx={{
        backgroundColor: "#1e1e1e",
        color: "white",
        border: "1px solid white",
        borderRadius: "0 0 20px 20px",
      }}
      rowsPerPageOptions={[5, 10, 100]}
      component="div"
      count={tRowData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )}
    </Paper>
  }
    </>
  );
};

export default ProductOrdersTable;
