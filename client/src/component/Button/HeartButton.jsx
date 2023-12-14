import { AiFillHeart, AiOutlineHeart,AiFillStar,AiOutlineStar } from 'react-icons/ai'

const HeartButton = () => {
      return (
            <div
                  className='
        relative
        hover:opacity-80
        transition
        cursor-pointer
      '
            >
                  <AiOutlineStar
                        size={28}
                        className='
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        '
                  />
                  <AiFillStar
                        size={24}
                        className='fill-neutral-500/70 hover:fill-rose-500'
                  />
            </div>
      )
}

export default HeartButton