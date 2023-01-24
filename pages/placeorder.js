import Link from 'next/link';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function PlaceOrderScreen() {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems, shippingAddress, paymentMethod } = cart;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingAddress + taxPrice);

    const router = useRouter();
    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment');
        }
    }, [paymentMethod, router]);

    const [loading, setLoading] = useState(false);

    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/orders', {
                irderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                totalPrice,
            });
            setLoading(false);
            dispatch({ type: 'CART_CLEAR_ITEMS' });
            Cookies.set(
                'cart',
                JSON.stringify({
                    ...cart,
                    cartItems: [],
                })
            );
            router.push(`/order/${data._id}`);
        } catch (error) {
            setLoading(false);
            toast.error(getError(error));
        }
    };

    return (
        <Layout title="Place Order">
            <CheckoutWizard activeStep={3} />
            <h1 className="mb-4 text-xl text-white/80 my-10 font-mono w-fit py-2 px-2 bg-light-slate rounded-t-lg">
                Place Order
            </h1>
            {cartItems.lengh === 0 ? (
                <div>
                    Cart is empty. <Link href="/">Go Shopping</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <div className="card py-4 px-2 text-lg">
                            <h2 className="mb-2 text-lg">Shipping Address</h2>
                            <div>
                                {shippingAddress.fullName},{' '}
                                {shippingAddress.addres}, {''},
                                {shippingAddress.city},{' '}
                                {shippingAddress.postalCode},
                                {shippingAddress.country}
                            </div>
                        </div>
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Payment Method</h2>
                            <div className="">{paymentMethod}</div>
                            <div>
                                <button className="bg-light-slate rounded-lg px-3 py-1 text-white">
                                    <Link href="/shipping">Edit</Link>
                                </button>
                            </div>
                        </div>
                        <div className="card overflow-x-auto">
                            <h2 className="mb-2 text-lg px-3">Order Items</h2>
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="px-5 text-left">Item</th>
                                        <th className="p-5 text-right">
                                            Quantity
                                        </th>
                                        <th className="p-5 text-right">
                                            Price
                                        </th>
                                        <th className="p-5 text-right">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr
                                            className="border-b "
                                            key={item._id}
                                        >
                                            <td>
                                                <Link
                                                    href={`/product/${item.slug}`}
                                                >
                                                    <a className="flex items-center">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                        ></Image>
                                                        &nbsp;
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className="pr-10 text-right">
                                                {item.quantity}
                                            </td>
                                            <td className="pr-10 text-right">
                                                {item.price}
                                            </td>
                                            <td className="pr-10 text-right">
                                                ${item.quantity * item.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="">
                                <button className="bg-light-slate rounded-lg px-3 py-1 text-white">
                                    <Link href="/cart">Edit</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card p-5">
                        <h2 className="mb-2 text-lg">Order Summary</h2>
                        <ul>
                            <li>
                                <div className="mb-2 flex justify-between">
                                    <div className="">Items</div>
                                    <div>${itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="mb-2 flex justify-between">
                                    <div>Shipping</div>
                                    <div>${shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="mb-2 flex justify-between">
                                    <div>Total</div>
                                    <div>${totalPrice}</div>
                                </div>
                            </li>
                            <li>
                                <button
                                    className="w-full bg-light-slate rounded-lg px-4 py-2 text-white hover:translate-y-1 duration-200"
                                    disabled={loading}
                                    onClick={placeOrderHandler}
                                >
                                    {loading ? 'Loading...' : 'Place Order'}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </Layout>
    );
}

PlaceOrderScreen.auth = true;
