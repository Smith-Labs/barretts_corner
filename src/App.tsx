import './App.css'
import socials from '../lib/userConfig.json'

function App() {
  

  return (
    <>
      <div className='page-background w-full bg-cover bg-center bg-no-repeat'></div>
      <section className=''>
        <div className='flex header-background bg-center w-full text-4xl md:justify-center relative'>
          
          <div className='avatar bottom-0 left-0 hover:animate-bounce'>
            <div className='mask mask-squircle w-36'>
              <img src='../src/assets/images/blinktalk.png' />
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

      <dialog id="about_barrett" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Greetings Fellow Mortals!</h3>
          <p className="py-4">It’s me, Barrett (he/him). I play games and stuff! My favorite drink is raspberry juice (it’s just juice). My favorites are colorful, but I'll try almost anything. Did I mention I'm a mortal male human? My channel is best enjoyed by ages 18+, ideally paired with a cup of juice.</p>
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
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Socials</h3>
          <div className='grid grid-cols-4 justify-items-center'>
            {socials.map((social) => (
              <a href={social.url} className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300'>
                <img src={`../src/assets/images/icons/socials/icons8-${social.name}-50.png`} />
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