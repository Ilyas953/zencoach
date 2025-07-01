import { useState, useEffect, useRef, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FcContacts } from 'react-icons/fc'
import { use } from 'react'
import coachsportif from './assets/coachsportif.jpeg'
import coach1 from './assets/chapt.png'
import coach2 from './assets/chapt2.png'
import { FcAssistant } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { GiWeightLiftingUp } from "react-icons/gi";
import { GrPlan } from "react-icons/gr"; 
import { scrollContext } from './scrollcontext'





function Avis({lettre, nom, pense}) {
  const mode = lettre === 'a' ? 'bg-gray-700' : 'bg-gray-900  '

return (
  <>
  <div className={` *:mx-3 items-center flex justify-between min-h-[60px] ${mode} `}>
    <p className='font-semibold my-3' >{nom}</p>
    <p className=' italic my-3'>{` "${pense}"`}</p>
  </div>
  </>
)
}

function Card({titre, paragraphe, time}) {

  const {animation} = useContext(scrollContext)
const [start, setStart] = useState(false)
  useEffect(() => {
    if (animation === 'presentation') {
      setTimeout(() => {
        setStart(true)
      }, time )
    }
    else {
      setStart(false)
    }
  }, [animation])

  
  

  return (
    <> 
    
    <div className={` 
  ${start ? 'opacity-100 mb-4' : 'xl:opacity-0 xl:mt-4'} 
  transition-all duration-300 ease-in-out 
  w-full sm:w-[90%] xl:w-[30%] 
  mx-auto sm:mx-0 xl:ml-0 md:ml-10
  bg-gradient-to-b from-gray-800 via-gray-900 to-black 
  border-2 border-white rounded-xl 
  hover:-translate-y-2 
  p-5
`}>
      <h2 className='text-3xl  text-center my-3 font-semibold'>{titre}</h2>
      <div className='h-1 w-10/12 border-b-1 border-b-white mx-auto my-5'></div>
      <p className='text-xl text-center mx-2 my-auto'>{paragraphe}</p>
    </div>

    </>

  )
}



function Destination({partie, index, scrollY, className, text, hover }) {
    const [isHover, setIsHover] = useState(false)
    

       useEffect(() => {
    
      setIsHover(scrollY === index)
    
  }, [scrollY])

      const mode = isHover ? 'w-full -translate-x-1/2 xl:opacity-75  opacity-0 ' : 'opacity-0 w-0 '

  function scroll(partie){
    const element = document.getElementById(partie)
    if(element) {
      element.scrollIntoView({behavior: "smooth"})
      
    }
  }

  return(
    <>
    { partie &&  
    <div className={` group  `}>
    <button onClick={() => scroll(partie)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => scrollY !== index && setIsHover(false)}
      className={className}>{text ? text : partie}</button>
   { hover !== 'none' && <div className={` transition-all text-center duration-300 ease-in-out my-2 relative left-1/2 bg-white rounded shadow-xs  h-2 ${mode} `}></div> }
    </div>
        }
   
    </>
  )
}

function Test({icon: Icon , title, text, time}) {

 const {animation} = useContext(scrollContext)
const [start, setStart] = useState(false)
  useEffect(() => {
    if (animation === 'coaching') {
      setTimeout(() => {
        setStart(true)
      }, time )
    }
    else {
      setStart(false)
    }
  }, [animation])


  return (
    <>
    
       
       
        
       
      <div className={` transition-all duration-500 ease-in-out ${start ? 'opacity-100 translate-y-5' : ' -translate-y-5 xl:opacity-0'} lg:h-[50vh]  w-full xl:w-[22vw] bg-gradient-to-b from-black to-blue-950 overflow-visible rounded-xl border-white border-2 flex flex-col`}>
         { <Icon className={`    size-50 relative -top-32 mx-auto  p-10 text-9xl drop-shadow-md  drop-shadow-blue-50`}/> }
         <div className='flex flex-col '>
         <h3 className='font-semibold text-center -my-35 text-3xl lg:text-4xl xl:text-3xl drop-shadow-xs drop-shadow-amber-50 '>{title}</h3>
         <div className='h-1 w-10/12 border-b-1 border-b-white mx-auto mt-45 '></div>
         <p className='text-center text-xl lg:text-3xl xl:text-xl my-5 mx-3'>{text}</p>
         </div>

      </div>
      

     
     
    </>
  )
}



