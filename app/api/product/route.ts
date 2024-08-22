import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

//lấy dữ liệu
export async function GET() {
  const filePath = path.join(process.cwd(), "app/dataBase/product.json");
  
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(data);
    return NextResponse.json({ data: products });
  } catch (error) {
    return NextResponse.json({error });
  }
}

//thêm mới
export async function POST(request: Request) {
  const { id, productName, price, productImage, quantity } =
    await request.json();

  if (!productName || !price || !productImage || !quantity) {
    return NextResponse.json({ message: "Thông tin thiếu " });
  }

  const filePath = path.join(process.cwd(), "app/dataBase/product.json");

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(data);
    const existingProduct = products.find(
      (pro: { productName: string }) => pro.productName === productName
    );
    if (existingProduct) {
      return NextResponse.json({ message: "sản phẩm đã tồn tại" });
    }


    const newProduct = { id, productName, price, productImage, quantity };
    products.push(newProduct);

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    return NextResponse.json({
      message: "Thêm mới thành công",
      data: newProduct,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}