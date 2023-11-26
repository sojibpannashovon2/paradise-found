import { DateRange } from 'react-date-range'
const DatePicker = () => {
      return (
            <DateRange
                  rangeColors={['#262626']}
                  date={new Date()}
                  direction='vertical'
                  showDateDisplay={false}
                  minDate={new Date()}
                  className='w-full'
            />
      )
}

export default DatePicker