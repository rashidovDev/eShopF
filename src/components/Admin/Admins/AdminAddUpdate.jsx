import React, { useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { CheckCircle, Edit3, Search, XCircle, Folder, PlusCircle, Trash2, Users, User as Userr, UserX, UserPlus } from 'react-feather';
import { checkToken, DELETE, GET, PUT } from '../../../api/adminApi';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { BiUserCircle } from 'react-icons/bi';

const AdminAddUpdate = () => {

  const [user, setUser] = useState('')
  const [search, setSearch] = useState('') 
  const [pageCount, setPageCount] = useState(1)
  console.log(pageCount)

  const [page, setPage] = useState(0);
  const perPage = 7;

  async function getItems() {
    const response = await GET(`/auth/customer-list?page=${page}&limit=${perPage}&search=${search}`)
    setUser(response.paginatedItems)
    setPageCount(Math.ceil(response.totalItems/perPage))
}


  const handlePageClick = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

async function addAdmin(id) {
  await PUT('/auth/user-role/' + id)
  getItems()
}

  useEffect(() => {
        getItems()
  },[page,search])

  return (
    <div className="background-white mx-3 box-shadow br-5 h-[620px]">
    <div className="fz20 border-bottom pl-3 py-2 my-1 d-flex align-items-center">
      <UserPlus className='mr-2' color='#5C3EBA' /> <span className='text-[25px]'>Add Admin</span>
    </div>
    <div className="px-3 pb-4 pt-2">
      <div className="mb-4 d-flex justify-content-between">
        <div></div>
        <div className="relative">
          <Search size={14} color='#9D9BA3' className="absolute mt-[6px]" />
          <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className="z-0  pl-6 ff" placeholder='Search' />
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table table-bordered">
          <thead>
            <tr className='backgroung-grey'>
            <th className="text-center">#</th>
              <th className="text-center w-[200px]">Username</th>
              <th className="text-center">Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Country</th>
            </tr>
          </thead>
          <tbody style={{ overflowX: 'auto' }}>
            { 
             Array.isArray(user) ?
              user.map((idx,item) => {
              return (
                <tr key={item}>
                   <td className="text-center">{item + 1}</td>
                  <td className="text-left flex items-center">
                      <div>
                      {idx.avatar ?   <img className='w-[40px] h-[40px] object-cover rounded-full' src={`http://localhost:5000/${idx.avatar}`} alt="" />
                       : <BiUserCircle className='text-[40px] text-[#5C3EBA]'/>
                      }
                      </div>
                      <div className='ml-2 w-[150px]'>{idx.username}</div> 
                    </td>
                  <td className="text-center">{idx.email}</td>
            {
              idx.roles.length > 1 
              ?  <td className="text-center">
                {idx.roles[1]}
              </td>
              :
              <td className="text-center">
                 {idx.roles[0]}
                  </td>
            }
                  <td className="text-center">{idx?.country}</td>
                  <td className='text-center'>
                 
          
                    <button onClick={() => addAdmin(idx._id)} className="btn btn-table mr-0 w-[100px]" style={{backgroundColor: '#BA1823', color: "#fff"}}>Add+</button>
                
                  </td>
                </tr>
              )
            })
            : null
            }

          </tbody>
        </table>
      </div>
      <div className='absolute right-5 bottom-[-15px]'>
      
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

export default AdminAddUpdate
