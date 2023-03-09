import React from 'react'
import { Link } from 'react-router-dom'
import {Button,HStack} from '@chakra-ui/react'

const Header = () => {
  return (
    <HStack p={'4'} shadow={'base'} bgColor={'blackAlpha.900'}>
        <Button varient={'unstyled'} color={'white'} bgColor={'blackAlpha.600'}>
            <Link to='/'>Home</Link>
        </Button>
        <Button varient={'unstyled'} color={'white'} bgColor={'blackAlpha.600'}>
            <Link to='/exchanges'>Exchange</Link>
        </Button>
        <Button varient={'unstyled'} color={'white'} bgColor={'blackAlpha.600'}>
            <Link to='/coins'>Coins</Link>
        </Button>
    </HStack>
  )
}

export default Header