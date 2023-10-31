import React from "react"

type AppHeaderProps = {
    avatar: string
}

export const AppHeader = (props: AppHeaderProps) => {

    return (
        <>
            <section className="">
                <div className="flex header-background bg-center w-full text-4xl md:justify-center relative animation-transform duration-300">
                
                <div className="avatar bottom-0 left-0 transition hover:animate-bounce">
                    <div className="mask mask-squircle w-36">
                        <img src={props.avatar} alt="Avatar" />
                    </div>
                </div>
                
                </div>
                <p className="text-left lg:text-center font-extrabold border-t-2 border-black text-accent px-3 bg-primary">
                    Barrett's Corner
                </p>
            </section>
            
        </>
    )
}