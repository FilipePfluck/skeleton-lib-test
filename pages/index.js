import { Test } from '../src/components/Test'

import {Skeleton} from 'skeleton-loading-react'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },2000)
  },[])

  const fakeUser = {
    name: 'Jonathan Doestar',
    avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit'
  }

  const user = {
    name: 'Filipe Pfluck',
    avatar: 'https://avatars.githubusercontent.com/u/62773200?v=4',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit'
  }

  return <Skeleton isLoading={true} exampleProps={{user: fakeUser}}>
    <Test user={user}/>
  </Skeleton>
}
