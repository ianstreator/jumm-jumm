import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASE_URL = "https://cdn.contentful.com";

  const space = process.env.SPACE_ID;
  const accessToken = process.env.CDA_TOKEN;

  const body = await request.json();

  if (body.quote) {
  }

  console.log(body);

  return NextResponse.json(body);
}
