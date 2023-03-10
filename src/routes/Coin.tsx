import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
interface RouterParams {
  coinId: string;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteState {
  name: string;
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: ITag[];
  // team: object; 필요없으니깐 지우자
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  // links: object;  필요없으니깐 지우자
  // links_extended: object;  필요없으니깐 지우자
  // whitepaper: object;  필요없으니깐 지우자
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouterParams>();
  const { state } = useLocation<RouteState>();

  const [priceinfo, setPriceinfo] = useState<PriceData>();
  const [info, setInfo] = useState<InfoData>();
  // console.log(state.name);
  // const location = useLocation();
  // console.log(location.state)
  //   const parmas = useParams();
  //   console.log(parmas)

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      // const json = await response.json();

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData);
      console.log(infoData);
      setPriceinfo(priceData);
      setInfo(infoData);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인 {state.name}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};
{
  /* // <h1>Coin : {coinId}</h1>; */
}
export default Coin;
