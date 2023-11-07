import { createSlice, isAnyOf, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchContacts, addContacts, deleteContact } from "./requestOperations";

export const fetchContactsThunk = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
    try {
      const contacts = await fetchContacts();
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactsThunk = createAsyncThunk(
    'contacts/addContact',
    async (newContact, thunkAPI) => {
    try {
      const contacts = await addContacts(newContact);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
    'contacts/deleteContact',
    async (id, thunkAPI) => {
    try {
      const deletedContact = await deleteContact(id);
      return deletedContact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const updateContact = createAsyncThunk(
//     'contacts/deleteContact',
//     async (id) => {
//         const response = (await contactsInstance.patch(`/contacts/${id}`)).data;
//         return response;
//     }
// );

const getActions = (type) =>  isAnyOf(fetchContactsThunk[type], addContactsThunk[type], deleteContactThunk[type]);


const contactsSlice = createSlice({
    name: 'contacts',
    initialState: { contacts: [], isLoading: false, isError: null  },
    extraReducers: builder => 
        builder
            .addCase(fetchContactsThunk.fulfilled, (state, action) => {
                state.contacts = action.payload;
            })
            .addCase(addContactsThunk.fulfilled, (state, action) => {
                state.contacts = [...state.contacts, action.payload];
            })
            .addCase(deleteContactThunk.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(con => con.id !== action.payload.id);
            })
            .addMatcher(getActions('pending'), (state) => {
                state.isLoading = true;
            })
            .addMatcher(getActions('rejected'), (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addMatcher(getActions('fulfilled'), (state) => {
                state.isLoading = false;
                state.isError = null;
    })
})

export const contactReducer = contactsSlice.reducer;
