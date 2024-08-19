import React from 'react'
import { Navbar } from '../../ui/components/Navbar'
import { HeroList } from '../components/HeroList';

export const DCPage = () => {
  return (
    <>
      <h1>DC Comics</h1>
      <hr />

      <HeroList publisher={"DC Comics"}/>
    </>
  )
};