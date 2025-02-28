import { NextRequest, NextResponse } from "next/server";
import type { FipeModels } from "@/types/fipe";

const TIMEOUT = 5000;

interface Params {
  brandId: string;
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<Params> }
): Promise<NextResponse<FipeModels[]> | NextResponse<{ error: string }>> {
  const { brandId } = (await params) ?? {};

  if (!brandId) {
    return NextResponse.json(
      { error: "Parâmetro 'brandId' é obrigatório." },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(
      `${process.env.API_FIPE_BASE_URL}/${brandId}/modelos`,
      {
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Erro na API externa: ${res.statusText}`);
    }

    const data: FipeModels[] = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    clearTimeout(timeoutId);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
