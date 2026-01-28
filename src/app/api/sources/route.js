import { NextResponse } from "next/server";
import sources from "../../../data/sources.json";

export function GET() {
  return NextResponse.json(sources);
}
