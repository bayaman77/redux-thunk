import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import UserLayout from '../layout/UserLayout'
import { userRoles } from '../lib/constans/common'
import { Meals as AdminMeals } from '../pages/admin/Meals'
import Orders from '../pages/admin/Orders'
import MealsPage from '../pages/user/Meals'
import SignInPage from '../pages/user/SignIn'
import SignUpPage from '../pages/user/SignUp'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  const role = useSelector((state) => state.auth.user.role)

  const isAllowed = (roles) => {
    return roles.includes(role)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute
            isAllowed={isAllowed([userRoles.GUEST, userRoles.USER])}
            fallBackPath="/admin/meals"
            component={UserLayout}
          />
        }
      >
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={isAllowed([userRoles.GUEST, userRoles.USER])}
              fallBackPath="/admin/meals"
              component={MealsPage}
            />
          }
        />
        <Route
          path="signup"
          element={
            <ProtectedRoute
              isAllowed={isAllowed([userRoles.GUEST])}
              fallBackPath={role === userRoles.ADMIN ? '/admin/meals' : '/'}
              component={SignUpPage}
            />
          }
        />
        <Route
          path="signin"
          element={
            <ProtectedRoute
              isAllowed={isAllowed([userRoles.GUEST])}
              fallBackPath={role === userRoles.ADMIN ? '/admin/meals' : '/'}
              component={SignInPage}
            />
          }
        />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute
            isAllowed={isAllowed([userRoles.ADMIN])}
            fallBackPath="/"
            component={AdminLayout}
          />
        }
      >
        <Route
          path="meals"
          element={
            <ProtectedRoute
              isAllowed={isAllowed([userRoles.ADMIN])}
              fallBackPath="/"
              component={AdminMeals}
            />
          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoute
              isAllowed={isAllowed([userRoles.ADMIN])}
              fallBackPath="/"
              component={Orders}
            />
          }
        />
      </Route>
      <Route path="*" element={<Typography>Page not found!!!</Typography>} />
    </Routes>
  )
}

export default AppRoutes
