import React from 'react'
import { IoTrashBinOutline } from "react-icons/io5"
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { PiShoppingCartBold } from "react-icons/pi";
import Swal from 'sweetalert2';
import { NavLink } from 'react-router';
import { IoBagCheckOutline } from "react-icons/io5"; 
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeItem } from '../Features/CartSlice';

const MyCart = () => {

  const items = useSelector((state) => state.myCart.items);
  console.log(items);

  const dispatch = useDispatch();


  // for deleting item
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        dispatch(removeItem(id));
        toast.success("Item deleted successfully!")
      }
    });
  }

  // for updating quantity
  const updateQuantity = (productId , type) => {
      if(type === 'increase'){
        dispatch(increaseQuantity(productId));
        toast.info("Quantity increased");
      } 
      else {
        dispatch(decreaseQuantity(productId));
        toast.warn("Quantity decreased");
      }
  }
  
  const totalPrice = items.reduce((total,item) => total + item.productQuantity * item.productPrice , 0 );

  // console.log(totalPrice)
  
  return (
    <div>
      <ToastContainer position="bottom-left"></ToastContainer>
      {
        items.length === 0 ?
        <div className='mt-30 lg:mt-50 flex flex-col justify-center items-center'>
          <h3 className='text-xl md:text-2xl lg:text-3xl font-semibold text-black'>There is no item in the cart</h3>
          <button> <NavLink className='btn btn-md bg-[#0A400C] text-white mt-5 border border-transparent hover:border-[#0A400C] hover:bg-transparent hover:text-[#0A400C]' to='/'><PiShoppingCartBold className='text-xl'></PiShoppingCartBold>Add Items</NavLink></button>
        </div>
        :
        <>
          <div className='mx-5 lg:mx-5 overflow-x-auto'>
              <table className="table w-full table-zebra mt-15 border border-black rounded-sm p-2">
            <thead>
              <tr>
                <th className='text-center text-lg'>#</th>
                <th className='text-center text-lg'>Product Name</th>
                <th className='text-center text-lg'>Product Price($)</th>
                <th className='text-center text-lg'>Quantity</th>
                <th className='text-center text-lg'>Added on</th>
                <th className='text-center text-lg'>Actions</th>
              </tr>
            </thead>
            <tbody>
                {
                  items.map((item,index) => (
                  <tr key={item.productId}>
                    <td className='whitespace-nowrap text-lg text-center'>{index+1}</td>
                    <td className='text-lg text-center whitespace-nowrap'>{item.productName}</td>
                    <td className='text-lg text-center whitespace-nowrap'>{item.productPrice}</td>
                    <td className='text-lg text-center whitespace-nowrap'>
                      <div className='flex justify-center items-center gap-2 whitespace-nowrap'>
                        <span>
                          <FiMinus onClick={() => updateQuantity(item.productId , "decrease")} className='bg-gray-200 rounded-sm text-gray-800 cursor-pointer text-xl lg:text-2xl p-1'></FiMinus>
                        </span>
                        <span>{item.productQuantity}</span>
                        <span>
                          <FaPlus onClick={() => updateQuantity(item.productId , "increase")} className='bg-gray-200 rounded-sm text-gray-800 cursor-pointer text-xl lg:text-2xl p-1'></FaPlus>
                        </span>
                      </div>
                    </td>
                    <td className='text-lg text-center whitespace-nowrap'>{item.addedOn}</td>
                    <td className="text-lg flex gap-2 justify-center items-center whitespace-nowrap">
                      <button 
                        onClick={() => handleDelete(item.productId)} 
                        className="btn btn-md bg-[#0A400C] text-white border border-transparent hover:border-[#0A400C] hover:bg-transparent hover:text-[#0A400C] transition-all duration-300 group"
                      >
                        <IoTrashBinOutline className='group-hover:rotate-18'></IoTrashBinOutline>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
                )}
              <tr className="font-bold text-lg bg-gray-200">
                <td colSpan="1" className="text-left">Total</td>
                <td colSpan="5" className="text-right">${totalPrice}</td>
              </tr>
            </tbody>
            </table>
          </div>
        </>
      }
      
      {
        items.length === 0 ? 
        <></>
        :
        <div className='flex justify-center items-center mt-20'>
          <button className='btn btn-lg rounded-lg text-[#0A400C] bg-white border border-[#0A400C] hover:border-[#0A400C] hover:bg-[#0A400C] hover:text-white transition-all duration-300'>
            <IoBagCheckOutline className='text-md'></IoBagCheckOutline> Process To Checkout 
          </button>
        </div>

      }

    </div>
  )
}

export default MyCart