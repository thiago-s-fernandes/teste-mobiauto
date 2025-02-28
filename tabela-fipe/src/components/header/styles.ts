"use client";

import { styled } from "@mui/material/styles";

export const Header = styled("header")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled("h1")`
  color: #424242;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin: 0 0 4px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 34px;
    font-weight: 700;
    line-height: 42px;
    margin: 0 0 8px;
  }
`;

export const SubTitle = styled("h2")`
  color: #424242;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }
`;
