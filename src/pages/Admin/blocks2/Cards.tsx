import { IconAdidas } from '@icons';
import { FC } from 'react'

const cards = [
  {
    id: 1,
    number: '250',
    title: 'New Orders',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://example.com/image1.jpg',
    color: '#02c0f0',
  },
  {
    id: 2,
    number: '53%',
    title: 'Bounce Rate',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://example.com/image1.jpg',
    color: '#01a65a',
  },
  {
    id: 3,
    number: '44',
    title: 'User Registrations',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://example.com/image1.jpg',
    color: '#f59c11',
  },
  {
    id: 4,
    number: '12,43',
    title: 'Unique Visitors',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://example.com/image1.jpg',
    color: '#dc4d3b',
  }
]

const Cards: FC = () => {
  return (
    <div
      className='grid grid-cols-2 gap-3 w-full'
    >
      {cards.map((card) => (
        <div
          key={card.id}
          className='w-full h-full text-white flex flex-col justify-between rounded-lg shadow-lg'
          style={{ backgroundColor: card.color }}
        >
          <div className='flex items-start justify-between px-6 pt-6'>
            <div className='flex flex-col justify-between'>
              <h1 className='text-3xl font-bold'>{card.number}</h1>
              <p className=''>{card.title}</p>
            </div>
            <IconAdidas/>
          </div>
          <div className='h-8 w-full bg-black bg-opacity-15 rounded-bl-lg rounded-br-lg'/>
        </div>
      ))}
    </div>
  )
}

export default Cards;
