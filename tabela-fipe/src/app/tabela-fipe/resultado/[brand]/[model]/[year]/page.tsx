"use client";

import Header from "@/components/header/header";
import Price from "@/components/price/price";
import { useAppSelector, RootState } from "@/lib/store";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography
} from "@mui/material";

import "react-loading-skeleton/dist/skeleton.css";

export default function Resultado() {
  const { value, loading, valueError } = useAppSelector(
    (state: RootState) => state.fipe
  );

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
        <Alert severity="error">
          OPS! Ocorreu um problema na sua busca, tente novamente!
        </Alert>
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
              <Typography sx={{ color: "#757575" }} fontSize={16}>
                Este é o preço de compra do veículo
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
