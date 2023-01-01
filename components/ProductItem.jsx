/* eslint-disable @next/next/no-img-element */
import { GiMagnifyingGlass } from 'react-icons/gi';
import { BsCheckSquareFill } from 'react-icons/bs';
import { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProductItem({ product }) {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div className="card" data-aos="fade-down" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col justify-center gap-2 p-5 bg-sky-100">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg light-slate flex items-center gap-2">
              <BsCheckSquareFill className="text-lg" />
              {product.name}
            </h2>
          </a>
        </Link>
        <p className="mb-2 light-slate flex items-center gap-2">
          <BsCheckSquareFill className="text-lg" />
          {product.brand}
        </p>
        <p className="light-slate flex items-center gap-2">
          <BsCheckSquareFill className="text-lg" />${product.price}
        </p>
        <Link href={`/product/${product.slug}`}>
        <button
          className="rounded bg-light-red py-2 px-4 shadow outline-none hover: bg-light-slate text-white/80 font-bold flex justify-center items-center gap-2 hover:translate-y-1 duration-300"
          type="button"
        >
          View <GiMagnifyingGlass className="text-xl" />
        </button>
        </Link>
      </div>
    </div>
  );
}
