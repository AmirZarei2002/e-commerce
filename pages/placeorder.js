import Link from 'next/link';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import Image from 'next/image';

export default function PlaceOrder() {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems, shippingAddress, paymentMethod } = cart;
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
                            <h2 className="mb-2 text-lg"> Shipping Address</h2>
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
                                <button className="bg-light-slate rounded-lg px-3 py-2 text-white duration-200">
                                    <Link href="/shipping">Edit</Link>
                                </button>
                            </div>
                        </div>
                        <div className="card overflow-x-auto">
                            <h2 className="mb-2 text-lg">Order Items</h2>
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
                                        <tr className="border-b" key={item._id}>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
