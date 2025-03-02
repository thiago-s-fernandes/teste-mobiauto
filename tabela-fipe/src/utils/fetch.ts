export const fetchFromAPI = async <T>(
  endpoint: string,
  errorMessage: string
) => {
  try {
    const res = await fetch(
      `${process.env.SITE_BASE_URL}/api/tabela-fipe/${endpoint}`
    );

    if (!res.ok) throw new Error(errorMessage);

    return (await res.json()) as T;
  } catch (error) {
    throw error instanceof Error ? error.message : "Erro na busca";
  }
};
