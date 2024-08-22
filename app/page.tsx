"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
export interface ProductType {
  id: number;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}
export default function page() {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const [products, setProducts] = useState<ProductType[]>([])
  // useEffect(() => {
  //   const fecthProduct = async () => {
  //     try {
  //       const response = await baseURL.get("/api/products");
  //       const data = await response.data;
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Lỗi, không thể lấy dữ liệu sản phẩm", error);
  //     }
  //   };
  //   fecthProduct();
  // }, []);
  return (
    <div className='flex'>
      <div className='w-[60%]'>
        <table className='border border-gray-600 mt-10 ml-10 w-[100%] border-collapse text-center table-auto h-auto'>
          <thead>
            <tr>
              <th className='border border-gray-600'>STT</th>
              <th className='border border-gray-600'>Tên sản phẩm</th>
              <th className='border border-gray-600'>Hình ảnh</th>
              <th className='border border-gray-600'>Giá</th>
              <th className='border border-gray-600'>Số lượng</th>
              <th className='border border-gray-600'>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return <tr className='border border-gray-600'>
                <td className='border border-gray-600'>{index + 1}</td>
                <td className='border border-gray-600'>{item.productName}</td>
                <td className='border border-gray-600'><Image className='ml-[15%] p-2' src={item.image} alt="táo" height={150} width={150} /></td>
                <td className='border border-gray-600'>{VND.format(item.price)}</td>
                <td className='border border-gray-600'>{item.quantity}</td>
                <td className='border border-gray-600'>
                  <button className='bg-slate-300 w-16 h-9 rounded-md'>Sửa</button>
                  <button className='bg-red-400 w-16 h-9 rounded-md ml-3'>Xóa</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <div className='border border-gray-400 mt-10 ml-28 w-[20%] '>
        <div className='text-xl font-bold text-center mt-4'>Thêm mới sản phẩm</div>
        <div className='w-[90%] flex flex-col gap-3'>
          <div className='flex flex-col ml-[10%]'>
            <label htmlFor="">Tên</label>
            <input type="text" className='border border-gray-400' required />
          </div>
          <div className='flex flex-col ml-[10%]'>
            <label htmlFor="">Hình ảnh</label>
            <input type="text" className='border border-gray-400' required />
          </div>
          <div className='flex flex-col ml-[10%]'>
            <label htmlFor="">Giá</label>
            <input type="text" className='border border-gray-400' required />
          </div>
          <div className='flex flex-col ml-[10%]'>
            <label htmlFor="">Số lượng</label>
            <input type="number" defaultValue={1} className='border border-gray-400' />
          </div>
        </div>
        <button className='w-[80%] h-9 bg-blue-500 rounded-md ml-[10%] text-white mt-4 mb-3'>Thêm</button>
      </div>
    </div>
  )
}