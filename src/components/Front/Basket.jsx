import React, { useState } from 'react'
import {Delete, Trash2, Trash, ShoppingBag} from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart, showBasket } from '../../store/slices/basketSlice'

const Basket = () => {

  const basketIsVisible = useSelector(state => state.basket.basketIsVisible)
  const totalQuantity = useSelector(state => state.basket.totalQuantity)
  const totalPrice = useSelector(state => state.basket.totalAmount)

  const orders = useSelector(state => state.basket.items)
  const dispatch = useDispatch()
console.log(orders)
  return (
    <div className={`${basketIsVisible ? 'basket-left-margin' : 'basket-right-margin '}
     bg-[#fff] z-50 w-[320px] h-screen fixed right-0 shadow`}>
        <div onClick={() => dispatch(showBasket())} className='cursor-pointer flex justify-center items-center bg-[#F6F6F6] h-[86px]'>
            <img className='w-[22px]' src={require("../../assets/shopping-basket.png")} alt="basket-png"/>
            <h4 className='text-[#8633E0] pl-2 mt-2'>Basket</h4>
        </div>
        <div className=' overflow-auto h-[520px]'>
            {orders.length > 0 ? (
            orders.map((order, idx) => {
                return (
                <div className='my-3 relative  mx-2 border-b-[2px] border-[#F6F6F6]'>
                <div className='flex items-center'>
                    <div className='w-[80px] h-[80px]'><img src={`http://localhost:5000/${order.image}`} alt="wdwdwd" /></div> 
                    <div className='pl-2'>
                       <div className='font-medium'>{order.name}</div>
                        <div className='font-medium flex items-center py-1 justify-center'>
                            <div onClick={() => dispatch(removeItemFromCart(order.id))}
                             className='px-[2px] cursor-pointer relative w-[25px] h-[25px] text-center rounded-[3px] bg-[#F6F6F6] text-[#8633E0]'>
                                <p className='absolute text-[35px] top-[-17px] left-[5px]'>-</p>
                            </div>
                            <div className='px-[7px] '>{totalQuantity}</div>
                            <div onClick={() => dispatch(addItemToCart(order))}
                            className='px-[2px] cursor-pointer relative w-[25px] h-[25px] text-center rounded-[3px] bg-[#F6F6F6] text-[#8633E0]'>
                                <p className='absolute text-[26px] top-[-10px] left-[3px]'>+</p>
                            </div>
                        </div>
                        <div className='text-center text-[#8633E0] font-semibold'>{order.price}$</div>
                    </div>
                </div>
   
                <div>
                 
                </div>
                <div className='absolute right-2 bottom-[15px] cursor-pointer'>  <Trash2 size={18} className='mr-1'/></div>
                <div className='font-medium text-[18px] text-[#8633E0]  absolute right-2 top-0'>{order.totalPrice}$</div>
               </div> 
                )
            })
           
            ) : (
            <div className='flex flex-col mt-[150px] justify-center items-center'>
                <div className='text-[30px] text-[#8633E0]'>Basket is empty</div>
                <div ><ShoppingBag className='text-[#8633E0] mt-[30px]' size={72}/></div>
            </div>
            )}
           
        </div>
        <div className='bg-[#8633E0] absolute bottom-5 w-full mx-4 
        flex justify-between text-[#fff] text-[20px] cursor-pointer
            items-center py-3 px-5 rounded-[10px]'>
                <div>Order</div>
                <div>2299$</div>
            </div>
    </div>
  )
}

export default Basket