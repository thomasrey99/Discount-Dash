import { NextResponse, NextRequest } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";

export const GET = async (req: NextRequest) => {
    const name = req.nextUrl.searchParams.get("name");
  
    const productsSnapshot = await getDocs(query(collection(db, "products"), where("name", ">=", name), where("name", "<=", name + "\uf8ff")));
    const products = productsSnapshot.docs.map((doc) => doc.data());
    if (products.length === 0) {
      return NextResponse.json({ error: "Product not found" }, {status: 404 });
    }
    return NextResponse.json(products);
  }
  