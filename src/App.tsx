import './App.css'
import { Socials } from '../lib/userConfig.json'
import { useEffect, useState } from 'react';
import React from 'react';
import { AppHeader } from './components/AppHeader';
import { ButtonGroup } from './components/ButtonGroup';

declare global {
  interface Window {
      about_barrett:any;
      goal_list:any;
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

type GameCard = {
  id: number
  name: string
  box_art_url: string
  igdb_id: number
}

type TopGameList = GameCard[]

type Video = {
  id: number,
  stream_id: number
  user_id: number
  user_login: string
  user_name: string
  title: string
  description: string
  created_at: Date
  published_at: Date
  url: string
  thumbnail_url: string
  viewable: string
  view_count: number
  language: string
  type: string
  duration: string
  muted_segments: [
    {
      duration: number
      offset: number
    }
  ]
}

type Videos = Video[]

// type Goal = {
//   id: string
//   broadcaster_id: number
//   broadcaster_name: string
//   broadcaster_login: string
//   type: string
//   description: string
//   current_amount: number
//   target_amount: number
//   created_at: Date
// }

// type Goals = Goal[]

function App() {
  const [token, setToken] = useState<Token>()
  const [user, setUser] = useState<TwitchUser>()
  const [topGames, setTopGames] = useState<TopGameList>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [videos, setVideos] = useState<Videos>()
  // const [goals, setGoals] = useState()

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

    } catch {}
  }

  async function fetchTopGames() {

    try{
      const response = await fetch(`/.netlify/functions/twitch-user-top-games?token=${token?.access_token}`)
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
  
      const {data} = await response.json()
      
      // console.log(data)
      
      setTopGames(data)
  
    } catch {}
  }

  async function fetchVideos() {

    try{
      const response = await fetch(`/.netlify/functions/get-user-videos?token=${token?.access_token}&user_id=${user?.id}`)
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
  
      const {data} = await response.json()
      
      // console.log(data[0])

      console.log(import.meta.env.VITE_NETLIFY_SITE_URL)

      setVideos(data)
  
    } catch {}
  }

  // async function fetchGoals() {

  //   try{
  //     const response = await fetch(`/.netlify/functions/get-user-goals?token=${token?.access_token}&user_id=${user?.id}`)
  
  //     if (!response.ok) {
  //       throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
  //     }
  
  //     const {data} = await response.json()
      
  //     console.log(data)
      
  //     setGoals(data)
  
  //   } catch {}
  // }

  useEffect(() => {
    fetchVideos()
    fetchTopGames()
  },[user])

  useEffect(() => {
    fetchUser()
    
  }, [token])

  useEffect(() => {
    fetchKey() 
  }, []) 

  return (
    <>
      <div className='page-background w-full bg-cover bg-center bg-no-repeat scale-125'></div>
      
      <AppHeader avatar="/blinktalk.png" />

      <ButtonGroup/>

      <section className='grid justify-items-center w-full'>
        <div className='divider w-3/4' ><h3 className='font-bold text-lg'>Latest Stream</h3></div>
      </section>

      <section className='flex flex-col place-items-center justify-items-center'>
        <iframe 
          className='aspect-video w-3/4 md:w-1/2 relative self' 
          src={ videos?.length == undefined  ? '' : `https://player.twitch.tv/?video=${videos[0].id}&parent=${import.meta.env.VITE_NETLIFY_SITE_URL}` } 
          allow='accelerometer; encrypted-media; gyroscope;' allowFullScreen>
        </iframe>  
      </section>

      <footer className={`flex fixed justify-items-center bottom-0 w-full bg-slate-700`} >        
          <div className={`absolute bottom-0 left-0 bg-slate-900 bg-opacity-25 glass w-full pb-4 transform
            ${
              isOpen ? 'translate-y-0' : 'translate-y-full'
            } transition-transform ease-in-out duration-300`}
          >
            <div className={`divider w-full h-full bg-slate-700 transition-transform ease-in-out duration-300 -translate-y-11`}><button className='font-bold text-lg p-0' onClick={()=> setIsOpen(!isOpen)}>Favorite Games!</button></div>
            <div className='grid justify-items-center grid-cols-3'>
              { 
                topGames === undefined ? '' : 
                topGames.map((game: GameCard) => (
                    <div className='flex items-center justify-center transition ease-in-out delay-150 hover:-translate-y-36 hover:scale-150 duration-300 w-1/2'>
                      
                        <img className='rounded-lg shadow-2xl hover:shadow-accent' src={`${game.box_art_url.replace(new RegExp("{width}x{height}"), `285x380`)}`} />
                      
                    </div>
                ))
              }
            </div>
          </div>
      </footer>

      <dialog id="about_barrett" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Greetings Fellow Mortals!</h3>
          <p className="py-4">{user?.description}</p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="goal_list" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Stream Goals!</h3>
          <div className='py-4'>

            <p>Render some goal stats here ... or maybe on the main page </p>

          </div>
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
            {Socials.map((social) => (
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