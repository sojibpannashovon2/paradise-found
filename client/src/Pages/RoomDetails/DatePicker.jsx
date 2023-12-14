// From RoomReservation
import { DateRange } from 'react-date-range'

const DatePicker = ({ value, handleSelect }) => {
      return (
            <DateRange
                  rangeColors={['#87CEEB']}
                  date={value.startDate}
                  direction='vertical'
                  showDateDisplay={false}

                  className='w-full'
                  minDate={value.startDate}
                  maxDate={value.endDate}


                  ranges={[value]}
                  onChange={handleSelect}
            />
      )
}

export default DatePicker