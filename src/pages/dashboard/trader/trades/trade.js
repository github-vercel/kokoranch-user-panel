import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaCamera } from 'react-icons/fa'
import Images from '../../../../constants/images'
import { useSelector, useDispatch } from 'react-redux'
import {
  UPDATE_TRADE_TRADE_ACTION,
  CREATE_TRADE_ACTION,
  DELETE_TRADE_ACTION,
} from '../../../../redux/actions/trades'
export default function Trade({
  editAble,
  setEditAble,
  setView,
  recordForEdit,
  singleTrade,
  setRecordForEdit,
  newRecord,
}) {
  const dispatch = useDispatch()
  const { editTradeInfo, updateTrade, deleteTrade, newTrade } = useSelector(
    (state) => state.TradesReducers,
  )
  const { _id } = JSON.parse(localStorage.getItem('userData'))
  const [trade, setTrade] = useState({
    inSearchOf: '',
    toExchangeWith: '',
    details: '',
    images: [],
    traderId: '',
    tradeType: '',
  })

  const handleChange = (e) => {
    setTrade({
      ...trade,
      [e.target.name]: e.target.value,
    })
  }
  const [selectedImages, setselectedImages] = useState([])

  const handleEditTradeInfo = (e) => {
    if (editAble && newRecord == false) {
      dispatch(
        UPDATE_TRADE_TRADE_ACTION(
          editTradeInfo._id,
          localStorage.getItem('token'),
          trade,
        ),
      )
    } else if (newRecord) {
      dispatch(CREATE_TRADE_ACTION(trade, localStorage.getItem('token')))
    }
  }
  useEffect(() => {
    if (recordForEdit && setEditAble) {
      setTrade(recordForEdit)
    }
  }, [])
  useEffect(() => {
    if (editTradeInfo && newRecord == false) {
      setTrade({ ...editTradeInfo })
      setselectedImages(editTradeInfo.images)
    } else if (newRecord) {
      setTrade({ ...trade, traderId: _id })
    }
  }, [editTradeInfo])

  useEffect(() => {
    if (updateTrade || newTrade || deleteTrade) {
      setTimeout(() => {
        window.location.reload(false)
      }, 3000)
    }
  }, [updateTrade, newTrade, deleteTrade])

  // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className="single-trade">
        {!editAble && (
          <div className="single-trade_top">
            <button className="btn btn-solid btn-solid-primary">
              View Trade Post
            </button>
            <div
              className="back-button"
              onClick={() => {
                setEditAble(false)
                setView(null)
                setRecordForEdit(null)
              }}
            >
              <FaAngleLeft />
              &nbsp;Back
            </div>
          </div>
        )}
        <div className="single-trade_bottom">
          <div className="row px-5 my-3 d-flex flex-column">
            <div className="col-12 col-sm-10 col-md-10 col-lg-5 d-flex flex-column justify-content-center">
              <label htmlFor="firstName" className="form-label">
                In Search Of:
              </label>
              {editAble ? (
                <input
                  type="text"
                  className="form-control"
                  id="profileName"
                  name="inSearchOf"
                  value={trade?.inSearchOf}
                  onChange={handleChange}
                  placeholder="In Search Of"
                  required
                />
              ) : (
                <p className="preview">{trade?.inSearchOf}</p>
              )}
            </div>
            <div className="col-12 col-sm-10 col-md-10 col-lg-5 d-flex flex-column justify-content-center">
              <label htmlFor="firstName" className="form-label">
                Trade Type:
              </label>
              {editAble ? (
                <input
                  type="text"
                  className="form-control"
                  id="profileName"
                  name="tradeType"
                  value={trade?.tradeType}
                  onChange={handleChange}
                  placeholder="Trade Type"
                  required
                />
              ) : (
                <p className="preview">{trade?.tradeType}</p>
              )}
            </div>
            <div className="col-12  col-sm-10 col-md-10 col-lg-5 d-flex flex-column justify-content-center">
              <label htmlFor="firstName" className="form-label">
                To Exchange With:
              </label>
              {editAble ? (
                <input
                  type="text"
                  className="form-control"
                  id="profileName"
                  name="toExchangeWith"
                  value={trade?.toExchangeWith}
                  onChange={handleChange}
                  placeholder="To Exchange With"
                  required
                />
              ) : (
                <p className="preview">{trade?.toExchangeWith}</p>
              )}
            </div>
            <div className="col-12  col-sm-10 col-md-10 col-lg-5 d-flex flex-column justify-content-center">
              <label htmlFor="firstName" className="form-label">
                Add Description:
              </label>
              {editAble ? (
                <textarea
                  rows="4"
                  type="text"
                  className="form-control"
                  id="profileName"
                  name="details"
                  value={trade?.details}
                  onChange={handleChange}
                  placeholder="Enter Details"
                  required
                />
              ) : (
                <p className="preview">{trade?.details}</p>
              )}
            </div>
            <div className="col-12  col-sm-10 col-md-10 col-lg-7 d-flex flex-column justify-content-center">
              <label htmlFor="firstName" className="form-label">
                Upload Photos:
              </label>
              {editAble ? (
                <div className="uploaded-images-wrapper">
                  <div className="uploaded-image-container">
                    <input
                      type="file"
                      onChange={(e) => {
                        // console.log(e.target.files)
                        // return
                        let reader = new FileReader()
                        reader.onload = (e) => {
                          setselectedImages([
                            ...selectedImages,
                            e.target.result,
                          ])
                        }
                        reader.readAsDataURL(e.target.files[0])

                        setTrade({
                          ...trade,
                          images: [...trade?.images, e.target.files[0]],
                        })
                      }}
                    />
                    <FaCamera />
                    <p>Add Photos</p>
                  </div>
                  {selectedImages?.map((c, index) => {
                    return (
                      <img
                        key={index}
                        src={c}
                        style={{ width: '10rem', height: '10rem' }}
                        alt="product"
                      ></img>
                    )
                  })}
                </div>
              ) : newRecord == true && editAble == false ? (
                <div className="uploaded-images-wrapper">
                  {selectedImages.images.map((c, index) => {
                    return (
                      <img
                        key={index}
                        src={c}
                        style={{ width: '10rem', height: '10rem' }}
                        alt="product"
                      ></img>
                    )
                  })}
                </div>
              ) : (
                <div className="uploaded-images-wrapper">
                  {trade?.images.map((c, index) => {
                    return (
                      <img
                        key={index}
                        src={c}
                        style={{ width: '10rem', height: '10rem' }}
                        alt="product"
                      ></img>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="button-wrapper">
          {editAble ? (
            <>
              <button
                onClick={() => handleEditTradeInfo()}
                className="btn btn-solid btn-solid-primary"
              >
                {editAble && !newRecord ? 'Save' : 'Upload'}
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  setView(false)
                  setEditAble(false)
                  setRecordForEdit(null)
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-solid btn-solid-primary"
                onClick={() => {
                  setEditAble(true)
                  setRecordForEdit(singleTrade)
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  dispatch(
                    DELETE_TRADE_ACTION(
                      editTradeInfo?._id,
                      localStorage.getItem('token'),
                    ),
                  )
                }}
                className="btn btn-outline-primary"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
