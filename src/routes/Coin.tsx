import { useParams } from "react-router";
interface RouterParams {
  coinId: string;
}

const Coin = () => {
  const { coinId } = useParams<RouterParams>();
  //   const parmas = useParams();
  //   console.log(parmas)
  return <h1>Coin : {coinId}</h1>;
};
export default Coin;
