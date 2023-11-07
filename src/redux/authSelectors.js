export const selectAuthIsLoading = state => state.authorization.isLoading;
export const selectAuthIsError = state => state.authorization.isError;
export const selectAuthToken = state => state.authorization.token;
export const selectAuthUserData = state => state.authorization.user;
export const selectAuthSignedIn = state => state.authorization.isLogedIn;

