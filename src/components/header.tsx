import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Logout from "./logout";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  sort: string;
  setSort: (value: string) => void;
};

const Header = ({ sort, setSort }: Props) => {
  const router = useRouter();

  return (
    <header className="sticky top-8">
      <div className="bg-slate-800 px-4 py-3 rounded-lg flex justify-between items-center shadow-lg">
        <div className="flex items-center text-white">
          <Label htmlFor="sort-feedbacks" className="text-sm font-normal">
            Sort by:
          </Label>

          <Select
            defaultValue="mostUpvotes"
            value={sort}
            onValueChange={setSort}
          >
            <SelectTrigger
              id="sort-feedbacks"
              className="w-[160px] text-white bg-transparent border-none font-bold"
            >
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent className="w-[200px] text-slate-500">
              <SelectItem
                className="py-3 border-b-2 border-slate-100 focus:bg-transparent focus:text-purple-600"
                value="mostUpvotes"
              >
                Most Upvotes
              </SelectItem>
              <SelectItem
                className="py-3 border-b-2 border-slate-100 focus:bg-transparent focus:text-purple-600"
                value="leastUpvotes"
              >
                Least Upvotes
              </SelectItem>
              <SelectItem
                className="py-3 border-b-2 border-slate-100 focus:bg-transparent focus:text-purple-600"
                value="mostComments"
              >
                Most Comments
              </SelectItem>
              <SelectItem
                className="py-3 focus:bg-transparent focus:text-purple-600"
                value="leastComments"
              >
                Least Comments
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-4">
          <Button
            onClick={() => router.push("/add-feedback")}
            className="bg-purple-600 hover:bg-purple-700 font-bold flex gap-1"
          >
            <Plus size={16} strokeWidth={3} />
            Add Feedback
          </Button>
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
