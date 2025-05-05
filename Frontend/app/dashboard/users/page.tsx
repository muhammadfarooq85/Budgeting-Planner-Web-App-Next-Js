// Libraries Imports
import { UserRoundPen } from "lucide-react";
// Local Imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

export default function Users() {
  return (
    <div className="px-4 lg:px-6">
      <div className="flex justify-end">
        <Button
          id="addExpense"
          name="addExpense"
          type="button"
          aria-label="Add Expense"
          variant="outline"
          size="sm"
          className="!bg-[#d7e6c5]  cursor-pointer !text-lg !font-bold"
        >
          <IconPlus />
          <span className="hidden lg:inline">Add Users</span>
        </Button>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 place-items-center md:grid-cols-5 bg-[#fbfcf7] border border-[#e1e0f9] shadow-none rounded-sm p-4">
          <div className="flex gap-4 items-center">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="!bg-[#d7e6c5] !text-xl">
                FA
              </AvatarFallback>
            </Avatar>
            <h1 className="text-lg sm:text-xl">Farooq</h1>
          </div>

          <h1 className="text-lg sm:text-xl">Staff</h1>
          <h1 className="text-lg sm:text-xl">Full time</h1>
          <h1 className="text-lg sm:text-xl">Designer</h1>
          <UserRoundPen className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
