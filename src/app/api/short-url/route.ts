import { generateShortId } from "@/helpers/generateShortId";
import { NextRequest, NextResponse } from "next/server";
import { Url } from "@/models/url.model";
import { connect } from "@/configs/db.config";

connect();

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url) {
    return NextResponse.json("URL is required", { status: 400 });
  }

  const urlFound = await Url.findOne({ longUrl: url });

  // shortURL already exists
  if (urlFound) {
    return NextResponse.json({ uniqueId: urlFound.uniqueId });
  }

  // get unique shortId
  const uniqueId = generateShortId(12);

  const newUrlData = await Url.create({
    longUrl: url,
    uniqueId,
  });

  console.log(newUrlData);

  // short URL creation failed
  if (!newUrlData) {
    return NextResponse.json(
      { message: "Error creating short URL" },
      { status: 500 }
    );
  }

  return NextResponse.json({ uniqueId });
}
