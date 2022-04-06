import Link from 'next/link';
import tw from 'tailwind-styled-components';
import Map from './components/Map'
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export default function Home() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL
        })
      } else {
        setUser(null)
        router.push('/login')
      }
    })
  }, [])

  return (
    <Wrapper>
      <Map />
      <ActionItems>
        <Header>
          <UberLogo src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage src={user && user.photoUrl} 
            onClick={() => signOut(auth)}/>
          </Profile>
        </Header>
        <ActionButtons>
          <Link href='/search'>
            <ActionButton>
              <ActionButtonImage src='https://i.ibb.co/cyvcpfF/uberx.png' />
              Ride</ActionButton>
          </Link>
          <ActionButton>
            <ActionButtonImage src='https://i.ibb.co/n776JLm/bike.png' />
            2-Wheels</ActionButton>
          <ActionButton>
            <ActionButtonImage src='https://i.ibb.co/5RjchBg/uberschedule.png' />
            Reserve</ActionButton>
        </ActionButtons>
        <InputButton>Where to?</InputButton>
      </ActionItems>
    </Wrapper >
  )
}

const Wrapper = tw.div`
flex flex-col h-screen
`

const ActionItems = tw.div`
 flex-1 p-4
`

const Header = tw.div`
flex justify-between items-center
`
const UberLogo = tw.img`
h-20 p-5
`

const Profile = tw.div`
flex items-center
`

const Name = tw.div`
 w-30 text-sm mr-1
`

const UserImage = tw.img`
h-12 w-12 border border-gray-200 rounded-full p-px cursor-pointer
`

const ActionButtons = tw.div`
flex
`

const ActionButton = tw.button`
bg-gray-200 flex-1 m-2 h-32 items-center flex-col rounded-lg transform 
hover:scale-105 transition text-xl
`

const ActionButtonImage = tw.img`
h-3/5
`

const InputButton = tw.div`
h-20 bg-gray-200 text-2xl p-4 rounded-lg flex items-center mt-8 mx-2
`