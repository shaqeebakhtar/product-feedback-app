import { Plus } from "lucide-react";
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

const Header = () => {
  return (
    <header>
      <div className="bg-slate-800 px-4 py-3 rounded-lg flex justify-between items-center">
        <div className="flex items-center text-white">
          <Label htmlFor="sort-feedbacks" className="text-sm font-normal">
            Sort by:
          </Label>
          <Select defaultValue="most upvotes">
            <SelectTrigger
              id="sort-feedbacks"
              className="w-[160px] text-white bg-transparent border-none font-bold"
            >
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent className="w-[200px] text-slate-500">
              <SelectItem
                className="py-3 border-b-2 border-slate-100 focus:bg-transparent focus:text-purple-600"
                value="most upvotes"
              >
                Most Upvotes
              </SelectItem>
              <SelectItem
                className="py-3 border-b-2 border-slate-100 focus:bg-transparent focus:text-purple-600"
                value="least upvotes"
              >
                Least Upvotes
              </SelectItem>
              <SelectItem
                className="py-3 border-b-2 border-slate-100 focus:bg-transparent focus:text-purple-600"
                value="most comments"
              >
                Most Comments
              </SelectItem>
              <SelectItem
                className="py-3 focus:bg-transparent focus:text-purple-600"
                value="least comments"
              >
                Least Comments
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-4">
          <Button className="bg-purple-600 hover:bg-purple-700 font-bold flex gap-1">
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
