import Form from "@/components/form/form";
import Header from "@/components/header/header";
import { FipeBrands } from "@/types/fipe";
import { Box, Container } from "@mui/material";

async function fetchBrands(): Promise<FipeBrands[]> {
  try {
    const res = await fetch(
      `${process.env.SITE_BASE_URL}/api/tabela-fipe/brands`
    );

    if (!res.ok) {
      throw new Error("Erro ao buscar marcas");
    }

    const data = await res.json();

    return data;
  } catch {
    return [];
  }
}

export default async function Busca() {
  const brands = await fetchBrands();

  return (
    <Box component="main" role="main" sx={{ height: "100%" }}>
      <Box component="section" sx={{ height: "100%" }}>
        <Container sx={{ height: "100%" }} component="article">
          <Box
            sx={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "16px"
            }}
          >
            <Header
              title="Tabela Fipe"
              subtitle="Consulte o valor de um veículo de forma gratuita"
            />
            <Form brands={brands} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
