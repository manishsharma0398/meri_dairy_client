// import React from "react";
// import { fireEvent, render, screen } from "@testing-library/react";
// import configureStore from "redux-mock-store";
// import { Provider } from "react-redux";
// import Login from "./login/Login.component.jsx";
// import { BrowserRouter } from "react-router-dom";

// const initState = {
//   user: {
//     currentUser: null,
//     error: false,
//     errorMsg: "",
//   },
//   UI: {
//     deleteDialogBox: false,
//     deleteDialogBoxData: null,
//     errors: [],
//     imgPath: "",
//     showFullBodySpinner: false,
//   },
// };

// const mockStore = configureStore();
// const userState = mockStore(initState);

// const testEl = (
//   <Provider store={userState}>
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>
//   </Provider>
// );

// test("email input should be rendered", () => {
//   render(testEl);
//   const userInputEl = screen.getByPlaceholderText(/email/i);
//   expect(userInputEl).toBeInTheDocument();
// });

// test("password input should be rendered", () => {
//   render(testEl);
//   const passwdInputEl = screen.getByPlaceholderText(/password/i);
//   expect(passwdInputEl).toBeInTheDocument();
// });

// test("button should be disabled", () => {
//   render(testEl);
//   const buttonInputEl = screen.getByRole("button");
//   expect(buttonInputEl).toBeDisabled();
// });

// test("error message be not shown", () => {
//   render(testEl);
//   const buttonInputEl = screen.getByTestId("error");
//   expect(buttonInputEl).not.toBeVisible();
// });

// test("email input should change", () => {
//   render(testEl);
//   const userInputEl = screen.getByPlaceholderText(/email/i);
//   const testValue = "test";
//   fireEvent.change(userInputEl, { target: { value: testValue } });
//   expect(userInputEl.value).toBe(testValue);
// });

// test("password input should change", () => {
//   render(testEl);
//   const passInputEl = screen.getByPlaceholderText(/password/i);
//   const testValue = "test";
//   fireEvent.change(passInputEl, { target: { value: testValue } });
//   expect(passInputEl.value).toBe(testValue);
// });

// test("button should be not be disabled when input exist", () => {
//   render(testEl);
//   const buttonEl = screen.getByRole("button");

//   const emailInputEl = screen.getByPlaceholderText(/email/i);
//   const passInputEl = screen.getByPlaceholderText(/password/i);

//   const testValue = "test";

//   fireEvent.change(emailInputEl, { target: { value: testValue } });
//   fireEvent.change(passInputEl, { target: { value: testValue } });

//   expect(buttonEl).not.toBeDisabled();
// });
