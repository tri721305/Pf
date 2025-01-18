import { Input } from "@/components/ui/input";

export function Search(props) {
  return (
    <div>
      <Input
        {...props}
        type="search"
        placeholder="Search ..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
}
