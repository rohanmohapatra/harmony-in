import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout ,Property as PropertyLayout, Seller as SellerLayout} from './layouts';

import {
  Home as HomeView,
  Dashboard as DashboardView,
  ProductList as ProductListView,
  PropertyList as PropertyListView,
  BuyerSignIn as BuyerSignInView,
  BuyerSignUp as BuyerSignUpView,
  SellerSignIn as SellerSignInView,
  SellerSignUp as SellerSignUpView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  SellerAddToProperty as SellerAddToPropertyView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/home"
      />
      <Redirect
      exact
      from="/seller/dashboard"
      to="/seller/addproperty"
      />
      <RouteWithLayout
        component={HomeView}
        exact
        layout={MinimalLayout}
        path="/home"
      />
      <RouteWithLayout
        component={PropertyListView}
        exact
        layout={PropertyLayout}
        path="/properties"
      />
      <RouteWithLayout
        component={BuyerSignUpView}
        exact
        layout={MinimalLayout}
        path="/buyer/sign-up"
      />
      <RouteWithLayout
        component={BuyerSignInView}
        exact
        layout={MinimalLayout}
        path="/buyer/sign-in"
      />
      <RouteWithLayout
        component={SellerSignUpView}
        exact
        layout={MinimalLayout}
        path="/seller/sign-up"
      />
      <RouteWithLayout
        component={SellerSignInView}
        exact
        layout={MinimalLayout}
        path="/seller/sign-in"
      />
      <RouteWithLayout
        component={SellerSignInView}
        exact
        layout={MinimalLayout}
        path="/seller/sign-in"
      />
      <RouteWithLayout
        component={SellerAddToPropertyView}
        exact
        layout={SellerLayout}
        path="/seller/addproperty"
      />

      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
