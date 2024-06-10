import React from 'react';
import { useAuth } from "../contexts/AuthContext";
// import {logo, poster, i_dashboard, profile_page, auctions_page, node_page} from "../assets/home_assets"
import {poster} from "../assets/home_assets"
import {code, dashboard, switches} from "../assets/home_assets/icons"
import { MyVerticallyCenteredModal } from '../components/home_comp';

import { Link } from "react-router-dom";
import '../css/home_css/index.css';
import '../css/home_css/temp.css';
import '../css/home_css/signup.css';


export default function Home() {

    const [modalShow, setModalShow] = React.useState(false);
    const { currentUser } = useAuth()

  return (
    <>

        <div>
            {/* <%= connected%> */}
            {/* <%= message%> */}
        </div>
        {/* <!-- Modal --> */}

        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}/>

        {/* Modal ends */}
        <div data-server-rendered="true" id="__nuxt">
            {/* <!----> */}
            <div id="__layout">
                <div className="relative flex flex-col flex-1">
                    <header className="absolute top-0 left-0 right-0 z-30 flex-shrink-0" data-v-84d642e8>
                        <nav className="container-1080" data-v-84d642e8>
                            <div className="flex items-center justify-between h-20" data-v-84d642e8>

                                {/* <!-- LOGO --> */}
                                <a href="/" aria-current="page" className="w-40 nuxt-link-exact-active nuxt-link-active"
                                    data-v-84d642e8><img crossOrigin="anonymous" width="100%" src="https://drive.lienuc.com/uc?export=view&id=1YLkAhZKaEsVcvFvZbuNYUSL3oAla6iP7" alt="" className="h-auto" />
                                </a>
                                <div className="items-center justify-between space-x-2 hidden lg:flex" data-v-84d642e8>
                                    {/* <!-- classNamees removed ---- px-8 text-sm cursor-pointer hover:text-primary-grey-dark --> */}
                                    <a href="#section-2" target="_self" rel="noopener noreferrer"
                                        className="flex items-center justify-center flex-shrink-0 px-8 py-2 font-semibold border rounded-md md:mt-0 bg-trasparent border-primary-blue-dark text-primary-blue-dark hover:text-primary-blue-hover hover:border-primary-blue-hover"
                                        data-v-84d642e8>
                                        Read More
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" className="ml-2" data-v-84d642e8>
                                            <path
                                                d="M13.5281 0.877396C13.512 0.802584 13.4747 0.734003 13.4206 0.679898C13.3665 0.625792 13.2979 0.588464 13.223 0.5724C12.4178 0.399902 11.7879 0.399902 11.1602 0.399902C8.57952 0.399902 7.0316 1.77988 5.87654 3.59986H3.27084C3.04831 3.60005 2.83021 3.66208 2.6409 3.77902C2.45159 3.89596 2.29853 4.06322 2.19881 4.2621L0.962974 6.73206C0.917335 6.82356 0.895842 6.9252 0.900534 7.02734C0.905227 7.12947 0.935949 7.22872 0.989786 7.31565C1.04362 7.40258 1.11879 7.47431 1.20815 7.52404C1.29751 7.57378 1.3981 7.59985 1.50037 7.5998H4.09532L3.53342 8.16154C3.38338 8.31156 3.2991 8.51502 3.2991 8.72716C3.2991 8.9393 3.38338 9.14275 3.53342 9.29278L4.80626 10.5655C4.88057 10.6398 4.96879 10.6988 5.06589 10.739C5.16299 10.7792 5.26706 10.7999 5.37216 10.7999C5.47726 10.7999 5.58133 10.7792 5.67843 10.739C5.77553 10.6988 5.86375 10.6398 5.93806 10.5655L6.49996 10.0038V12.5997C6.49993 12.7019 6.52602 12.8025 6.57575 12.8918C6.62548 12.9811 6.69721 13.0562 6.78413 13.11C6.87105 13.1638 6.97028 13.1945 7.07241 13.1993C7.17454 13.204 7.27618 13.1825 7.36769 13.137L9.83586 11.9022C10.0351 11.8027 10.2027 11.6497 10.3198 11.4602C10.4368 11.2708 10.4987 11.0524 10.4985 10.8298V8.21954C12.3138 7.06206 13.6994 5.50958 13.6994 2.94237C13.7019 2.31238 13.7019 1.68238 13.5281 0.877396ZM10.501 4.59984C10.3032 4.59984 10.1098 4.54119 9.94532 4.43131C9.78082 4.32144 9.65262 4.16526 9.57691 3.98254C9.5012 3.79981 9.48139 3.59875 9.51999 3.40477C9.55858 3.21079 9.65385 3.03261 9.79374 2.89276C9.93363 2.75291 10.1119 2.65767 10.3059 2.61909C10.4999 2.5805 10.701 2.6003 10.8838 2.67599C11.0666 2.75168 11.2228 2.87985 11.3327 3.04429C11.4426 3.20874 11.5013 3.40208 11.5013 3.59986C11.5013 3.86507 11.3959 4.11942 11.2083 4.30695C11.0207 4.49449 10.7663 4.59984 10.501 4.59984Z"
                                                fill="rgba(173, 44, 211)" data-v-84d642e8></path>
                                        </svg>
                                    </a>

                                    {!currentUser && 
                                    
                                        <button target="_self" rel="noopener noreferrer"
                                            className="px-5 py-1 text-sm font-semibold whitespace-no-wrap transition-all duration-150 border rounded px-8 py-2 text-white button-primary bg-primary-blue border-primary-blue hover:bg-primary-blue-hover hover:border-primary-blue-hover" 
                                            type="button" variant="primary" onClick={() => setModalShow(true)}>

                                            <div className="flex items-center justify-center">Dashboard
                                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                                    <path d="M6.5 1L10.5 5M10.5 5L6.5 9M10.5 5H0" strokeWidth="1.7"
                                                        className="stroke-current">
                                                    </path>
                                                </svg>
                                            </div>
                                        </button>
                                    }

                                    {currentUser && 
                                    
                                        <Link to="/profile" target="_self" rel="noopener noreferrer"
                                        className="px-5 py-1 text-sm font-semibold whitespace-no-wrap transition-all duration-150 border rounded px-8 py-2 text-white button-primary bg-primary-blue border-primary-blue hover:bg-primary-blue-hover hover:border-primary-blue-hover btn btn-primary" 
                                        type="button">

                                            <div className="flex items-center justify-center">Dashboard
                                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                                    <path d="M6.5 1L10.5 5M10.5 5L6.5 9M10.5 5H0" strokeWidth="1.7"
                                                        className="stroke-current">
                                                    </path>
                                                </svg>
                                            </div>
                                        </Link>
                                    }


                                    {/* <% } %> */}



                                </div>
                            </div>
                        </nav> 
                    </header>
                    <div className="flex flex-1 w-full mx-auto"  
                    // style="flex:1 0 auto;"
                    >
                        <main className="w-full">
                            <article className="relative overflow-hidden bg-white pt-56 md:pt-48" data-v-0dfd239e>
                                <div className="relative items-center justify-between text-center container-1080 md:flex md:text-left"
                                    data-v-0dfd239e>
                                    <div className="w-full md:w-1/2" data-v-0dfd239e>
                                        <h1 className="max-w-3xl mx-auto text-4xl font-bold leading-10 md:text-6xl md:leading-16"
                                            data-v-0dfd239e>
                                            Peer-2-Peer <span className="text-primary-blue-dark" data-v-0dfd239e>Energy</span>
                                            <br data-v-0dfd239e />
                                            Sharing Infrastructure
                                        </h1>
                                        <p className="max-w-xl mx-auto mt-8 text-lg leading-7 text-font-quaternary"
                                            data-v-0dfd239e>
                                            Trade energy seamlessly by leveraging the power of Decentralisation.
                                        </p>
                                        <div className="items-center w-full mt-12 md:flex md:mt-8" data-v-0dfd239e><a href="#section-5"
                                                target="_self" rel="noopener noreferrer"
                                                className="flex items-center bg-white justify-center flex-shrink-0 h-12 px-16 mt-4 font-semibold border-2 rounded-md md:mt-0 bg-trasparent border-primary-blue-dark text-primary-blue-dark hover:text-primary-blue-hover hover:border-primary-blue-hover"
                                                style={{zIndex: '100'}} data-v-0dfd239e>
                                                Learn more →
                                            </a></div>
                                    </div>
                                    <div className="w-full mt-10 md:mt-0 md:w-1/2 md:ml-12" data-v-0dfd239e><img
                                            src={poster} alt=""
                                            className="relative z-30 object-contain cursor-pointer" data-v-0dfd239e /></div>
                                </div>
                                <div aria-labelledby="modal-title" role="dialog" aria-modal="true" aria-hidden="true"
                                    className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-opacity-30 bg-primary-dark"
                                    style={{display:"none"}} data-v-0dfd239e>
                                    <div className="flex flex-grow max-w-screen-lg bg-white bg-opacity-50 shadow-lg"
                                        style={{height:"54vw", maxHeight: "75%", display: "none"}} data-v-0dfd239e>
                                        <iframe height="100%" width="100%" src="https://www.youtube.com/embed/ljOaetVKHK8"
                                            title="YouTube video player" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen="allowFullScreen" className="flex-1" data-v-0dfd239e></iframe>
                                    </div>
                                </div>
                            </article>
                            <section className="content-block bg-black content-block--padded" id="section-2">

                                <div className="container-fluid container-padded-lg">
                                    <div className="row row--gutter-lg align-items-center">

                                        <div className="col-md-6">
                                            <div className="content-block__media rellax-false">
                                                <img crossOrigin="anonymous" width="1024" height="591"
                                                    src="https://drive.lienuc.com/uc?export=view&id=1hneEbMjhFlDWVt__3T6CStMXrYW9IbOV"
                                                    className="content-block__image" alt="" decoding="async" loading="lazy"
                                                    sizes="(max-width: 1024px) 100vw, 1024px" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="content-block__body">
                                                <h2 className="content-block__title">Easy Trading on our platform
                                                </h2>
                                                <p>PowerX provides an easy-to-use environment for a smooth trading experience. You can also boost your entry through our Plus subscription.</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                            <section className="content-block bg-black content-block--padded" id="section-3">

                                <div className="container-fluid container-padded-lg">
                                    <div className="row row--gutter-lg align-items-center flex-row-reverse">

                                        <div className="col-md-6">
                                            <div className="content-block__media rellax-false">
                                                <img crossOrigin="anonymous" width="1024" height="591"
                                                    src="https://drive.lienuc.com/uc?export=view&id=1nHMrL6SbgZDBz7jWIzg01oZwFrIeDB8E"
                                                    className="content-block__image" alt="" decoding="async" loading="lazy"
                                                    sizes="(max-width: 1024px) 100vw, 1024px" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="content-block__body">
                                                <h2 className="content-block__title">A Compact Dashboard
                                                </h2>
                                                <p>Our dashboard provides all the necessary information at a single place and allows you to navigate between buying or supplying energy.</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                            <section className="content-block bg-black content-block--padded" id="section-4">

                                <div className="container-fluid container-padded-lg">
                                    <div className="row row--gutter-lg align-items-center">

                                        <div className="col-md-6">
                                            <div className="content-block__media rellax-false">
                                                <img crossOrigin="anonymous" width="1024" height="591"
                                                    src="https://drive.lienuc.com/uc?export=view&id=1NQDWaB4jk8wrVWcqPQQb5Hvk_byYnzwJ"
                                                    className="content-block__image" alt="" decoding="async" loading="lazy"
                                                    sizes="(max-width: 1024px) 100vw, 1024px" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="content-block__body">
                                                <h2 className="content-block__title">Connect with other nodes.
                                                </h2>
                                                <p>Once your transmission infrastructure is built with your neighbours, you can easily connect to other members in the same decentralised network with just a single click.
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>
                            <div className="py-8" id='section-5'>
                                <div className="flex flex-col space-y-16 container-1080">
                                    <div className="flex flex-col-reverse md:flex-row justify-between items-center pb-16">
                                        <div className="flex flex-col justify-center md:items-start items-center space-y-6"><img
                                                width="100%" src="https://drive.lienuc.com/uc?export=view&id=1YLkAhZKaEsVcvFvZbuNYUSL3oAla6iP7" alt=""
                                                className="h-auto w-64 md:w-40" id="special-img" />
                                            <div className="max-w-md w-full text-gray-500">
                                                The premier interface for Energy Trading! Create your
                                                <span className="text-primary-blue-dark"> free account</span> and join the
                                                community of power peers!
                                                <span className="text-primary-blue-dark"> Broaden your node network </span>
                                                and make the most savings on power assets 🤑
                                            </div> 

                                            {!currentUser && 

                                                <Link to="/" target="_self" rel="noopener noreferrer"
                                                className="flex items-center w-full md:w-1/2 justify-center flex-shrink-0 h-12 px-10 font-semibold text-white border-2 border-transparent rounded-md bg-primary-blue-dark hover:bg-primary-blue-hover" onClick={() => setModalShow(true)}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mr-2.5 text-white hover:opacity-90">
                                                    <rect width="9" height="4" rx="1" fill="white"></rect>
                                                    <rect y="12" width="9" height="4" rx="1" fill="white"></rect>
                                                    <rect x="7" y="6" width="9" height="4" rx="1" fill="white"></rect>
                                                    <rect x="11" width="5" height="4" rx="1" fill="white"></rect>
                                                    <rect x="11" y="12" width="5" height="4" rx="1" fill="white"></rect>
                                                    <rect y="6" width="5" height="4" rx="1" fill="white"></rect>
                                                </svg>

                                                Dashboard
                                                </Link>
                                            }

                                            {currentUser && 
                                            
                                                <Link to="/profile" target="_self" rel="noopener noreferrer"
                                                className="flex items-center w-full md:w-1/2 justify-center flex-shrink-0 h-12 px-10 font-semibold text-white border-2 border-transparent rounded-md bg-primary-blue-dark hover:bg-primary-blue-hover">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mr-2.5 text-white hover:opacity-90">
                                                    <rect width="9" height="4" rx="1" fill="white"></rect>
                                                    <rect y="12" width="9" height="4" rx="1" fill="white"></rect>
                                                    <rect x="7" y="6" width="9" height="4" rx="1" fill="white"></rect>
                                                    <rect x="11" width="5" height="4" rx="1" fill="white"></rect>
                                                    <rect x="11" y="12" width="5" height="4" rx="1" fill="white"></rect>
                                                    <rect y="6" width="5" height="4" rx="1" fill="white"></rect>
                                                </svg>

                                                Dashboard
                                                </Link>
                                            }
                                        </div> <img crossOrigin="anonymous" width="100%" src="https://drive.lienuc.com/uc?export=view&id=1xkNLpuEPCI4TU-Sz5kMwmQNorlkIjS2r" alt=""
                                            className="h-auto w-5/6 md:w-1/2" style={{zIndex: "11"}} />
                                    </div>

                                    {/* <!-- Down arrow sign --> */}
                                    <div className="w-full h-1 bg-indigo-200 relative">
                                        <div className="absolute w-full flex justify-center items-center" style={{top: "-1.1rem"}}>
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" className="bg-white w-32">
                                                <path opacity="0.3" d="M10 22L20 30L30 22" stroke="#3F75FF" strokeWidth="4"
                                                    strokeLinecap="round"></path>
                                                <path opacity="0.3" d="M10 10L20 18L30 10" stroke="#3F75FF" strokeWidth="4"
                                                    strokeLinecap="round"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <article className="relative bg-light-blue py-32 lg:pb-32">
                                <div className="container-1080 md:py-8 lg:py-2">
                                    <div className="grid grid-cols-1 gap-y-8 sm:gap-8 sm:grid-cols-3">
                                        <div className="max-w-md space-y-3">
                                            <div>
                                                <div src={switches}
                                                    className="flex items-center justify-center w-10 h-10"><img
                                                        src={switches} width="100%" alt="" /></div>
                                            </div>
                                            <div className="text-xl">
                                                Fast Profit
                                            </div>
                                            <div className="leading-7 text-font-secondary">
                                            Make money instantly by selling ur excess energy stored at home.
                                            </div>
                                        </div>
                                        <div className="max-w-md space-y-3">
                                            <div>
                                                <div src={dashboard}
                                                    className="flex items-center justify-center w-10 h-10"><img
                                                        src={dashboard} width="100%" alt="" /></div>
                                            </div>
                                            <div className="text-xl">
                                                100% trustworthy
                                            </div>
                                            <div className="leading-7 text-font-secondary">
                                            Your data is safe with us and we do not share your information with any third-party platform.
                                            </div>
                                        </div>
                                        <div className="max-w-md space-y-3">
                                            <div>
                                                <div src={code}
                                                    className="flex items-center justify-center w-10 h-10"><img
                                                        src={code} width="100%" alt="" /></div>
                                            </div>
                                            <div className="text-xl">
                                                Built with Blockchain tech
                                            </div>
                                            <div className="leading-7 text-font-secondary">
                                            By using blockchain we made every transaction transparent and secured in the whole system. No hidden transaction can take place.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <article className="relative bg-primary-dark pt-16" data-v-aca89e78>
                                <div className="relative container-1080" data-v-aca89e78>
                                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 md:gap-x-12" data-v-aca89e78>
                                        <div data-v-aca89e78>
                                            <div className="text-sm font-bold text-primary-green" data-v-aca89e78>SECURE AND
                                                VIABLE</div>
                                            <h2 className="mt-4 text-4xl font-bold leading-10 text-white" data-v-aca89e78>
                                                Smart Contracts</h2>
                                            <p className="mt-4 text-lg text-font-tertiary" data-v-aca89e78>
                                            The smart contracts automate the execution of agreements so that all consumers can ascertain the outcome instantly without the involvement of an intermediary or time delay.
                                            </p>
                                            <ul className="mt-6 space-y-2 text-sm leading-6 text-primary-blue" data-v-aca89e78>
                                                <li className="flex items-center" data-v-aca89e78>Start with your free account
                                                </li>
                                                <li className="flex items-center" data-v-aca89e78>Execute trading and supplying
                                                </li>
                                                <li className="flex items-center" data-v-aca89e78>Build community availability
                                                </li>
                                            </ul>

                                            {!currentUser && 

                                                <Link to="/" target="_self" rel="noopener noreferrer"
                                                className="px-5 py-1 text-sm font-semibold whitespace-no-wrap transition-all duration-150 border rounded hidden mt-6 md:inline-flex text-white button-primary bg-primary-blue border-primary-blue hover:bg-primary-blue-hover hover:border-primary-blue-hover"
                                                data-v-aca89e78 onClick={() => setModalShow(true)}>
                                                <div className="flex items-center justify-center">
                                                    Sign In 
                                                    <svg width="12"
                                                        height="10" viewBox="0 0 12 10" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                                        <path d="M6.5 1L10.5 5M10.5 5L6.5 9M10.5 5H0" strokeWidth="1.7"
                                                            className="stroke-current">
                                                        </path>
                                                    </svg>
                                                </div>
                                                </Link>
                                            }

                                            {currentUser && 
                                            
                                                <Link to="/profile" target="_self" rel="noopener noreferrer"
                                                className="px-5 py-1 text-sm font-semibold whitespace-no-wrap transition-all duration-150 border rounded hidden mt-6 md:inline-flex text-white button-primary bg-primary-blue border-primary-blue hover:bg-primary-blue-hover hover:border-primary-blue-hover"
                                                data-v-aca89e78>
                                                <div className="flex items-center justify-center">
                                                    Sign In 
                                                    <svg width="12"
                                                        height="10" viewBox="0 0 12 10" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                                        <path d="M6.5 1L10.5 5M10.5 5L6.5 9M10.5 5H0" strokeWidth="1.7"
                                                            className="stroke-current">
                                                        </path>
                                                    </svg>
                                                </div>
                                                </Link>
                                            }
                                        </div>
                                        <div className="relative z-30 flex flex-col w-full px-8 py-10 border rounded block-code border-lines-secondary"
                                            data-v-aca89e78>
                                            <ol className="space-y-1 text-white" data-v-aca89e78>
                                                <li data-v-aca89e78><span style={{color: "#7a92f6"}} data-v-aca89e78>let </span>
                                                    nodes = <span style={{color: "#7a92f6"}} data-v-aca89e78>API.fetch()</span>
                                                </li>
                                                {/* MAKE FIXES */}
                                                <li data-v-aca89e78></li>
                                                <li data-v-aca89e78>nodes.add{'({'}</li>
                                                <li data-v-aca89e78> bidder: <span className="text-orange-500"
                                                        data-v-aca89e78> &quot;0x2f...6a&quot;</span>,</li>
                                                <li data-v-aca89e78> qty: <span style={{color: "#fcc659"}} data-v-aca89e78>
                                                        &quot;32 KWh&quot;</span>,</li>
                                                <li data-v-aca89e78> expiry: <span className="text-orange-500" data-v-aca89e78>
                                                        [&quot;28-02-2023&quot;]</span>,</li>
                                                <li data-v-aca89e78>{'})'}</li>
                                                <li data-v-aca89e78></li>
                                                <li data-v-aca89e78>nodes.<span style={{color: "#7a92f6"}}
                                                        data-v-aca89e78>create()</span></li>
                                            </ol>
                                            <hr className="my-8 border-lines-secondary" data-v-aca89e78 />
                                            <h6 className="text-sm text-white" data-v-aca89e78>Make Community better for
                                                everyone
                                            </h6>
                                            <p className="mt-4 max-w-md text-sm text-font-tertiary" data-v-aca89e78>
                                            As interconnectivity between nodes increase, serivice charges involved in transmission
                                            will decrease, & so will the total cost. We aim to scale the system across cities & states,
                                            hereby covering a large network of energy peers!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </main>
                    </div>
                    <footer className="py-16 lg:pt-48 lg:pb-32 bg-primary-grey flex-shrink-0">
                        <div className="flex-center">
                            <div className='custom-footer-home'>
                                <div className="text-sm font-semibold custom-inner-text-home">Made with 💖 by team PowerX</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </>
  );
}