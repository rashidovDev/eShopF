import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {hideModal} from "../../store/slices/modalSlice"


const Modal = (props) => {

  const dispatch = useDispatch()

  const modal = useSelector(state => state.modal.modal)

  return (
    <div onClick={() => dispatch(hideModal())}
    className={`fixed top-0 bottom-0 bg-black bg-opacity-50 right-0 z-10  left-0 ${modal ? 'flex' : 'hidden'}  justify-center items-center`}>
           <div onClick={(e) => e.stopPropagation()} className='bg-[#fff] z-20 rounded-[10px]  m-auto relative p-3 items-center justify-center flex'>
            {props.children}
            </div>
    </div>
  )
}

export default Modal