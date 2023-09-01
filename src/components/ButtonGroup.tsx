import React from "react";


export const ButtonGroup = () => {
    return (
        <>
            <section className='grid grid-cols-2 gap-3 md:grid-cols-4 w-max m-auto justify-items-center'>
                <div className=' m-2 '>
                    <button className="btn w-36 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => window.about_barrett.showModal()}>About Barrett</button>
                </div>
                <div className=' m-2 '>
                    <button className="btn w-36 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => window.goal_list.showModal()}>Goals</button>
                </div>
                <div className=' m-2'>
                    <button className="btn w-36 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => window.schedule.showModal()}>Schedule</button>
                </div>
                <div className=' m-2'>
                    <button className="btn w-36 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => window.socials.showModal()}>Socials</button>
                </div>
            </section>
        </>
    )
}