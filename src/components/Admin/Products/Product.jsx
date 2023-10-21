import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { CheckCircle, Edit3, Search, XCircle, Folder, PlusCircle, Trash2 } from 'react-feather';
import { GET } from '../../../api/adminApi';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import axios from "axios"

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Product = () => {

  const [pageCount, setPageCount] = useState(1)
  const [product, setProduct] = useState('')

  const itemsPerPage = 4
  const [currentPage, setCurrentPage] = useState(0)
  
  async function getItems() {
    const data = await GET("/product")
    console.log(data.length)
    console.log("PAGE", pageCount)
    setProduct(data)
    setPageCount(Math.ceil(data.length / itemsPerPage))
  }
  
	async function paginate(data) {
    setCurrentPage(data.selected);  
    console.log(currentPage)
		const response = await GET(`/product/product-list/?page=${currentPage + 1}&limit=${itemsPerPage}`)
    setProduct(response)
	};
 
  console.log(product)
  useEffect(() => {
    getItems()
  },[])

  return (
    <div className="background-white my-2 mx-3 box-shadow br-5">
    <div className="fz20 border-bottom pl-3 py-3 my-2 d-flex align-items-center">
      <Folder className='mr-2' color='#5C3EBA' /> <span>Product</span>
    </div>
    <div className="px-3 pb-3 pt-2">
      <div className="mb-4 d-flex justify-content-between">
        <NavLink to='/admin/product/create'>
          <button className="btn btn-purple d-flex align-items-center">
            <PlusCircle size={18} className='mr-1' />
            <div>Добавить новый</div>
          </button>
        </NavLink>
        <div className="position-relative">
          <Search size={14} color='#9D9BA3' className="input-search-icon" />
          {/* <DebounceInput minLength={3} debounceTimeout={400} onChange={(e) => search(e)} type="text" className="input-search" size={24} placeholder='Поиск' /> */}
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table table-bordered">
          <thead>
            <tr className='backgroung-grey'>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Phone Number</th>
              <th className="text-center">Country</th>
              <th className="text-center">Purchases</th>
              <th className="text-center">Rating</th>
              <th className="text-center">Total purchase</th>
            </tr>
          </thead>

          <tbody style={{ overflowX: 'auto' }}>

            { 
             Array.isArray(product) ?
              product.map((idx,item) => {
              return (
                <tr key={item}>
                  <td className="text-center">{idx.name}</td>
                  <td className="text-center">{idx.imageUrl}</td>
                  <td className="text-center">{idx?.phoneNumber}</td>
                  <td className="text-center">{idx?.countryName}</td>
                  <td className="text-center">{idx?.purchase}</td>
                  <td className="text-center">{idx?.rating}</td>
                  <td className="text-center">{idx?.totalPurchase}</td>
                  <td className="text-center">
                    {
                      item.activated ?
                        <button className="btn p-2 br-5 text-white d-flex align-items-center justify-content-center m-auto" style={{ backgroundColor: '#189ED3' }}><CheckCircle size={16} /></button>
                        : <button className="btn p-2 br-5 text-white d-flex align-items-center justify-content-center m-auto" style={{ backgroundColor: '#E63950' }}><XCircle size={16} /> </button>
                    }
                  </td>
                  <td>
                    <div className="d-flex">
                      {/* <button onClick={() => active(item)} className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}><CheckCircle color={'#5C3EBA'} size={16} /></button>
                      <Link to={'/admin/brands/update/' + item.id}><button className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}><Edit3 color={'#189ED3'} size={16} /></button></Link>
                      <button onClick={() => deleteItem(item.id)} className="btn btn-table mr-0" style={{ backgroundColor: '#F4F4F5' }}><Trash2 color={'#E63950'} size={16} /></button> */}
                    </div>
                  </td>
                </tr>
              )
            })
            : null
            }

          </tbody>
        </table>
      </div>
      {
        pageCount > 1 &&
        <ReactPaginate
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          onPageChange={paginate}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
        />
      }
    </div>
  </div>
  )
}

export default Product
