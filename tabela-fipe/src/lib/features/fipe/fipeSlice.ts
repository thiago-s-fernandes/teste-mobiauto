import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchFromAPI } from "@/utils/fetch";
import type {
  FipeBase,
  FipeBrands,
  FipeModels,
  FipeValue,
  FipeYears
} from "@/types/fipe";

interface FipeState {
  selections: {
    brand: FipeBase | null;
    model: FipeBase | null;
    year: FipeBase | null;
  };
  data: {
    models: FipeModels | null;
    years: FipeYears[] | null;
    value: FipeValue | null;
  };
  errors: {
    models: string | null;
    years: string | null;
    value: string | null;
  };
  loading: boolean;
}

const initialState: FipeState = {
  selections: {
    brand: null,
    model: null,
    year: null
  },
  data: {
    models: null,
    years: null,
    value: null
  },
  errors: {
    models: null,
    years: null,
    value: null
  },
  loading: false
};

enum FipeActions {
  FetchModels = "fipe/fetchModels",
  FetchYears = "fipe/fetchYears",
  FetchValue = "fipe/fetchValue"
}

export const fetchModels = createAsyncThunk(
  FipeActions.FetchModels,
  async (brandCode: string, { rejectWithValue }) => {
    try {
      return await fetchFromAPI<FipeModels>(
        `models/${brandCode}`,
        "Erro ao buscar modelos da marca, tente novamente."
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchYears = createAsyncThunk(
  FipeActions.FetchYears,
  async (
    { brandCode, modelCode }: { brandCode: string; modelCode: string },
    { rejectWithValue }
  ) => {
    try {
      return await fetchFromAPI<FipeYears[]>(
        `years/${brandCode}/${modelCode}`,
        "Erro ao buscar anos do modelo, tente novamente."
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchValue = createAsyncThunk(
  FipeActions.FetchValue,
  async (
    {
      brandCode,
      modelCode,
      yearCode
    }: { brandCode: string; modelCode: string; yearCode: string },
    { rejectWithValue }
  ) => {
    try {
      return await fetchFromAPI<FipeValue>(
        `value/${brandCode}/${modelCode}/${yearCode}`,
        "Erro ao buscar o veículo, tente novamente."
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const fipeSlice = createSlice({
  name: "fipe",
  initialState,
  reducers: {
    setSelectedBrand(state, action: PayloadAction<FipeBrands | null>) {
      state.selections.brand = action.payload;
      state.selections.model = null;
      state.selections.year = null;

      if (action.payload === null) {
        state.data.models = null;
        state.data.years = null;
      }
    },
    setSelectedModel(state, action: PayloadAction<FipeBase | null>) {
      state.selections.model = action.payload;
      state.selections.year = null;

      if (action.payload === null) {
        state.data.years = null;
      }
    },
    setSelectedYear(state, action: PayloadAction<FipeBase | null>) {
      state.selections.year = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    resetSelections(state) {
      state.selections.brand = null;
      state.selections.model = null;
      state.selections.year = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchModels.pending, state => {
        state.loading = true;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.data.models = action.payload;
        state.loading = false;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.data.models = null;
        state.errors.models = action.payload as string;
        state.loading = false;
      });

    builder
      .addCase(fetchYears.pending, state => {
        state.loading = true;
      })
      .addCase(fetchYears.fulfilled, (state, action) => {
        state.data.years = action.payload;
        state.loading = false;
      })
      .addCase(fetchYears.rejected, (state, action) => {
        state.data.years = null;
        state.errors.years = action.payload as string;
        state.loading = false;
      });

    builder
      .addCase(fetchValue.pending, state => {
        state.loading = true;
      })
      .addCase(fetchValue.fulfilled, (state, action) => {
        state.data.value = action.payload;
        state.errors.value = null;
        state.loading = false;

        // Reset data
        state.data.models = null;
        state.data.years = null;
      })
      .addCase(fetchValue.rejected, (state, action) => {
        state.data.value = null;
        state.errors.value = action.payload as string;
        state.loading = false;

        // Reset data
        state.data.models = null;
        state.data.years = null;
      });
  }
});

export const {
  setSelectedBrand,
  setSelectedModel,
  setSelectedYear,
  setLoading,
  resetSelections
} = fipeSlice.actions;

export const fipeReducer = fipeSlice.reducer;
