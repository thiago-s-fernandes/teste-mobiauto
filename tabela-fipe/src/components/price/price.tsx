import * as S from "./styles";

interface Props {
  price: string;
}

export default function Price({ price }: Props): React.JSX.Element {
  return (
    <S.PriceContainer>
      <S.PriceText>{price}</S.PriceText>
    </S.PriceContainer>
  );
}
