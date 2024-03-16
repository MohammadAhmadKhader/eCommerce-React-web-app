import React from 'react'
import SingleHandpickedCollection from './SingleHandpickedCollection'

function HandPickedCollections() {
    return (
        <section className='px-4 my-10 p-10' style={{ backgroundColor: "rgb(7, 89, 133)" }}>
            <h2 className='text-xl font-semibold md:text-2xl lg:text-3xl md:font-bold mb-5 text-white'>Handpicked Collections</h2>
            <div className='grid grid-cols-12 justify-between items-center gap-4 md:gap-8 mt-4'>
                <SingleHandpickedCollection title='Personal Care'
                    img="https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/ynuoohhktsdssvatylmb"
                    to="/" />
                <SingleHandpickedCollection title='Handbags'
                    img="https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/n8zokqp7bwkcfdieuum4"
                    to="/" />
                <SingleHandpickedCollection title='Wrist Watches'
                    img="https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/qxynnn8ufynxhvntyucg"
                    to="/" />
                <SingleHandpickedCollection title='Sun Glasses'
                    img="https://res.cloudinary.com/doxhxgz2g/image/upload/f_auto,q_auto/v1/eCommerce-React-app/StaticAssets/i7hvf21pxwed4qtbt7ng"
                    to="/" />
            </div>
        </section>
    )
}

export default HandPickedCollections