"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Autocomplete, TextField, Button } from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setSelectedBrand,
  setSelectedModel,
  setSelectedYear,
  fetchModels,
  fetchYears,
  fetchValue
} from "@/lib/features/fipe/fipeSlice";
import type { FipeBrands } from "@/types/fipe";

import * as S from "./styles";

interface Props {
  brands: FipeBrands[];
}

export default function Form({ brands }: Props): React.JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    selectedBrand,
    selectedModel,
    selectedYear,
    models,
    modelsError,
    years,
    yearsError,
    loading
  } = useAppSelector((state: RootState) => state.fipe);

  useEffect(() => {
    if (selectedBrand) {
      dispatch(fetchModels(selectedBrand.codigo));
    }
  }, [selectedBrand, dispatch]);

  useEffect(() => {
    if (selectedBrand && selectedModel) {
      dispatch(
        fetchYears({
          brandCode: selectedBrand.codigo,
          modelCode: selectedModel.codigo
        })
      );
    }
  }, [selectedModel, selectedBrand, dispatch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedBrand || !selectedModel || !selectedYear) {
      // Ajustar
      return;
    }

    dispatch(
      fetchValue({
        brandCode: selectedBrand.codigo,
        modelCode: selectedModel.codigo,
        yearCode: selectedYear.codigo
      })
    );

    router.push(
      `/tabela-fipe/resultado/${selectedBrand?.codigo}/${selectedModel?.codigo}/${selectedYear?.codigo}`
    );
  };

  return (
    <S.ContainerForm>
      <S.Form onSubmit={handleSubmit}>
        <Autocomplete
          options={brands}
          getOptionLabel={option => option.nome}
          value={selectedBrand}
          noOptionsText="Nenhuma marca encontrada"
          onChange={(_, newValue) => {
            dispatch(setSelectedModel(null));
            dispatch(setSelectedBrand(newValue ?? null));
          }}
          renderInput={params => (
            <TextField {...params} label="Marca" variant="outlined" fullWidth />
          )}
          sx={{
            width: "100%"
          }}
        />

        <Autocomplete
          options={models?.modelos ?? []}
          getOptionLabel={option => option.nome}
          value={selectedModel}
          noOptionsText="Nenhum modelo encontrado"
          onChange={(_, newValue) =>
            dispatch(setSelectedModel(newValue ?? null))
          }
          renderInput={params => (
            <TextField
              {...params}
              label="Modelo"
              variant="outlined"
              fullWidth
              disabled={loading || !selectedBrand}
              error={!!modelsError}
              helperText={modelsError}
            />
          )}
          sx={{ width: "100%" }}
        />

        {selectedModel && (
          <Autocomplete
            options={years}
            getOptionLabel={option => option.nome}
            noOptionsText="Nenhum ano encontrado"
            onChange={(_, newValue) =>
              dispatch(setSelectedYear(newValue ?? null))
            }
            renderInput={params => (
              <TextField
                {...params}
                label="Ano"
                variant="outlined"
                fullWidth
                error={!!yearsError}
                helperText={yearsError}
              />
            )}
            sx={{ width: "100%" }}
            disabled={loading || !selectedModel}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={loading || !selectedYear}
        >
          Consultar preço
        </Button>
      </S.Form>
    </S.ContainerForm>
  );
}
