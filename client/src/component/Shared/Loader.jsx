import { ScaleLoader, PacmanLoader } from 'react-spinners'

const Loader = () => {
      return (
            <div
                  className='
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    '
            >
                  <PacmanLoader size={50} color='red' />
            </div>
      )
}

export default Loader