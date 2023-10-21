import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { CheckCircle, Edit3, Search, XCircle, Folder, PlusCircle, Trash2, Users } from 'react-feather';
import { DELETE, GET } from '../../../api/adminApi';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const User = () => {

  const [user, setUser] = useState('')
  const [search, setSearch] = useState('') 
  const [pageCount, setPageCount] = useState(1)
  console.log(pageCount)

  const [page, setPage] = useState(0);
  const perPage = 8;

  async function getItems() {
    const response = await GET(`/auth/user-list?page=${page}&limit=${perPage}&search=${search}`)
    setUser(response.paginatedItems)
    setPageCount(Math.ceil(response.totalItems/perPage))
}

//   async function searchItem(value) {
//     setSearch(value)
// 		const data = await GET(`/auth/search?page=${page}&limit=${perPage}&search=${search.toLowerCase()}`)
// 		setUser(data)
// };

//Pagination
  function handlePrevious() {
    setPage((page) => {
      if(page === 1) return page
      return page - 1
    })
  }
  function handleNext() {
    setPage((page) => {
      if(page === pageCount) return page
      return page + 1
    })
  }

  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

async function deleteItem(id) {
  await DELETE('/auth/user-list/' + id)
  getItems()
}

  // useEffect(() => {
  //   if(user){
  //     setPageCount()
  //   }
  // })

  useEffect(() => {
        getItems()
  },[page,search])

  return (
    <div className="background-white my-2 mx-3 box-shadow br-5 h-[680px]">
    <div className="fz20 border-bottom pl-3 py-3 my-2 d-flex align-items-center">
      <Users className='mr-2' color='#5C3EBA' /> <span className='text-[25px]'>Users</span>
    </div>
    <div className="px-3 pb-4 pt-2">
      <div className="mb-4 d-flex justify-content-between">
        <NavLink to='/admin/user/create' className="no-underline">
          <button className=" flex items-center bg-[#3ECF8E] p-2 rounded-md text-[#fff]">
            <PlusCircle size={18} className='mr-1' />
            <div className=''>Добавить новый</div>
          </button>
        </NavLink>
        <div className="relative">
          <Search size={14} color='#9D9BA3' className="absolute mt-[6px]" />
          <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="input-search pl-6 ff" placeholder='Search' />
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
             Array.isArray(user) ?
              user.map((idx,item) => {
              return (
                <tr key={item}>
                  <td className="text-center">{idx.username}</td>
                  <td className="text-center">{idx.email}</td>
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
                      {/* <button onClick={() => active(item)} className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}><CheckCircle color={'#5C3EBA'} size={16} /></button> */}
                      <NavLink to={'/admin/user/update/' + idx._id}><button className="btn btn-table" style={{ backgroundColor: '#F4F4F5' }}><Edit3 color={'#189ED3'} size={16} /></button></NavLink>
                      <button onClick={() => deleteItem(idx._id)} className="btn btn-table mr-0" style={{ backgroundColor: '#F4F4F5' }}><Trash2 color={'#E63950'} size={16} /></button>
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
      <div className='absolute right-5 bottom-0'>
        {/* <div>{pagination.pageCount}</div> */}
        {/* <div>{pagination.pageCount}</div> */}
        {/* <button disabled={page === 1} onClick={handlePrevious}>Previous</button>
        <button disabled={page === pageCount} onClick={handleNext}>Next</button> */}
        <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
      </div>
    </div>
  </div>
  )
}

export default User
