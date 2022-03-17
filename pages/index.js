import { Test } from '../src/components/Test'

import Shimmer from '../src/components/Shimmer'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },60000)
  },[])

  const fakeUser = {
    name: 'Jonathan Doestar',
    avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. '
  }

  const user = {
    name: 'Filipe Pfluck',
    avatar: 'https://avatars.githubusercontent.com/u/62773200?v=4',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, labore. Odit voluptatum eum doloremque magni reiciendis corrupti harum possimus maxime nemo, animi quia dolorem, iste eos quo. Rem, at distinctio!'
  }

  return <Shimmer isLoading={true} component={Test} exampleProps={{user: fakeUser}}>
    <Test user={user}/>
  </Shimmer>
}
