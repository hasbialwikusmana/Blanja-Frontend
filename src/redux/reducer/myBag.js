import Swal from "sweetalert2";

const initialState = {
  myBag: [],
  checkoutItems: [],
};

const myBagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_MYBAG":
      if (state.myBag.find((item) => item.id === action.payload.id)) {
        Swal.fire({
          icon: "info",
          title: "Item sudah ada di keranjang",
          text: "Silahkan pilih item lainnya",
          confirmButtonText: "OK",
        });
        return state;
      } else {
        Swal.fire({
          icon: "success",
          title: "Item ditambahkan",
          text: "Item berhasil ditambahkan ke keranjang",
          confirmButtonText: "OK",
        });
      }
      return {
        ...state,
        myBag: [...state.myBag, action.payload],
      };

    case "REMOVE_FROM_MYBAG":
      return {
        ...state,
        myBag: state.myBag.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_ITEM_QUANTITY":
      return {
        ...state,
        myBag: state.myBag.map((item) => (item.id === action.payload.itemId ? { ...item, quantity: action.payload.quantity } : item)),
      };
    case "CHECKOUT_ITEMS":
      return {
        ...state,
        checkoutItems: state.myBag,
      };

    case "REMOVE_ALL_FROM_MYBAG":
      return {
        ...state,
        myBag: [],
        checkoutItems: [],
      };
    default:
      return state;
  }
};

export default myBagReducer;
