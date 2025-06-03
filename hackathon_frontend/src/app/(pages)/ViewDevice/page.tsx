"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Gauge,
  Droplet,
  Power,
  Clock,
  Sun,
  Moon,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ThemeToggle } from "@/app/Components/ThemeToggle";
import Link from "next/link";
import { GlowingEffect } from "@/app/Components/ui/glowing-effect";

const timeSchema = z
  .object({
    startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "O horário final deve ser após o inicial",
  });

type FormData = z.infer<typeof timeSchema>;

export default function ViewDevice() {
  const [deviceStatus, setDeviceStatus] = useState({
    power: true,
    autoMode: true,
    temperature: 24.5,
    humidity: 65,
    lastActivation: new Date().toLocaleTimeString(),
    connection: true,
    startTime: "08:00",
    endTime: "18:00",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(timeSchema),
    defaultValues: {
      startTime: "08:00",
      endTime: "18:00",
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDeviceStatus((prev) => ({
        ...prev,
        lastActivation: new Date().toLocaleTimeString(),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: FormData) => {
    setDeviceStatus((prev) => ({
      ...prev,
      startTime: data.startTime,
      endTime: data.endTime,
    }));
  };

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error("Erro ao buscar dados do clima");

      const data = await response.json();

      setDeviceStatus((prev) => ({
        ...prev,
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        connection: true,
      }));
    } catch (error) {
      console.error("Erro ao buscar dados do clima:", error);
      setDeviceStatus((prev) => ({
        ...prev,
        connection: false,
      }));
    }
  };

  const fetchSunsetTime = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`
      );
      const data = await response.json();
      const sunsetUTC = new Date(data.results.sunset);
      const sunsetLocal = new Date(
        sunsetUTC.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
      );

      const startTime = new Date(sunsetLocal.getTime() - 60 * 60 * 1000);
      const endTime = new Date(sunsetLocal.getTime() + 60 * 60 * 1000);

      setDeviceStatus((prev) => ({
        ...prev,
        startTime: startTime.toTimeString().slice(0, 5),
        endTime: endTime.toTimeString().slice(0, 5),
      }));
    } catch (error) {
      console.error("Erro ao buscar horário do pôr do sol:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
          fetchSunsetTime(latitude, longitude);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          setDeviceStatus((prev) => ({
            ...prev,
            connection: false,
          }));
        }
      );
    } else {
      console.error("Geolocalização não suportada.");
      setDeviceStatus((prev) => ({
        ...prev,
        connection: false,
      }));
    }
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="Logo do Repelente Inteligente"
              width={90}
              height={80}
              priority
            />
          </Link>
          <h1 className="text-3xl font-bold ml-4">Repelente Inteligente</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {deviceStatus.connection ? (
            <Wifi className="text-green-500" />
          ) : (
            <WifiOff className="text-red-500" />
          )}
        </div>
      </header>

      {/* Status Cards */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          icon={<Gauge className="text-blue-500" />}
          title="Temperatura"
          value={`${deviceStatus.temperature}°C`}
        />
        <StatusCard
          icon={<Droplet className="text-cyan-500" />}
          title="Umidade"
          value={`${deviceStatus.humidity}%`}
        />
        <StatusCard
          icon={<Clock className="text-purple-500" />}
          title="Última Ativação"
          value={deviceStatus.lastActivation}
        />
        <StatusCard
          icon={
            deviceStatus.autoMode ? (
              <Sun className="text-yellow-500" />
            ) : (
              <Moon className="text-indigo-500" />
            )
          }
          title="Modo"
          value={deviceStatus.autoMode ? "Automático" : "Manual"}
        />
      </ul>

      {/* Energy & Schedule Control */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Controle de Energia</span>
              <Switch
                checked={deviceStatus.power}
                onCheckedChange={(checked) =>
                  setDeviceStatus({ ...deviceStatus, power: checked })
                }
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {deviceStatus.power
                ? "O dispositivo está ligado e operacional"
                : "O dispositivo está em modo de espera"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Programação</span>
              <Switch
                checked={deviceStatus.autoMode}
                onCheckedChange={(checked) =>
                  setDeviceStatus({ ...deviceStatus, autoMode: checked })
                }
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {deviceStatus.autoMode ? (
              <p className="text-sm text-muted-foreground">
                Modo automático: {deviceStatus.startTime} - {deviceStatus.endTime}
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Início</Label>
                    <Input id="startTime" type="time" {...register("startTime")} />
                    {errors.startTime && (
                      <p className="text-sm text-red-500">{errors.startTime.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Término</Label>
                    <Input id="endTime" type="time" {...register("endTime")} />
                    {errors.endTime && (
                      <p className="text-sm text-red-500">{errors.endTime.message}</p>
                    )}
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Salvar Horários
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <li className="list-none">
      <div className="relative h-full rounded-2xl border p-4 shadow-sm dark:shadow-[0px_0px_15px_#2D2D2D]">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="relative flex flex-col gap-3">
          <div className="w-fit rounded-lg border p-2">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{value}</p>
        </div>
      </div>
    </li>
  );
}
