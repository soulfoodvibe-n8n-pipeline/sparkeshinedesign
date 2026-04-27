"use client";
import Link from "next/link";

export default function FloatingBookBtn() {
  return (
    <div className="floating-book-btn">
      <Link
        href="/book"
        className="btn-glam shadow-[0_4px_24px_rgba(183,110,121,0.45)]"
        style={{ fontSize: "0.8rem", padding: "0.75rem 1.5rem" }}
      >
        ✨ Book Now
      </Link>
    </div>
  );
}
