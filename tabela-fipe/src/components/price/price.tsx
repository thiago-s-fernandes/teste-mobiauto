import * as S from "./styles";

interface Props {
  price: string;
}

export default function Price({ price }: Props) {
  return (
    <S.PriceContainer>
      <S.PriceText>{price}</S.PriceText>
    </S.PriceContainer>
  );
}
