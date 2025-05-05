// Libraries Imports
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function ReportsCards({
  title,
  icon,
  description,
  amount,
  symbol,
  symbolPosition,
}: {
  title: string;
  icon: React.ReactNode;
  amount: number;
  description?: string;
  symbol?: string;
  symbolPosition?: "left" | "right";
}) {
  return (
    <Card className="@container/card !bg-[#fbfcf7]">
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex justify-between items-center !w-full">
          <h2 className="text-lg sm:text-xl">{title}</h2>
          {icon}
        </div>
        <div>
          {symbol &&
            (symbolPosition === "right" ? (
              <h2 className="text-4xl font-bold">
                {`${amount}`}
                {symbol}
              </h2>
            ) : (
              <h2 className="text-4xl font-bold">
                {symbol}
                {`${amount}`}
              </h2>
            ))}
        </div>
        <div>{description && <p className="text-md">{description}</p>}</div>
      </CardFooter>
    </Card>
  );
}
