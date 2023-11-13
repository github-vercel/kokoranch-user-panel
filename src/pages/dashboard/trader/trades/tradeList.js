import React, { useState, useEffect } from 'react'
import { FaSearch, FaPlus, FaAngleDown, FaFilter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  GET_All_SELLER_TRADES,
  EDIT_TRADE_INFO_DETAIL_ACTION,
  DELETE_TRADE_ACTION,
} from '../../../../redux/actions/trades'

import moment from 'moment'

export default function TradeList({
  setView,
  view,
  editAble,
  setEditAble,
  recordForEdit,
  setRecordForEdit,
  setNewRecord,
}) {
  const dispatch = useDispatch()
  const { traderTrades, deleteTrade } = useSelector(
    (state) => state.TradesReducers,
  )

  const [sortType, setsortType] = useState('Ascending')
  const [dateSelectedFilter, setdateSelectedFilter] = useState({
    fromDate: '',
    toDate: '',
  })
  const userData = JSON.parse(localStorage.getItem('userData'))

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  const handleSortProducts = (a, b) => {
    if (sortType == 'Filter Date') {
      return (
        new Date(dateSelectedFilter.fromDate) -
        new Date(dateSelectedFilter.toDate)
      )
    } else if (sortType == 'Newest First') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else if (sortType == 'Oldest First') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    }
  }
  useEffect(() => {
    dispatch(
      GET_All_SELLER_TRADES(userData?._id, localStorage.getItem('token')),
    )
  }, [deleteTrade])

  return (
    <>
      <article className="trader-trades-main">
        <header>
          <h3>
            Trade List{traderTrades ? '(' + traderTrades?.length + ')' : '0'}
          </h3>{' '}
          <div className="right">
            <div className="right_inner-left">
              <div className="table-search-wrappper">
                <input className="form-control" placeholder="Search" />
                <div className="table-icon-wrappper">
                  <FaSearch />
                </div>
              </div>
            </div>
            <div className="right_inner-right">
              <div className="dropdown  custom-dropdown">
                <div
                  className=" dropdown-toggle "
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort By
                  <FaAngleDown />
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link className="dropdown-item" to="#">
                      New to Old
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Old to New
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown  custom-dropdown">
                <div
                  className=" dropdown-toggle "
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaFilter className="title-color" />
                  &nbsp;Filter By Date&nbsp; <FaAngleDown />
                </div>
                <ul
                  className="dropdown-menu filter-dropdown"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <div className="date-input-wrapper">
                    <label>From</label>
                    <input
                      type="date"
                      pattern="yy/mm/dd"
                      placeholder="02/02/2022"
                      onChange={(event) =>
                        setdateSelectedFilter({
                          ...dateSelectedFilter,
                          fromDate: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="date-input-wrapper">
                    <label>To</label>
                    <input
                      type="date"
                      pattern="yy/mm/dd"
                      onChange={(event) =>
                        setdateSelectedFilter({
                          ...dateSelectedFilter,
                          toDate: event.target.value,
                        })
                      }
                      placeholder={new Date()}
                    />
                  </div>
                  <button
                    onClick={() => {
                      console.log(dateSelectedFilter)
                      setsortType('Filter Date')
                    }}
                    className="btn btn-solid btn-solid-primary mx-auto"
                  >
                    Apply
                  </button>
                </ul>
              </div>
              <button
                className="btn btn-solid btn-solid-primary"
                onClick={() => {
                  setView('view')
                  setEditAble(true)
                  setNewRecord(true)
                }}
              >
                <FaPlus />
                &nbsp;Add New Trade
              </button>
            </div>
          </div>
        </header>

        <div className="table-content table-container">
          <table className="table table-container__table table-container__table--break-md">
            <thead>
              <tr>
                <th className="li-product-remove">Trade Code</th>
                <th className="li-product-thumbnail">In Search Of</th>
                <th className="cart-product-name">Exchange With</th>
                <th className="li-product-price">Upload Date</th>
                <th
                  className="li-product-subtotal"
                  style={{ textAlign: 'left' }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {traderTrades
                ?.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td data-heading="Trade Code">
                        {'0' + order._id.slice(0, 3)}
                      </td>
                      <td data-heading="In Search Of">
                        {truncate(order.inSearchOf, 40)}
                      </td>
                      <td data-heading="Exchange With">
                        {truncate(order.toExchangeWith, 40)}
                      </td>
                      <td data-heading="Upload Date">
                        {' '}
                        {moment(order.createdAt).format(
                          'MMM DD YYYY h:mm A',
                        )}{' '}
                      </td>
                      <td
                        data-heading="Action"
                        className="d-flex"
                        style={{ textAlign: 'left' }}
                      >
                        <button
                          className="btn btn-solid btn-solid-primary px-4 me-3 color-white"
                          onClick={() => {
                            dispatch(EDIT_TRADE_INFO_DETAIL_ACTION(order))
                            setView('view')
                            setRecordForEdit(null)
                            setEditAble(false)
                          }}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-solid btn-solid-warning px-4 me-3 color-white"
                          onClick={() => {
                            setView('view')
                            dispatch(EDIT_TRADE_INFO_DETAIL_ACTION(order))
                            setEditAble(true)
                            setNewRecord(false)
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            dispatch(
                              DELETE_TRADE_ACTION(
                                order._id,
                                localStorage.getItem('token'),
                              ),
                            )
                          }}
                          className="btn btn-solid btn-solid-danger px-4 color-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })
                ?.sort((a, b) => handleSortProducts(a, b))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  )
}
