import React, { useState, useEffect } from "react";
import {
  FaRegUser,
  FaTradeFederation,
  FaRegFile,
  FaRegCommentAlt,
  FaRegSun,
  FaSignOutAlt,
} from "react-icons/fa";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";
import NavBar from "./NavBar";
import InfoCards from "./Components/InfoCards";
import Table from "./Components/Table";
import { CircularProgress, Paper } from "@mui/material";
import FormControlAuth from "./Components/formControl";
import ProductOrdersTable from "./ProductOrdersTable";
import SearchBar from "./Components/SearchBar";
import { toast } from "react-toastify";
import { GET } from "../../../apis/requests";
import { useSelector } from "react-redux";

function VendorProductOrders({ setSidebar, sidebar }) {
  const { user, token } = useSelector((state) => state.authReducer);
  const [tableHeadData, seTableHeadData] = useState([
    { id: "order_id", label: "Order No" },
    { id: "user_id", label: "User Id" },
    { id: "productName", label: "productName" },
    { id: "createdAt", label: "Date" },
    { id: "totalPrice", label: "Amount Paid" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ]);

  const [tableRowData, setTableRowData] = useState([]);

  const [filterCard, setFilterCard] = useState([{}]);

  const [activeCard, setActiveCard] = useState("Total Orders");

  const [rowData, setRowData] = useState(tableRowData);
  const [sortData, setSortData] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let temp = [];
    if (activeCard == "Total Orders") {
      temp = tableRowData;
      // console.log("all");
    } else if (activeCard == "pending") {
      temp = tableRowData.filter((item) => item.status == "pending");
    } else if (activeCard == "on-the-way") {
      temp = tableRowData.filter((item) => item.status == "on-the-way");
    } else if (activeCard == "delivered") {
      temp = tableRowData.filter((item) => item.status == "delivered");
    } else if (activeCard == "cancelled") {
      temp = tableRowData.filter((item) => item.status == "cancelled");
    }
    setRowData(temp);
  }, [activeCard, tableRowData]);
  const getOrdersData = async () => {
    try {
      setLoader(true);
      const res = await GET("/product-orders/vendor/all");
      console.log("/product-orders/vendor/all", res)
      if (res.success == false) {
        toast.error(res.message);
        setLoader(false);
      } else {
        // console.log("product orders", res?.data);
        setTableRowData(res?.data);
        setLoader(false);
        let totalAmount = 0;
        res?.data.map((item) => {
          totalAmount = totalAmount + item.totalPrice;
        });
        let filterData = [
          { topText: "Total Orders", bottomText: res?.data.length },
          {
            topText: "pending",
            bottomText: res?.data.filter((item) => item.status == "pending")
              .length,
          },
          {
            topText: "on-the-way",
            bottomText: res?.data.filter((item) => item.status == "on-the-way")
              .length,
          },
          {
            topText: "delivered",
            bottomText: res?.data.filter((item) => item.status == "delivered")
              .length,
          },
          {
            topText: "cancelled",
            bottomText: res?.data.filter((item) => item.status == "cancelled")
              .length,
          },
          {
            topText: "Total Amount",
            bottomText: "$" + totalAmount,
          },
        ];
        setFilterCard(filterData);
        setRowData(res?.data);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    token && getOrdersData();
  }, [token]);

  useEffect(() => {
    if (sortData) {
      let temp = [];
      if (sortData == "asc") {
        temp = rowData.sort((a, b) => {
          return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt));
        });
      } else if (sortData == "dec") {
        temp = rowData.sort((a, b) => {
          return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
        });
      } else if (sortData == "low") {
        temp = rowData.sort((a, b) => {
          return Number(a.totalPrice) - Number(b.totalPrice);
        });
      } else if (sortData == "high") {
        temp = rowData.sort((a, b) => {
          return Number(b.totalPrice) - Number(a.totalPrice);
        });
      }

      setRowData(temp);
    }
  }, [sortData]);
  return (
    <>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title="Product Orders"
      />
      {loader ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress size="15vh" />
        </div>
      ) : (
        <article className="vendor-profile-main">
          <div className="vendor-profile-main_form">
            {tableRowData?.length > 0 && (
              <InfoCards
                data={filterCard}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                sortData={sortData}
                setSortData={setSortData}
                featured1={true}
              />
            )}
          </div>
          <div
            className="row"
            style={{
              marginTop: "20px",
              border: "1px black",
              borderRadius: "10px",
              boxShadow: "0px 0px 30px -10px",
              width: "100%",
              color: "black",
            }}
          >
            <div className="col-12 col-md-12">
              <div style={{ marginTop: "20px", color: "white" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "95%",
                    height: "100%",
                  }}
                >
                  <h4 style={{ marginLeft: "20px" }}>Total Orders</h4>
                  <div style={{ width: "50%" }}>
                    <SearchBar />
                  </div>
                </div>
                <ProductOrdersTable
                  tHeadData={tableHeadData}
                  tRowData={rowData}
                  edit={"productOrderDetails"}
                  activeCard={"total"}
                />
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
}

export default VendorProductOrders;
