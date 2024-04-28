import { Url } from "@/models/url.model";
import { NextRequest, NextResponse } from "next/server";

interface IdParams {
  params: {
    id: string;
  };
}

export async function GET(_: NextRequest, { params }: IdParams) {
  const { id } = params;
  const url = await Url.findOne({ uniqueId: id });

  if (!url) {
    return NextResponse.json({ message: "URL not found" }, { status: 404 });
  }

  return NextResponse.json({ url: url.longUrl });
}
