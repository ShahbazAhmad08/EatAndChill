import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import User from "@/lib/models/User";
import Settings from "@/lib/models/Settings";
import Stripe from "stripe";
import { verifyToken } from "@/lib/jwt";

function getUserId(req, body) {
  if (body.userId || body.userid) return body.userId || body.userid;
  const tokenHeader = req.headers.get("token") || req.headers.get("authorization");
  if (tokenHeader) {
    const rawToken = tokenHeader.replace(/^Bearer\s+/i, "").trim();
    const decoded = verifyToken(rawToken);
    if (decoded && decoded.id) return decoded.id;
  }
  return null;
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const userId = getUserId(req, body);

    if (!userId) {
      return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
    }

    const { items, amount, address, paymentMethod = "stripe" } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, message: "No items in order" }, { status: 400 });
    }

    // Fetch settings to check allowed payment options & delivery charges
    let settings = await Settings.findOne({});
    if (!settings) settings = {};

    const deliveryFee = settings.deliveryFee !== undefined ? settings.deliveryFee : 50;
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // 1. CASH ON DELIVERY (COD)
    if (paymentMethod === "cod") {
      if (settings.codEnabled === false) {
        return NextResponse.json({ success: false, message: "Cash on delivery is currently disabled by admin." }, { status: 400 });
      }

      const newOrder = new Order({
        userId,
        items,
        amount,
        address,
        payment: false,
        paymentMethod: "cod",
        status: "Food processing",
      });
      await newOrder.save();

      // Clear user cart
      await User.findByIdAndUpdate(userId, { cartData: {} });

      return NextResponse.json({
        success: true,
        method: "cod",
        orderId: newOrder._id,
        message: "Order placed successfully with Cash on Delivery!",
        redirectUrl: `/myorders?orderPlaced=true&orderId=${newOrder._id}`,
      });
    }

    // 2. UPI / DIRECT QR PAYMENT
    if (paymentMethod === "upi") {
      if (settings.upiEnabled === false) {
        return NextResponse.json({ success: false, message: "UPI Payment is currently disabled by admin." }, { status: 400 });
      }

      const newOrder = new Order({
        userId,
        items,
        amount,
        address,
        payment: Boolean(body.transactionId),
        paymentMethod: "upi",
        transactionId: body.transactionId || "",
        deliveryNotes: body.deliveryNotes || address?.deliveryNotes || "",
        status: "Food processing",
      });
      await newOrder.save();

      // Clear user cart
      await User.findByIdAndUpdate(userId, { cartData: {} });

      return NextResponse.json({
        success: true,
        method: "upi",
        orderId: newOrder._id,
        message: "UPI Payment received! Order placed successfully.",
        redirectUrl: `/myorders?orderPlaced=true&orderId=${newOrder._id}`,
      });
    }

    // 3. STRIPE CARD PAYMENT (DEFAULT)
    if (settings.stripeEnabled === false) {
      return NextResponse.json({ success: false, message: "Online card payment is currently disabled by admin. Please select Cash on Delivery or UPI." }, { status: 400 });
    }

    const stripeKey = settings.stripeSecretKey || process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ success: false, message: "Stripe key not configured" }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey);

    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
      payment: false,
      paymentMethod: "stripe",
      status: "Food processing",
    });
    await newOrder.save();

    // Prepare line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add Delivery charge
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delhi Express Delivery Charges",
        },
        unit_amount: Math.round(deliveryFee * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}&userId=${userId}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}&userId=${userId}`,
    });

    return NextResponse.json({
      success: true,
      method: "stripe",
      session_url: session.url,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error in /api/order/placed:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to place order" }, { status: 500 });
  }
}

