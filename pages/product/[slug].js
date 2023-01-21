import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import data from '../../utils/data';

// icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CategoryIcon from '@mui/icons-material/Category';
import StarRateIcon from '@mui/icons-material/StarRate';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import DescriptionIcon from '@mui/icons-material/Description';
import DoneIcon from '@mui/icons-material/Done';
import AddBoxIcon from '@mui/icons-material/AddBox';

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
        const existItem = state.cart.cartItems.find(
            (x) => x.slug === product.slug
        );
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
            <section
                data-aos="flip-right"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="600"
                className="flex items-center justify-around bg-gradient-to-l from-slate-600 to-slate-500 px-4 py-1 rounded-t-lg mb-3"
            >
                <div>
                    <button
                        type="button"
                        className="bg-light-red rounded-sm px-2 sm:px-4 sm:py-1 text-white hover:translate-y-1 duration-300"
                    >
                        <Link href="/">
                            <ChevronLeftIcon />
                        </Link>
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        className="bg-light-red rounded-sm px-2 sm:px-4 sm:py-1 text-white hover:translate-y-1 duration-300"
                    >
                        <Link href="/">
                            <HomeIcon />
                        </Link>
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        className="bg-light-red rounded-sm px-2 sm:px-4 sm:py-1 text-white hover:translate-y-1 duration-300"
                    >
                        <Link href="/">
                            <CategoryIcon />
                        </Link>
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        className="bg-light-red rounded-sm px-2 sm:px-4 sm:py-1 text-white hover:translate-y-1 duration-300"
                    >
                        <Link href="/">
                            <FavoriteIcon />
                        </Link>
                    </button>
                </div>
            </section>
            {/* end of top navbar */}
            {/* card details */}
            <section
                // data-aos-duration="600"
                // data-aos="zoom-in-right"
                className="bg-light-yellow"
            >
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
                        <div className="bg-light-slate w-full h-fit py-1 text-center rounded-b-md">
                            <h1 className="text-white text-md sm:text-xl">
                                {product.name} Details
                            </h1>
                        </div>
                        <div className="light-slate mt-2">
                            <ul className="space-y-2 px-4 lg:space-y-8">
                                <li className="flex gap-1">
                                    <DoneIcon className="text-xl sm:text-2xl light-red" />
                                    <h2 className="text-lg">{product.name}</h2>
                                </li>
                                <li className="flex gap-1">
                                    <CategoryIcon className="text-xl sm:text-2xl light-red" />
                                    {product.category}
                                </li>
                                <li className="flex gap-1">
                                    <BrandingWatermarkIcon className="text-xl sm:text-2xl light-red" />{' '}
                                    {product.brand}
                                </li>
                                <li className="flex gap-1">
                                    <StarRateIcon className="text-xl sm:text-2xl light-red" />{' '}
                                    {product.rating} of {product.numReviews}
                                </li>
                                <li className="flex gap-1 truncate">
                                    <DescriptionIcon className="text-xl sm:text-2xl light-red" />
                                    {product.description}
                                </li>
                            </ul>
                        </div>
                        <div className="px-4 mt-2">
                            <p className="text-base text-justify font-thin leading-relaxed lg:text-lg">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Tempore dicta porro libero
                                harum facere minima consequatur non dolorum
                                officia amet.
                            </p>
                        </div>
                        <div className="self-end">
                            <div className="flex flex-col pt-2 w-full text-white rounded-t-md shadow-lg bg-light-slate">
                                <div className="flex justify-center items-center mr-6">
                                    {/* <FaDollarSign /> */}
                                    <div className="text-md">
                                        {product.price}$
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="bg-light-red rounded-t-md py-1 sm:py-2 w-full flex justify-center items-center gap-2 hover:-translate-y-1 duration-300 hover:light-yellow"
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart{' '}
                                        <AddBoxIcon className="text-md sm:text-xl" />
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
