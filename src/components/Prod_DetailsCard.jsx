import React from 'react'

function Prod_DetailsCard(props) {
    return (
        <div className='Product_Detail_card flex w-[40em] h-[25em] mt-14 bg-white shadow-lg shadow-black'>
            <div className="detailImg w-[50%] h-full border-2 flex justify-center items-center">
                <img className='w-[100%] h-[100%]' src={`${props.details.images[0]}`} alt={props.details.title} />
            </div>
            <div className="P_details w-[50%] h-full border-2 flex justify-center items-center">
                []
            </div>

        </div>
    )
}

export default Prod_DetailsCard