function App() {

  
  const [scrollY, setScrollY] = useState(undefined)
  const [animation, setAnimation] = useState('')
  const mainRef = useRef(null)

useEffect(()=> {
  const el = mainRef.current
  if (!el) return
  function handlescroll() {
    const scrolltop = el.scrollTop
  const idx = Math.round(scrolltop / window.innerHeight);
  setScrollY(idx)

 
  

console.log(`idx calcule => ${idx}`)

}

el.addEventListener("scroll", handlescroll)
return () => {
  el.removeEventListener("scroll", handlescroll)
}

  },[mainRef])

  useEffect(() => {
    
    scrollY === 0 && setAnimation('accueil');
    scrollY === 1 && setAnimation('presentation');
    scrollY === 2 && setAnimation('coaching');
    scrollY === 3 && setAnimation('contact');


  },[scrollY])

  






  return (
    <>
    <scrollContext.Provider value={{animation, setAnimation}}>
    <div className=" overflow-x-hidden h-full w-screen bg-[url('./assets/image3.webp')] bg-cover bg-center bg-fixed text-white *:font-poppins">
      <div className="fixed inset-0 bg-black/50 bg-fixed bg-cover z-10 min-h-screen"></div>
      

      <div className="relative z-20 min-h-screen ">
  <header className="fixed top-0 left-0 w-full h-16 flex justify-evenly text-4xl font-semibold my-5 z-20">
    
    <Destination partie="presentation" index={1} scrollY={scrollY} className=' md:opacity-100 opacity-0' />
    <Destination partie="coaching" index={2} scrollY={scrollY} className='md:opacity-100  opacity-0' />
    <Destination partie="contact"index={3} scrollY={scrollY} className='md:opacity-100 opacity-0' />
    
    
  
  </header>

  <main className="pt-16 overflow-y-auto xl:h-screen  xl:snap-y xl:snap-mandatory" ref={mainRef}>
    
    <section
  id="accueil"
  className={`px-4 snap-start xl:h-screen h-[90vh] flex items-center justify-center text-center *:transition-all *:duration-1000 *:ease-in-out ${
    animation === "accueil" ? "opacity-100" : "opacity-0"
  }`}
>
  <div className='xl:mb-0 mb-20'>
    <h1
      className={`font-bold transition-all duration-900 ease-in-out my-3 ${
        animation === "accueil" ? "pt-10" : "opacity-0 pb-20"
      } text-5xl sm:text-6xl md:text-8xl`}
    >
      ZenCoach
    </h1>
    <p
      className={`transition-all duration-900 ease-in-out ${
        animation === "accueil" ? "opacity-100" : "opacity-0"
      } text-2xl sm:text-3xl md:text-6xl`}
    >
      Retrouve ton équilibre et ta force intérieure
    </p>
    <Destination
      partie="contact"
      index={3}
      scrollY={scrollY}
      className="transition-all duration-300 ease-in-out transform text-2xl sm:text-3xl my-8 mx-auto bg-black rounded-4xl w-full sm:w-1/2 xl:w-[45vw] h-16 sm:h-18 md:h-22 xl:h-18 border-white border-2 shadow-2xl hover:scale-110 hover:border-4 hover:border-black hover:bg-white hover:text-black"
      text="commencez des maintenant"
      hover="none"
    />
  </div>
</section>
      
     <section id="presentation" className="px-4 xl:snap-start min-h-screen flex flex-col w-full xl:gap-0 md:gap-10 pt-32 ">
  <div className="flex flex-wrap xl:flex-nowrap justify-between gap-6">
    <div className="mx-auto sm:ml-10 w-full sm:w-[40vw] md:w-[90vw]  xl:w-[30vw] h-[40vh] md:h-[50vh] lg:h-[70vh] xl:h-[40vh] lg:mb-10 xl:mb-0   bg-gradient-to-b from-purple-900 to-slate-950 flex rounded-xl overflow-hidden">
      <img
        src={coach1}
        className="h-full w-1/2 object-cover shadow-xs rounded-l-xl"
      />
      <div className="h-full w-1/2 lg:text-3xl xl:text-xl sm:text-lg text-center -my-5 mx-3 flex items-center">
        Decouvrez ZenCoach, un coach passionné, à l’écoute de vos besoins, prêt à vous accompagner avec expertise et bienveillance pour révéler le meilleur de vous-même.
      </div>
    </div>

    <h2 className="w-full sm:w-auto text-center lg:mx-auto xl:mx-auto mx-0 md:mx-auto text-2xl sm:text-3xl md:text-4xl font-bold self-center text-shadow-amber-50 drop-shadow-md bg-gradient-to-l from-[#ff9966] to-[#ff5e62] bg-clip-text text-transparent">
      Un coach qui s'adapte à vous !
    </h2>

    <div className="mx-auto xl:mx-0 sm:mr-10 w-full sm:w-[40vw] md:w-[100vw] xl:w-[40vw]  xl:ml-0 md:ml-10  lg:w-[100vw] h-[30vh] sm:h-[40vh] bg-gray-600 border-2 border-white flex flex-col overflow-y-scroll scrollbar-hide relative rounded-lg p-3 mb-10 sm:my-25 md:my-4 xl:-my-1 ">
      <Avis lettre="a" nom="Julien" pense="Depuis le debut du coaching j'ai repris gout au sport et j'ai de nouveau confiance en moi." />
      <Avis lettre="b" nom="Nathalie" pense="Grace a zencoach je suis maintenant sereine dans mon corps." />
      <Avis lettre="a" nom="Matthieu" pense="en un ans j'ai accompli les objectifs sur lesquels je stagnais." />
      <Avis lettre="b" nom="Aurelien" pense="Le coaching n'est pas seulement physique mais aussi mental, a l'aide de zencoach j'ai appris la discipline." />
      <Avis lettre="a" nom="Lucas" pense="En 4 mois, j'ai perdu 11 kilos grace a zencoach, je me sentais bien et fier de mois tout au long du coaching et encore aujourd'hui !" />
      <Avis lettre="b" nom="Elliot" pense="Grâce à ZenCoach, j’ai pris 7 kg de muscle en 5 mois sans me sentir perdu. Le plan était clair, adapté à mon rythme." />
    </div>
  </div>

  <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row justify-evenly gap-6 mt-auto mb-10 px-2">
    <Card
      titre="Une alimentation suivi"
      time={1}
      paragraphe="Un plan nutritionnel personnalisé, pensé pour nourrir ton corps et ton esprit. Ensemble, on établit des habitudes saines qui respectent ton rythme de vie pour t’accompagner durablement vers tes objectifs."
    />
    <Card
      titre="Un accompagnement mental"
      time={301}
      paragraphe="Plus qu’un coach, un guide pour cultiver ta sérénité et ta motivation. On travaille ensemble ton état d’esprit zen, ta confiance et ta résilience pour que chaque pas vers ton objectif soit un vrai moment de paix intérieure."
    />
    <Card
      titre="Un coaching adapte a vos objectifs"
      time={601}
      paragraphe="Chaque parcours est unique, c’est pourquoi ton coaching est entièrement personnalisé. Qu’il s’agisse de prise de masse, perte de poids ou bien-être général, ton programme évolue avec toi, pour toujours mieux répondre à tes besoins."
    />
  </div>
</section>
    <section id="coaching"   className=" px-4 xl:snap-start lg:h-auto xl:h-screen w-full flex flex-col xl:gap-0 gap-30  justify-around pt-32 ">
     <h2 className='self-center text-center text-4xl font-bold text-shadow-amber-50 drop-shadow-md bg-gradient-to-l from-[#ff9966] to-[#ff5e62] bg-clip-text text-transparent  '>Comment se passe le coaching avec zenCoach ? </h2>
     <div className='flex  xl:justify-evenly xl:items-end relative flex-col xl:gap-0 gap-25 items-center xl:flex-row   '>
      <Test icon={FcAssistant} title='Echange de depart' time={1} text='Avec ZenCoach, tout commence par un échange personnalisé. On discute de tes objectifs, ton mode de vie, et tes attentes pour construire ensemble une base solide et motivante.'/>
      <Test icon={GrPlan} title='Plan sur-mesure' time={301} text='Chaque corps est unique, ton plan aussi. ZenCoach élabore un programme adapté à ton profil et tes objectifs, mêlant exercices, alimentation et conseils bien-être.' />
      <Test icon={GiWeightLiftingUp} title="Coaching et seance" time={601} text="C’est le moment d’agir ! ZenCoach t’accompagne lors de séances motivantes et personnalisées, en présentiel ou à distance, pour te guider et t’aider à progresser efficacement."/>
      <Test icon={FcBullish} title='Suivi et evaluation' time={901} text="On avance ensemble, pas à pas. ZenCoach assure un suivi régulier, ajuste ton programme et célèbre chaque victoire, pour que tu restes sur la bonne voie vers tes objectifs."/>
     </div>
     
    </section>



    <section id="contact"    className="  xl:snap-start xl:h-screen flex flex-col items-center justify-center text-center lg:h-auto h-screen pt-40 xl:mt-0 lg:mt-40 xl:pt-40  ">
      <div>
      <h2 className='text-5xl font-bold xl:mx-0 lg:mx-4'>Pret a transformer ton corps avec Zencoach ?</h2>
      <h3 className='text-center my-5 text-4xl'>contacte moi des maintenant pour commencer</h3>
      </div>
      <a
  href="mailto:contact@zencoach.com?subject=Coaching%20avec%20ZenCoach&body=Bonjour%20ZenCoach,%0A%0AJe%20souhaite%20me%20lancer%20dans%20le%20coaching.%0AVoici%20mon%20message%20:%0A"
  className= "transition-all duration-300 ease-in-out w-[75vw] xl:w-1/2 xl:h-18 text-center bg-gradient-to-b from-amber-500 to-amber-600 drop-shadow-md drop-shadow-black text-black rounded-4xl font-bold p-5 my-20  border-black border-2 text-xl hover:scale-110 hover:-translate-y-4  "
>
  Envoyer un mail à ZenCoach
</a>
<footer className="relative bottom-0 left-0 bg-gray-900  *:m-5 text-white  text-sm mx-0 w-full mt-auto h-18">

  <div className="flex flex-col md:flex-row xl:justify-between justify-center items-center space-y-4 md:space-y-0">
    <p>© 2025 ZenCoach. Tous droits réservés.</p>
    <div className="flex space-x-4">
      <a href="mailto:contact@zencoach.com" className="hover:underline ml-0 xl:ml-0 lg:ml-4">Email</a>
      <a href="https://instagram.com" target="_blank" className="hover:underline">Instagram</a>
    </div>
  </div>
</footer>
    </section>  
    
  </main>
 
</div>
    </div>
</scrollContext.Provider>
    </>
      
  )
}

export default App
