import { NextResponse } from "next/server";
import looks from "../../../data/looks.json";

export function GET() {
  return NextResponse.json(looks);
}
