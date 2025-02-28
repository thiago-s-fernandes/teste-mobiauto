import * as S from "./styles";

interface Props {
  title?: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: Props): React.JSX.Element {
  return (
    <S.Header>
      {title && <S.Title>{title}</S.Title>}
      {subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
    </S.Header>
  );
}
