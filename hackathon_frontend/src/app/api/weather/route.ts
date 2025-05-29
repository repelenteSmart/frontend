// app/api/weather/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude e longitude são obrigatórios" }, { status: 400 });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY; // Coloque sua chave no .env
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`);
    
    if (!res.ok) throw new Error("Erro ao acessar a WeatherAPI");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro na API de clima:", error);
    return NextResponse.json({ error: "Erro ao buscar dados do clima" }, { status: 500 });
  }
}
