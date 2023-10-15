import React from 'react'
import { useDispatch } from 'react-redux'
import { showLoader } from '../../../store/slices/loaderSlice'

const Product = () => {

  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch(showLoader())} >Press</button>
    
      </div>
  )
}

export default Product