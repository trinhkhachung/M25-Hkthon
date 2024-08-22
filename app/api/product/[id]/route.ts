import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

interface ParamType {
  params: {
    id: string;
  };
}
/// lấy thông tin theo id.
export async function GET(request: Request, { params }: ParamType) {
  const { id } = params;
  const filePath = path.join(process.cwd(), "app/dataBase/product.json");

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(data);

    const product = products.find(
      (pro: { id: number }) => pro.id === parseInt(id, 10)
    );

    if (!product) {
      return NextResponse.json({ message:"ko thấy"});
    }
    return NextResponse.json({ data: product });
  } catch (error) {
    return NextResponse.json({ message: "ko lấy được data" });
  }
}

// xóa sản phẩm
export async function DELETE(request: Request, { params }: ParamType) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "Thiếu id " });
  }

  const filePath = path.join(process.cwd(), "app/dataBase/product.json");

  try {
   
    const data = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(data);

    const productIndex = products.findIndex(
      (pro: { id: number }) => pro.id === parseInt(id, 10)
    );

    if (productIndex === -1) {
      return NextResponse.json({ message: "không tồn tại" });
    }
    const deletedProduct = products.splice(productIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({
      message: "Xóa thành công",
      data: deletedProduct,
    });
  } catch (error) {
    return NextResponse.json({ message: "thất bại" });
  }
}

//sửa sản phẩm
export async function PUT(request: Request, { params }: ParamType) {
  const { id } = params;
  const { productName, price, productImage, quantity } =
    await request.json();

  if (!productName && !price && !productImage && !quantity) {
    return NextResponse.json({ message: "Thiếu thông tin để cập nhật" });
  }

  const filePath = path.join(process.cwd(), "app/dataBase/product.json");

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(data);
    const productIndex = products.findIndex(
      (pro: { id: number }) => pro.id === parseInt(id, 10)
    );
    if (productIndex === -1) {
      return NextResponse.json({ message: "không tồn tại" });
    }

    if (productName) products[productIndex].productName = productName;
    if (price) products[productIndex].price = price;
    if (productImage) products[productIndex].productImage = productImage;
    if (quantity) products[productIndex].quantity = quantity;

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({
      message: "Cập nhật thành công",
      data: products[productIndex],
    });
  } catch (error) {
    return NextResponse.json({ message: "thất bại" });
  }
}