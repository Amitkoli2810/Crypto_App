import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Container, HStack, VStack,Image, Heading,Text } from '@chakra-ui/react'
import Loading from './Loading'

const Exchanges = () => {
    const[exchanges,setExchanges]= useState([])
    const[loading,setLoading] = useState(true)
    

    useEffect(()=>{
        const fetchExchanges = async ()=>{
            try{
                const {data} = await axios.get(`https://api.coingecko.com/api/v3/exchanges`)
            setExchanges(data)
            setLoading(false)
            
            }catch(error){
                console.log(error)
            }
        }
        fetchExchanges()
        
    },[])

  return (
    <Container maxW={'container.xl'}>
        {
            loading ? <Loading/> : (
                <>
                    <HStack wrap={'wrap'}>
                        {
                            exchanges?.map((i)=>(
                                <ExchangeCard key={i.id} img={i.image} rank={i.trust_score_rank} url={i.url} name ={i.name}/>
                            ))
                        }
                    </HStack>


                </>
            )
        }
    </Container>
  )
}
const ExchangeCard =({img,rank,name,url})=>(


    <a href={url} target={'blank'}>
        
        <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'}
        m={'4'} css={{'&:hover':{
            transform:'scale(1.1)'
        }}}
        >
        <Image src={img} w={'10'} h={'10'} objectFit={'contain'}/>
        <Heading size={'md'} noOfLines={1}>{rank}</Heading>
        <Text noOfLines={1}>{name}</Text>
        </VStack>   
    </a>
    
)

export default Exchanges