"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import toast from "react-hot-toast";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const userId = searchParams.get("userId");
  const { setCartItems } = useStore();

  const [verifying, setVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function verify() {
      if (!orderId) {
        setVerifying(false);
        return;
      }

      try {
        const res = await fetch("/api/order/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            success,
            userId,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setIsSuccess(true);
          setCartItems({});
          toast.success("Payment verified! Your food is being prepared.");
          setTimeout(() => {
            router.push(`/myorders?orderPlaced=true&orderId=${orderId}`);
          }, 2000);
        } else {
          setIsSuccess(false);
          toast.error(data.message || "Payment cancelled or failed");
        }
      } catch (err) {
        console.error(err);
        setIsSuccess(false);
      } finally {
        setVerifying(false);
      }
    }

    verify();
  }, [orderId, success, userId]);

  return (
    <div className="py-20 bg-gray-50 min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl border border-gray-100">
        {verifying ? (
          <div className="space-y-4">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-bold text-gray-900">Verifying Payment...</h2>
            <p className="text-xs text-gray-500">
              Communicating with Stripe &amp; preparing your kitchen ticket
            </p>
          </div>
        ) : isSuccess ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Payment Successful!</h2>
            <p className="text-sm text-gray-600">
              Your order has been received by our Delhi kitchen. We are preparing it fresh right now.
            </p>
            <div className="pt-4">
              <Link
                href={`/myorders?orderId=${orderId}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Track Live Order Status</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
              <XCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Payment Cancelled</h2>
            <p className="text-sm text-gray-600">
              The payment was not completed or was cancelled. No charges were made.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link
                href="/cart"
                className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs"
              >
                Back to Cart
              </Link>
              <Link
                href="/place-order"
                className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-sm"
              >
                Try Again
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm text-gray-500">Loading payment status...</p>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}

