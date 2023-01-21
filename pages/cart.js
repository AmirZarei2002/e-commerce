import { useContext } from 'react';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartScreen = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl flex items-center justify-center light-yellow gap-2 font-mono opacity-90 2xl:text-4xl">
        Shopping Cart
        <ShoppingCartIcon className="text-2xl 2xl:text-4xl" />
      </h1>
      {cartItems.length === 0 ? (
        <div
          className="flex items-center justify-center mt-10 font-semibold text-lg font-mono gap-1 text-white/75 2xl:text-4xl"
        >
          Cart is empty!
          <div className="duration-300 light-red sm:light-slate">
            <Link href="/"> Go shopping &#128521;</Link>
          </div>
        </div>
      ) : (
        <div
          data-aos="fade-right"
          data-aos-duration="400"
          className="grid md:grid-cols-4 md:gap-5 border md:px-10 bg-slate-300 opacity-80 rounded-md shadow-lg p-2"
        >
          <div className="md:col-span-3">
            <table className="min-w-ful">
              <thead className="border-b light-slate font-mono">
                <tr>
                  <th className="text-left md:pl-8">Item</th>
                  <th className="text-right pr-1">Quantity</th>
                  <th className="text-right pr-3">Price</th>
                  <th className="text-right pr-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr className="border-b" key={item.slug}>
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex relative justify-center py-1">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={100}
                            height={80}
                            className="opacity-60 rounded-sm"
                          ></Image>
                          <span className="absolute self-center ml-1 dark-slate font-semibold md:mb-4">
                            {item.name}
                          </span>
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right max-h-4">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <DeleteIcon className="h-5 w-5 hover:light-red mt-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card mt-2 p-5 h-fit">
            <ul>
              <li>
                <div className="pb-3 text-lg dark-slate font-mono font-semibold">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}): $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  className="w-full flex items-center justify-center gap-1 bg-gradient-to-r from-yellow-500 via-red-400 to-slate-500 text-white/90 font-semibold rounded-md"
                  onClick={() => router.push('login?redirect=/shipping')}
                >
                  chack out
                  <AddShoppingCartIcon className="text-lg mb-[3px]" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
 