import React from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";

const TableRow = ({product, handleDelete, handleEdit }) => {
  return (
    <tr>
    <td>{product.name}</td>
    <td>{product.description}</td>
    <td>{product.price}</td>
    <td> 
        <span onClick={() => handleEdit(product._id)}> <MdEditNote /> </span> |
        <span onClick={() => handleDelete(product._id)}> <RiDeleteBin5Fill /></span>         
    </td>
  </tr>
  )
}

export default TableRow