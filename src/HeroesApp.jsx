import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './ui/components/Navbar'
import { AuthProvider } from './auth/context/AuthProvider'

export const HeroesApp = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}