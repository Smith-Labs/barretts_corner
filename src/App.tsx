import './App.css'
import socials from '../lib/userConfig.json'
import { useEffect, useState } from 'react';
import React from 'react';


declare global {
  interface Window {
      about_barrett:any;
      games_list:any;
      schedule:any;
      socials:any;
  }
}

type Token = {
  access_token: string
  expires_in: number
  token_type: string
}

type TwitchUser = {
  id: string
  login: string
  display_name: string
  type: string
  broadcaster_type: 'string'
  description: string
  profile_image_url: string
  offline_image_url: string
  view_count: number
  email: string
  created_at: Date
}

function App() {
  const [token, setToken] = useState<Token>()
  const [user, setUser] = useState<TwitchUser>()

  async function fetchKey() {
    
    try{
      const response = await fetch('/.netlify/functions/twitch-authenticate')

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const data: Token = await response.json();
      
      setToken(data)

    } catch{}
  }

  async function fetchUser() {
    
    try{
    const response = await fetch(`/.netlify/functions/twitch-user?token=${token?.access_token}`)

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    const data: TwitchUser = await response.json()

    setUser(data)

    console.log(user)

    } catch {}
  }

  useEffect(() => {
    fetchUser()
  }, [token])

  useEffect(() => {
    fetchKey()
               
  }, []) 

  return (
    <>
      <div className='page-background w-full bg-cover bg-center bg-no-repeat'></div>
      <section className=''>
        <div className='flex header-background bg-center w-full text-4xl md:justify-center relative'>
           
          <div className='avatar bottom-0 left-0 hover:animate-bounce'>
            <div className='mask mask-squircle w-36'>
              <img src='/blinktalk.png'/>
            </div> 
          </div>
        
        </div>
            <p className='text-left lg:text-center font-extrabold border-t-2 border-black text-accent px-3 bg-primary'>Barret's Corner</p>
      
      </section>

      <section className=' grid grid-cols-1 gap-3 md:grid-cols-4 w-max m-auto justify-items-center'>
        <div className=' m-2 '>
          <button className="btn w-36 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => window.about_barrett.showModal()}>About Barrett</button>
        </div>
        <div className=' m-2 '>
          <button className="btn w-36 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => window.games_list.showModal()}>Games List</button>
        </div>
        <div className=' m-2'>
          <button className="btn w-36 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => window.schedule.showModal()}>Schedule</button>
        </div>
        <div className=' m-2'>
          <button className="btn w-36 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => window.socials.showModal()}>Socials</button>
        </div>
      </section>

      <section>

      </section>

      <dialog id="about_barrett" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Greetings Fellow Mortals!</h3>
          <p className="py-4">{user?.description}</p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="games_list" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Favorite Games</h3>
          <p className="py-4">I enjoy the Pickman, Pokemon and Zelda series' and play similar titles! </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="schedule" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Schedule</h3>
          <p className="py-4">Maybe I will get a routine... </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="socials" className="modal">
        <form method="dialog" className="modal-box bg-primary">
          <h3 className="font-bold text-lg">Socials</h3>
          <div className='grid grid-cols-4 justify-items-center'>
            {socials.map((social) => (
              <a href={social.url} className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300'>
                <img src={`/icons/socials/icons8-${social.name}-50.png`} />
              </a>
            ) )}
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

    </> 
  )
}

export default App