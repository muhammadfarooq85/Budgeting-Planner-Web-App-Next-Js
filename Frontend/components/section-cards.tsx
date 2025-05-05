// Libraries Imports
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// Local Imports
import { Badge } from "@/components/ui/badge";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 xl:grid-cols-2">
      <Card className="@container/card !bg-[#fbfcf7]">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">My accounts</CardTitle>
        </CardHeader>
        <CardFooter className="flex-col gap-4 !w-full">
          <div className="flex justify-between !w-full">
            <p className="text-xl font-normal">Bank Accounts</p>
            <p className="text-xl font-bold">$23.826</p>
          </div>
          <div className="flex justify-between !w-full">
            <p className="text-xl font-normal">Cash</p>
            <p className="text-xl font-bold">$34.109</p>
          </div>
          <div className="flex justify-between !w-full">
            <p className="text-xl font-normal">Bank</p>
            <p className="text-xl font-bold">$10.320</p>
          </div>
          <div className="flex justify-between !w-full">
            <p className="text-xl font-normal">Total</p>
            <p className="text-xl font-bold">$68.255</p>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card !bg-[#fbfcf7]">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            Upcoming transasctions
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col gap-4 !w-full">
          <div className="flex justify-between !w-full">
            <p className="text-xl font-normal">14/11/23</p>
            <p className="text-xl text-green-600">+$23.826</p>
            <p className="text-xl">Al Falah</p>
            <Badge>Subscription</Badge>
          </div>
          <div className="flex justify-between !w-full">
            <p className="text-xl font-normal">14/11/23</p>
            <p className="text-xl text-red-600">-$23.826</p>
            <p className="text-xl">Al Fateh Foundation</p>
            <Badge>Charity</Badge>
          </div>
          <div className="flex justify-between !w-full">
            <p className="text-xl font-normal">14/11/23</p>
            <p className="text-xl text-green-600">+$23.826</p>
            <p className="text-xl">Masama Foundation</p>
            <Badge>Subscription</Badge>
          </div>
          <div className="flex justify-between !w-full">
            <p className="text-xl font-normal">14/11/23</p>
            <p className="text-xl text-red-600">-$23.826</p>
            <p className="text-xl">Moazam Foundation</p>
            <Badge>Supplier</Badge>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
