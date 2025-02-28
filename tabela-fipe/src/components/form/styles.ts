"use client";

import { styled } from "@mui/material/styles";

export const ContainerForm = styled("div")`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16), 0px 1px 2px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  padding: 16px;
  width: 100%;

  @media (min-width: 768px) {
    padding: 32px 50px;
  }
`;

export const Form = styled("form")`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  justify-content: center;
  width: 100%;
`;
