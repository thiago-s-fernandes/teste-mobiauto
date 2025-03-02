"use client";

import Header from "@/components/header/header";
import Price from "@/components/price/price";
import { useEffect } from "react";
import { resetSelections } from "@/lib/features/fipe/fipeSlice";
import { useAppSelector, RootState, useAppDispatch } from "@/lib/store";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography
} from "@mui/material";

export default function Resultado(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {
    data: { value },
    errors: { value: valueError },
    loading
  } = useAppSelector((state: RootState) => state.fipe);

  useEffect(() => {
    dispatch(resetSelections());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        component="main"
        role="main"
        sx={{
          height: "100%",
          background: "#DCF5F2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (valueError || !value) {
    return (
      <Box
        component="main"
        role="main"
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Container
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          component="div"
        >
          <Alert severity="error">
            OPS! Ocorreu um problema no seu resultado, tente novamente!
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      role="main"
      sx={{ height: "100%", background: "#DCF5F2" }}
    >
      <Box component="section" sx={{ height: "100%" }}>
        <Container sx={{ height: "100%" }} component="article">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px"
            }}
          >
            <Header
              title={`Tabela Fipe: Preço ${value?.Marca} ${value?.Modelo} ${value?.AnoModelo}`}
            />
            <Box
              component="div"
              sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Price price={value?.Valor ?? ""} />
              <Typography
                sx={{
                  color: "#757575",
                  "@media (min-width: 768px)": {
                    fontSize: "16px"
                  }
                }}
                fontSize={12}
              >
                Este é o preço de compra do veículo
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
