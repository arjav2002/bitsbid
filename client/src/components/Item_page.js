import React from 'react'
import Footer from './Footer'
import Item_body from './Item_body'
import Navbar from './Navbar'

import { useParams } from "react-router-dom";

const Item_page = () => {

  const { id } = useParams();

  return (
    <>
      <Navbar />
      <br />
      <Item_body itemid={id}/>
      <Footer />
    </>
  )
}

export default Item_page