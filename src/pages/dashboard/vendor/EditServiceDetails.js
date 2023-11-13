import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as PlusIcon } from "../../../assets/images/icons/icons8-plus.svg";
import { ReactComponent as CameraInputIcon } from "../../../assets/images/icons/camera-input-icon.svg";
import NavBar from "./NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "../../../components/popUp/popUp";
import { TiTick } from "react-icons/ti";
import { FaExclamation } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  CREATE_SERVICE,
  UPDATE_SERVICE,
  GET_SERVICE_CATEGORIES,
} from "../../../redux/actions/services";
import FormControlAuth from "./Components/formControl";

function EditServiceDetails({ sidebar, setSidebar }) {
  let navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.authReducer);
  const { serviceCategories } = useSelector((state) => state.ServicesReducers);
  const singleService = JSON.parse(localStorage.getItem("singleService"));
  // console.log("localhost", singleService);
  const [category, setCategory] = useState("");
  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [orderStatus, setOrderStatus] = useState("completed");
  const [productImages, setProductImages] = useState(
    location?.state?.addProduct ? [] : singleService.images
  );
  const [serviceData, setServiceData] = useState({
    seller: user?._id,
    serviceName: singleService?.serviceName,
    serviceCategory: location?.state?.addProduct
      ? ""
      : singleService?.serviceCategory?._id,
    price: location?.state?.addProduct ? "" : singleService.price,
    priceDetails: location?.state?.addProduct ? "" : singleService.priceDetails,
    serviceDescription: location?.state?.addProduct
      ? ""
      : singleService?.serviceDescription,
    serviceArea: location?.state?.addProduct ? "" : singleService.serviceArea,
    images: location?.state?.addProduct ? [] : singleService.images,
    serviceId: location?.state?.addProduct ? "" : singleService._id,
  });
  // useEffect(() => {
  //   console.log("first", singleService);
  //   setServiceData({
  //     seller: user?._id,
  //     serviceName: singleService.serviceName,
  //     serviceCategory: singleService.serviceCategory?._id,
  //     price: singleService.price,
  //     priceDetails: singleService.priceDetails,
  //     serviceDescription: singleService.serviceDescription,
  //     serviceArea: singleService.serviceArea,
  //     images: [],
  //   });
  // }, []);

  const handleFile = (e) => {
    const files = [...e.target.files];
    let tempArr = [...serviceData.images, ...files];
    // tempArr.push(files);
    let arr = [...productImages];
    setServiceData({ ...serviceData, images: tempArr });
    if (files.length > 0) {
      files.map((item) => {
        arr.push(URL.createObjectURL(item));
      });
      if (arr.length > 12) {
        toast.error("only upload upto 12 images");
      } else {
        setProductImages([...arr]);
      }
    }
  };
  const handleProductDelete = (i) => {
    let arr = [...productImages];
    let arr1 = [...serviceData.images];
    arr.splice(i, 1);
    arr1.splice(i, 1);
    setProductImages(arr);
    setServiceData({ ...serviceData, images: arr1 });
  };

  const submitHandler = () => {
    var form = new FormData();
    form.append("seller", serviceData.seller);
    form.append("serviceName", serviceData.serviceName);
    form.append("status", "Active");
    form.append("serviceCategory", category);
    form.append("price", serviceData.price);
    form.append("priceDetails", serviceData.priceDetails);
    form.append("serviceDescription", serviceData.serviceDescription);
    form.append("serviceArea", serviceData.serviceArea);
    console.log("form data: ", form);
    if (!location?.state?.addProduct) {
      // form.append("serviceId", serviceData.serviceId);
      const arr = serviceData.images.filter((item) => item?.public_id);
      const file = serviceData.images.filter((item) => !item?.public_id);
      console.log("public id", arr);
      console.log("file", file);
      if (file.length > 0) {
        file.map((item) => form.append("images", item));
      }
      form.append("oldImages", arr);
    } else {
      // form.append("serviceArea", serviceData.serviceArea);
      if (serviceData.images.length > 0) {
        serviceData.images.map((item) => form.append("images", item));
      }
    }
    // console.log("form", form);
    if (location?.state?.addProduct) {
      dispatch(CREATE_SERVICE(form, token, setSuccessfulPopup));
      console.log("ghksdsd");
    } else {
      dispatch(
        UPDATE_SERVICE(singleService._id, form, token, setSuccessfulPopup)
      );
      console.log("kdfjdhj");
    }
  };

  useEffect(() => {
    dispatch(GET_SERVICE_CATEGORIES(token));
  }, []);
  useEffect(() => {}, [serviceCategories]);
  return (
    <>
      <Popup open={successfulPopup} setOpen={setSuccessfulPopup}>
        <div className="successful-popup">
          <div className="sp-icon">
            <TiTick size={30} fill="black" />
          </div>
          <h3>
            Service Uploaded
            <br />
            Successfully
          </h3>
          <div className="soi-popup-btns d-flex">
            <button
              className="btn btn-solid btn-solid-primary-rounded soi-success-btn"
              onClick={() => setSuccessfulPopup(false)}
            >
              Close
            </button>
            <button
              className="btn btn-solid btn-outline-primary-rounded soi-success-btn "
              onClick={() => setSuccessfulPopup(false)}
            >
              View Service Page
            </button>
          </div>
        </div>
      </Popup>
      <NavBar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title={
          location?.state?.addProduct ? "Add Service" : "Edit Service Details"
        }
      />
      <Paper
        sx={{
          backgroundColor: "#1e1e1e",
          color: "white",
          padding: "30px",
          boxShadow: "0rem 0rem 0px 0.1rem #00000047",
        }}
        elevation={20}
      >
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-1 d-flex justify-content-end align-items-center">
            <h3
              className="mx-3"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <span className="vtext-primary mx-2">&#10229;</span>Back
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Service Name
              </label>

              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="service name"
                value={serviceData.serviceName}
                onChange={(e) => {
                  setServiceData({
                    ...serviceData,
                    serviceName: e.target.value,
                  });
                }}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Service Category:
              </label>
              <br />
              {serviceCategories.length > 0 && (
                <>
                  <FormControlAuth
                    options={serviceCategories}
                    setCategory={setCategory}
                    editService={true}
                    isSelected={!location?.state?.addProduct && true}
                    selectedCategory={
                      !location?.state?.addProduct &&
                      singleService.serviceCategory?._id
                    }
                  />
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Price
              </label>

              <input
                type="number"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="$12"
                value={serviceData.price}
                onChange={(e) => {
                  setServiceData({
                    ...serviceData,
                    price: e.target.value,
                  });
                }}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9 col-lg-9 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Pricing Details
              </label>
              <textarea
                rows={4}
                id="firstName"
                name="firstName"
                placeholder="30 days return, Buyers will pay return shipping fee "
                required
                className="form-control"
                value={serviceData.priceDetails}
                onChange={(e) => {
                  setServiceData({
                    ...serviceData,
                    priceDetails: e.target.value,
                  });
                }}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9 col-lg-9 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Service Description
              </label>
              <textarea
                rows={4}
                id="firstName"
                name="firstName"
                placeholder="30 days return, Buyers will pay return shipping fee "
                required
                value={serviceData.serviceDescription}
                onChange={(e) => {
                  setServiceData({
                    ...serviceData,
                    serviceDescription: e.target.value,
                  });
                }}
                className="form-control"
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-9 col-lg-9 mb-5 col-sm-12 col-xs-12">
              <label htmlFor="firstName" className="form-label">
                Service Area
              </label>
              <textarea
                rows={4}
                id="firstName"
                name="firstName"
                placeholder="30 days return, Buyers will pay return shipping fee "
                required
                value={serviceData.serviceArea}
                onChange={(e) => {
                  setServiceData({
                    ...serviceData,
                    serviceArea: e.target.value,
                  });
                }}
                className="form-control"
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-8 col-lg-8 mb-5 col-sm-12 col-xs-12">
              <div className="d-flex">
                <label className="form-label" style={{ marginRight: "10px" }}>
                  Upload Service Image
                </label>
                <label className="form-label">
                  (Prefered Image Size:1234 pixel * 1234 pixels.
                  <br />
                  should not be more than 20MB.)
                </label>
              </div>
              <Grid container alignItems={"center"} spacing={2}>
                <Grid item lg={3} md={4} sm={4} xs={12}>
                  <label
                    style={{
                      display: "inline-block",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        height: "100px",
                        width: "100px",
                        padding: "10px",
                        border: "0.5px solid #FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "250px",
                      }}
                    >
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFile}
                        multiple
                      />
                      <CameraInputIcon
                        fill="#FFFFFF"
                        style={{ height: "30px", width: "30px" }}
                      />
                    </div>
                  </label>
                </Grid>
                {productImages?.map((item, i) => {
                  return (
                    <Grid key={item} item lg={3} md={4} sm={4} xs={12}>
                      <div
                        style={{
                          height: "100px",
                          width: "100px",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={item?.url ? item.url : item}
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <MdCancel
                          fill={"green"}
                          style={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            zIndex: 5,
                            cursor: "pointer",
                          }}
                          onClick={() => handleProductDelete(i)}
                        />
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <button
              disabled={
                serviceData?.serviceName == "" ||
                category == "" ||
                serviceData?.serviceDescription == "" ||
                serviceData?.price == "" ||
                serviceData?.priceDetails == "" ||
                serviceData?.serviceArea == "" ||
                serviceData?.images?.length == 0
              }
              onClick={() => {
                submitHandler();
              }}
              className="btn btn-solid btn-solid-primary-rounded table-btn"
              style={{
                marginRight: "20px",
                paddingLeft: "20px",
                paddingRight: "20PX",
                width: "200px",
                height: "40px",
              }}
            >
              <div
                style={{
                  // backgroundColor: "white",
                  margin: "5px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              ></div>
              Upload
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="btn btn-solid btn-outline-primary-rounded table-btn"
              style={{
                marginRight: "20px",
                paddingLeft: "20px",
                paddingRight: "20PX",
                width: "200px",
                height: "40px",
              }}
            >
              <div
                style={{
                  // backgroundColor: "white",
                  margin: "5px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              ></div>
              Cancel
            </button>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default EditServiceDetails;
