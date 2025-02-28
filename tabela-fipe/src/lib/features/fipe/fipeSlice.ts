import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type {
  FipeBase,
  FipeBrands,
  FipeModels,
  FipeValue,
  FipeYears
} from "@/types/fipe";

interface FipeState {
  selectedBrand: FipeBase | null;
  selectedModel: FipeBase | null;
  selectedYear: FipeBase | null;
  models: FipeModels | null;
  modelsError: string | null;
  years: FipeYears[];
  yearsError: string | null;
  value: FipeValue | null;
  valueError: string | null;
  loading: boolean;
}

const initialState: FipeState = {
  selectedBrand: null,
  selectedModel: null,
  selectedYear: null,
  models: null,
  modelsError: null,
  years: [],
  yearsError: null,
  value: null,
  valueError: null,
  loading: false
};

export const fetchModels = createAsyncThunk(
  "fipe/fetchModels",
  async (brandCode: string, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${
          process.env.SITE_BASE_URL as string
        }/api/tabela-fipe/models/${brandCode}`
      );
      if (!res.ok) {
        throw new Error("Erro ao buscar modelos da marca, tente novamente.");
      }
      const data: FipeModels = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Erro na busca"
      );
    }
  }
);

export const fetchYears = createAsyncThunk(
  "fipe/fetchYears",
  async (
    { brandCode, modelCode }: { brandCode: string; modelCode: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `${
          process.env.SITE_BASE_URL as string
        }/api/tabela-fipe/years/${brandCode}/${modelCode}`
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar anos do modelo, tente novamente.");
      }

      const data: FipeYears[] = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Erro na busca"
      );
    }
  }
);

export const fetchValue = createAsyncThunk(
  "fipe/fetchValue",
  async (
    {
      brandCode,
      modelCode,
      yearCode
    }: { brandCode: string; modelCode: string; yearCode: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `${
          process.env.SITE_BASE_URL as string
        }/api/tabela-fipe/value/${brandCode}/${modelCode}/${yearCode}`
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar o carro, tente novamente.");
      }

      const data: FipeValue = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Erro na busca"
      );
    }
  }
);

const fipeSlice = createSlice({
  name: "fipe",
  initialState,
  reducers: {
    setSelectedBrand(state, action: PayloadAction<FipeBrands | null>) {
      state.selectedBrand = action.payload;

      if (action.payload === null) {
        state.models = null;
        state.years = [];
        state.selectedModel = null;
      }
    },
    setSelectedModel(state, action: PayloadAction<FipeBase | null>) {
      state.selectedModel = action.payload;

      if (action.payload === null) {
        state.years = [];
      }
    },
    setSelectedYear(state, action: PayloadAction<FipeBase | null>) {
      state.selectedYear = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchModels.pending, state => {
        state.loading = true;
        state.modelsError = null;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.models = action.payload;
        state.loading = false;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.loading = false;
        state.models = null;
        state.modelsError = action.payload as string;
      });

    builder
      .addCase(fetchYears.pending, state => {
        state.loading = true;
        state.yearsError = null;
      })
      .addCase(fetchYears.fulfilled, (state, action) => {
        state.years = action.payload;
        state.loading = false;
      })
      .addCase(fetchYears.rejected, (state, action) => {
        state.loading = false;
        state.years = [];
        state.yearsError = action.payload as string;
      });

    builder
      .addCase(fetchValue.pending, state => {
        state.loading = true;
        state.valueError = null;
      })
      .addCase(fetchValue.fulfilled, (state, action) => {
        state.value = action.payload;
        state.loading = false;
      })
      .addCase(fetchValue.rejected, (state, action) => {
        state.loading = false;
        state.value = null;
        state.valueError = action.payload as string;
      });
  }
});

export const {
  setSelectedBrand,
  setSelectedModel,
  setSelectedYear,
  setLoading
} = fipeSlice.actions;

export const fipeReducer = fipeSlice.reducer;
