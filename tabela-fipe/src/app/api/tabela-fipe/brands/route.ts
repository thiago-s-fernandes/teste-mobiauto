import { NextResponse } from "next/server";
import type { FipeBrands } from "@/types/fipe";

const TIMEOUT = 5000;

export async function GET(): Promise<
  NextResponse<FipeBrands[]> | NextResponse<{ error: string }>
> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(`${process.env.API_FIPE_BASE_URL}`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Erro na API externa: ${res.statusText}`);
    }

    const data: FipeBrands[] = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    clearTimeout(timeoutId);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
