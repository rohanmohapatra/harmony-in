import React, { useEffect, useState } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout ,Property as PropertyLayout, Seller as SellerLayout, Rentee as RenteeLayout, Buyer as BuyerLayout} from './layouts';
import axios from 'axios';
import {
  Home as HomeView,
  Dashboard as DashboardView,
  ProductList as ProductListView,
  PropertyList as PropertyListView,
  BuyerSignIn as BuyerSignInView,
  BuyerSignUp as BuyerSignUpView,
  SellerSignIn as SellerSignInView,
  SellerSignUp as SellerSignUpView,
  RenteeSignIn as RenteeSignInView,
  RenteeSignUp as RenteeSignUpView,
  ViewProperties as ViewPropertiesView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  SellerAddToProperty as SellerAddToPropertyView,
  RenteeAddToProperty as RenteeAddToPropertyView,
  WorkInProgress as WorkInProgressView,
  PaymentSignIn as PaymentSignInView,
  PaymentAddLandlord as PaymentAddLandlordView,
  PropertyPage as PropertyPageView,
  Analytics as AnalyticsView,

} from './views';

const Routes = (props) => {
  const {propertyIds} = props;
  useEffect(() => {
   console.log(propertyIds);
  }, []);
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
      <Redirect
      exact
      from="/rentee/dashboard"
      to="/rentee/addproperty"
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
        component={RenteeSignInView}
        exact
        layout={MinimalLayout}
        path="/rentee/sign-in"
      />
      <RouteWithLayout
        component={RenteeSignUpView}
        exact
        layout={MinimalLayout}
        path="/rentee/sign-up"
      />
      <RouteWithLayout
        component={SellerAddToPropertyView}
        exact
        layout={SellerLayout}
        path="/seller/addproperty"
      />
      <RouteWithLayout
        component={ViewPropertiesView}
        exact
        layout={SellerLayout}
        path="/seller/properties"
      />
      <RouteWithLayout
        component={RenteeAddToPropertyView}
        exact
        layout={RenteeLayout}
        path="/rentee/addproperty"
      />
      <RouteWithLayout
        component={ViewPropertiesView}
        exact
        layout={RenteeLayout}
        path="/rentee/properties"
      />
       <RouteWithLayout
        component={AnalyticsView}
        exact
        layout={SellerLayout}
        path="/seller/analytics"
      />
      <RouteWithLayout
        component={PaymentSignInView}
        exact
        layout={MinimalLayout}
        path="/payment/sign-in"
      />
      <RouteWithLayout
        component={PaymentAddLandlordView}
        exact
        layout={MinimalLayout}
        path="/payment/addlandlord"
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
      {propertyIds.map(propertyId => (
            <RouteWithLayout
            component={PropertyPageView}
            exact
            key={propertyId}
            propertyId = {propertyId}
            layout={BuyerLayout}
            path={propertyId}
          />
        ))}

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
