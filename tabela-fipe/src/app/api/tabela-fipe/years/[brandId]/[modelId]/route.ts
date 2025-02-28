import { NextRequest, NextResponse } from "next/server";
import type { FipeYears } from "@/types/fipe";

const TIMEOUT = 5000;

interface Params {
  brandId: string;
  modelId: string;
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<Params> }
): Promise<NextResponse<FipeYears[]> | NextResponse<{ error: string }>> {
  const { brandId, modelId } = (await params) ?? {};

  if (!brandId || !modelId) {
    return NextResponse.json(
      { error: "Parâmetros 'brandId' e 'modelId' são obrigatórios." },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(
      `${process.env.API_FIPE_BASE_URL}/${brandId}/modelos/${modelId}/anos`,
      {
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Erro na API externa: ${res.statusText}`);
    }

    const data: FipeYears[] = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    clearTimeout(timeoutId);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
