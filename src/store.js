
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { coupons } from "./cupons";
import axios from "axios";
import apiurl from "./axiosconfig";

// create slice cupon slice 

const cuponSlice = createSlice({
  name: "cupon",

  initialState: {
      code: "",
      discount: 0,
      applied: false,
      message: "",
   },

  reducers: {
    applyCoupon: (state, action) => {
       const enteredCode = action.payload.toUpperCase();
       
       //In the cupons the code is present 
       if(coupons[enteredCode])
       {
        state.code = enteredCode;
        state.discount = coupons[enteredCode];
        state.applied = true;
        state.message = `Coupon "${enteredCode}" applied! You got ${coupons[enteredCode]}% off.`;
       }
       else{
        state.message = `Invalid coupon code.`;
       }
      }
  }
});

export const { applyCoupon } = cuponSlice.actions;

//creat the place orders thunk 
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
   async (orderData) => {
     const res = await apiurl.post("/api/v1/products/orders",orderData);
      return res.data;
   }
)

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })

      .addCase(placeOrder.rejected, (state, action) => {
         state.error = action.payload;
      });
  },
});



export const getAllOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, rejectedValue) => {
    try {
      const res = await apiurl.get("/api/v1/products/orders"); 
      return res.data.data;  // backend ---> { message, data: [] }
    } catch (err) {
      return rejectedValue.rejectWithValue(err.response?.data?.message || "Failed to fetch orders");
    }
  }
);


const getOrdersSlice = createSlice({
  name: "allorders",
  initialState: {
    ordersDetails: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // PENDING
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })

      // SUCCESS
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.ordersDetails = action.payload;
      })

      // ERROR
      .addCase(getAllOrders.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong";
      });
  },
});






//create the thunk to call apis 
export const fetchVegProducts = createAsyncThunk(
  'veg/fetchVegProducts', 
    async () => {
    const response = await apiurl.get('/api/v1/products/getVeg');
    console.log("Veg Products API Response ", response.data);
    return response.data;
    }
)

let vegSlice = createSlice({
  name: "veg",
  initialState: { vegItems: [],
					        loading: false,
					        error: null},
  reducers:{ },

  extraReducers: (builder) => { 
  
    builder.addCase(fetchVegProducts.fulfilled, (state, action) => {
						state.vegItems = action.payload;
			})
      .addCase(fetchVegProducts.pending, (state,action) => {
						state.loading = true;
				})
      .addCase(fetchVegProducts.rejected, (state, action) => {
            state.error = action.error.message;
        }
      );
  } 
})




let cartSlice = createSlice({
    name: "cart",
    initialState: [],  //Global State
    reducers: {
      addToCart: (state, action) => { 
       let item = state.find(item => item.id === action.payload.id)
      //Here item base execution of if-else 
        if(item)
        {  item.quantity += 1;
        }
        else{
          state.push({...action.payload, quantity: 1});
        }
      },

      removeFromCart: (state, action) => {
        let index = state.findIndex( item => item.id === action.payload.id);
        if(index !== -1){
          state.splice(index, 1);
        }
      }
    }
});

// export actions
export const { addToCart, removeFromCart} = cartSlice.actions;



export const registerUser = createAsyncThunk(
  "/register/users",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiurl.post("/api/v1/products/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});



export const loginUser = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiurl.post("/api/v1/products/login", formData);
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Login failed");
    }
  }
);


const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    token: localStorage.getItem("token") || null, 
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;  
        localStorage.setItem("token", action.payload.token);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});



//configure store
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cupon: cuponSlice.reducer,
    veg: vegSlice.reducer,
    orders: ordersSlice.reducer,
    allorders : getOrdersSlice.reducer,
    auth: authSlice.reducer,
    login: loginSlice.reducer
  },
});

export default store;