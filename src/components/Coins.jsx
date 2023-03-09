import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  Button,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Loading from "./Loading";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const changePage = (page)=>{
    setPage(page)
    setLoading(true)
  }


  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const btns = new Array(132).fill(1)


  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoins();
  }, [currency, page]);

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loading />
      ) : (
        <>
            <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
                <HStack spacing={'4'}>
                    <Radio value={'inr'}>INR</Radio>
                    <Radio value={'eur'}>EUR</Radio>
                    <Radio value={'usd'}>USD</Radio>
                </HStack>
            </RadioGroup>


          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {coins?.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                currencySymbol={currencySymbol}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                name={i.name}
              />
            ))}
          </HStack>
            <HStack  w={'full'} overflowX={'auto'} p={'8'}>
                {
                    btns.map((item,index)=>(
                        <Button key={index} bgColor={"blackAlpha.900"} color={'white'} onClick={()=>changePage(index+1)}>{index+1}</Button>
                    ))
                }
            </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
