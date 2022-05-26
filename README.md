# Fake Store Web

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A ReactJS web interface for [FakeStoreApi](https://fakestoreapi.com/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode turned off.
### `yarn test:coverage`

Launches the test runner in the interactive watch mode turned off and creates coverage file.
<!--
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it. -->

## Features
- Login: you can sign in using credentials below or some of users allowed by [api](https://fakestoreapi.com/docs#u-all)
```
username: johnd
password: m38rmF$
```
- Protected Routes: unauthenticated users can't access other route than `/login`. An authenticated user can't access `/login` route without sign out.
### Authenticated features
- Logout: sign out by clicking at button "Sign Out" in header;
- List Products: list all available products and filter them by category, if necessary;
- Add product to cart: each product has an input with a counter followed by "Add to Cart" button. A toast will be showed with the result of request. (FakeStoreApi does not allow to really update carts in database)
- User cart: "Cart" button at header redirects user to another page with a list of products added to his/her cart;
- Remove item from cart: each item has a "X" button. By clicking in it, a confirmation modal appears. On confirm, a toast is showed with the result of request and, in case of success, user is backs to Home page with previously selected filters;
- Go to payment: Fake button in Cart screen, only shows an alert with message "End of project".
