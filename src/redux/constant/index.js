export default class ActionTypes {
  // USERS
  static CREATE_USER = "CREATE_USER";
  static UPDATE_USER = "UPDATE_USER";
  static DELETE_USER = "DELETE_USER";
  static GET_USER = "GET_USER";
  // SERVICES
  static GET_AGRICULTURAL_SERVICES = "GET_AGRICULTURAL_SERVICES";
  static CREATE_SERVICES = "CREATE_SERVICES";
  static UPDATE_SERVICES = "UPDATE_SERVICES";
  static DELETE_SERVICES = "DELETE_SERVICES";
  static GET_SERVICES = "GET_SERVICES";
  static GET_SERVICE = "GET_SERVICE";
  static ERROR_SERVICE = "ERROR_SERVICE";
  // PRODUCTS
  static CREATE_PRODUCTS = "CREATE_PRODUCTS";
  static UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
  static DELETE_PRODUCTS = "DELETE_PRODUCTS";
  static GET_PRODUCTS = "GET_PRODUCTS";
  static GET_FEATURED_PRODUCTS = "GET_FEATURED_PRODUCTS";
  static GET_PRODUCTS_SEARCH = "GET_PRODUCTS_SEARCH";
  static GET_PRODUCT = "GET_PRODUCT";
  static ERROR_PRODUCT = "ERROR_PRODUCT";
  // TRADES
  static CREATE_TRADE = "CREATE_TRADE";
  static CREATE_TRADE_REQUEST = "CREATE_TRADE_REQUEST";
  static GET_USER_TRADE_REQUESTS = "GET_USER_TRADE_REQUESTS";
  static GET_TRADER_TRADE_REQUESTS = "GET_TRADER_TRADE_REQUESTS";
  static GET_TRADER_TRADES = "GET_TRADER_TRADES";
  static DELETE_TRADE_REQUEST = "DELETE_TRADE_REQUEST";
  static CREATE_TRADE_REQUEST_MESSAGE = "CREATE_TRADE_REQUEST_MESSAGE";
  static UPDATE_TRADE = "UPDATE_TRADE";
  static DELETE_TRADE = "DELETE_TRADE";
  static GET_TRADES = "GET_TRADES";
  static GET_SELLER_TRADES = "GET_SELLER_TRADES";
  // static GET_TRADE = 'GET_TRADE'
  static EDIT_TRADE_INFO = "EDIT_TRADE_INFO";
  static EDIT_TRADE = "EDIT_TRADE";
  static ERROR_TRADE = "ERROR_TRADE";
  // AUTH
  static LOGIN = "LOGIN";
  static CHECK_TOKEN = "CHECK_TOKEN";
  static UPDATE_AUTH = "UPDATE_AUTH";
  static LOGOUT = 'LOGOUT'
  static LOGOUT_ERROR = 'LOGOUT_ERROR'
  static REGISTER = "REGISTER";
  static VENDOR_TRADER_REGISTER = "VENDOR_TRADER_REGISTER";
  static FORGOT_PASSWORD = "FORGOT_PASSWORD";
  static OTP_VERIFY = "OTP_VERIFY";
  static CREATE_NEW_PASSWORD = "CREATE_NEW_PASSWORD";
  // CART
  static ADD_TO_CART = "ADD_TO_CART";
  static REMOVE_FROM_CART = "REMOVE_FROM_CART";
  static INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
  static DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
  static GET_CART = "GET_CART";
  static CHANGE_CART_ITEM_QUANTITY = "CHANGE_CART_ITEM_QUANTITY";
  static GET_CART_TOTAL = "GET_CART_TOTAL";
  static CART_ITEMS_TOTAL = "CART_ITEMS_TOTAL";
  static DELIVERY_CHARGES = " DELIVERY_CHARGES";
  static ALREADY_IN_CART = "ALREADY_IN_CART";
  static EMPTY_CART = "EMPTY_CART";
  static ERROR_CART = "ERROR_CART";
  // CHECKOUT
  static ADD_CHECKOUT = "ADD_CHECKOUT";
  static GET_USER_CHECKOUT_DATA = "GET_USER_CHECKOUT_DATA";
  // WISHLIST
  static ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
  static REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
  static GET_WISHLIST = "GET_WISHLIST";
  static ERROR_WISHLIST = "ERROR_WISHLIST";
  // CATEGORIES
  static GET_All_CATEGORIES = "GET_All_CATEGORIES";
  static GET_SUB_CATEGORIES = "GET_SUB_CATEGORIES";
  static CREATE_CATEGORIES = "CREATE_CATEGORIES";
  static GET_CATEGORIES_PRODUCTS = 'GET_CATEGORIES_PRODUCTS'
  static GET_CATEGORIES_SERVICES = "GET_CATEGORIES_SERVICES";
  static UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
  static DELETE_CATEGORIES = "DELETE_CATEGORIES";
  static GET_CATEGOEIES = "GET_CATEGOEIES";
  static ERROR_CATEGOEIES = "ERROR_CATEGOEIES";

  // SUB CATEGORIES
  static CREATE_SUB_CATEGORIES = "CREATE_SUB_CATEGORIES";
  static UPDATE_SUB_CATEGORIES = "UPDATE_SUB_CATEGORIES";
  static DELETE_SUB_CATEGORIES = "DELETE_SUB_CATEGORIES";
  static GET_SUB_CATEGOEIES = "GET_SUB_CATEGOEIES";
  static ERROR_SUB_CATEGOEIES = "ERROR_SUB_CATEGOEIES";

  static RATE_PRODUCT = "RATE_PRODUCT";
  static RATE_SERVICE = "RATE_SERVICE";
  static RATE_TRADE = "C_TRADE";
  static ERROR_RATE = "ERROR_RATE";

  // SUB SUB CATEGORIES
  static CREATE_SUB_SUB_CATEGORIES = "CREATE_SUB_SUB_CATEGORIES";
  static UPDATE_SUB_SUB_CATEGORIES = "UPDATE_SUB_SUB_CATEGORIES";
  static DELETE_SUB_SUB_CATEGORIES = "DELETE_SUB_SUB_CATEGORIES";
  static GET_SUB_SUB_CATEGOEIES = "GET_SUB_SUB_CATEGOEIES";
  static ERROR_SUB_SUB_CATEGOEIES = "ERROR_SUB_SUB_CATEGOEIES";
}
