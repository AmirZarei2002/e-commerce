import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { IoChevronBackCircle, IoHome } from 'react-icons/io5';
import { IoIosHeart } from 'react-icons/io';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineStar } from 'react-icons/ai';
import { TbFileDescription, TbBrandAirtable } from 'react-icons/tb';
import { TiTickOutline, TiTick } from 'react-icons/ti';
import { FaDollarSign } from 'react-icons/fa';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { GrStatusPlaceholder } from 'react-icons/gr';

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { query } = useRouter(); 
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Products Not Found</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry, Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout title={product.name}>
      {/* top navbar */}
      <section data-aos="flip-right"
    data-aos-offset="200"
    data-aos-easing="ease-in-sine"
    data-aos-duration="600" className="flex items-center justify-around bg-gradient-to-l from-slate-600 to-slate-500 px-4 py-1 rounded-lg mb-3">
        <div>
          <button
            type="button"
            className="bg-light-red rounded-xl text-white p-1 text-[1.5rem] hover:translate-y-1 duration-200"
          >
            <Link href="/">
              <IoChevronBackCircle />
            </Link>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="bg-light-red rounded-xl text-white p-1 text-[1.5rem] hover:translate-y-1 duration-200"
          >
            <Link href="/">
              <IoHome />
            </Link>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="bg-light-red rounded-xl text-white p-1 text-[1.5rem] hover:translate-y-1 duration-200"
          >
            <Link href="/">
              <BiCategory />
            </Link>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="bg-light-red rounded-xl text-white p-1 text-[1.5rem] hover:translate-y-1 duration-200"
          >
            <Link href="/">
              <IoIosHeart />
            </Link>
          </button>
        </div>
      </section>
      {/* end of top navbar */}
      {/* card details */}
      <section data-aos-duration="600" data-aos="zoom-in-right" className="bg-light-yellow">
        <div className="grid md:grid-cols-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
              className="rounded-l-lg"
            ></Image>
          </div>
          <div className="grid">
            <div className="bg-light-slate w-full h-fit py-1 text-center rounded-b-xl">
              <h1 className="text-white text-md sm:text-xl animate-pulse">
                {product.name} Details
              </h1>
            </div>
            <div className="light-slate mt-2">
              <ul className="space-y-2 px-4 lg:space-y-8">
                <li className="flex gap-1">
                  <TiTickOutline className="text-xl sm:text-2xl light-red" />
                  <h2 className="text-lg">{product.name}</h2>
                </li>
                <li className="flex gap-1">
                  <BiCategory className="text-xl sm:text-2xl light-red" />
                  {product.category}
                </li>
                <li className="flex gap-1">
                  <TbBrandAirtable className="text-xl sm:text-2xl light-red" />{' '}
                  {product.brand}
                </li>
                <li className="flex gap-1">
                  <AiOutlineStar className="text-xl sm:text-2xl light-red" />{' '}
                  {product.rating} of {product.numReviews}
                </li>
                <li className="flex gap-1 truncate">
                  <TbFileDescription className="text-xl sm:text-2xl light-red" />
                  {product.description}
                </li>
              </ul>
            </div>
            <div className="px-4 mt-2">
              <p className="text-base text-justify font-thin leading-relaxed lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                dicta porro libero harum facere minima consequatur non dolorum
                officia amet.
              </p>
            </div>
            <div className="self-end">
              <div className="flex flex-col pt-2 w-full text-white rounded-t-lg shadow-lg bg-light-slate">
                <div className="flex justify-center items-center mr-6">
                  <FaDollarSign />
                  <div className="text-md">{product.price}</div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-md">status</p>
                  <div>
                    {product.countInStock > 0 ? (
                      <GrStatusPlaceholder className="bg-white" />
                    ) : (
                      <TiTick />
                    )}
                  </div>
                </div>
                <div>
                  <button
                    className="bg-light-red rounded-t-md py-1 sm:py-2 w-full flex justify-center items-center gap-2 hover:-translate-y-1 duration-300 hover:light-yellow"
                    onClick={addToCartHandler}
                  >
                    Add to Cart{' '}
                    <MdOutlineAddShoppingCart className="text-md sm:text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end of card details */}
    </Layout>
  );
}
