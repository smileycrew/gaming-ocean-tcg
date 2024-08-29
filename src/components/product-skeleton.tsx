import { INITIAL_PRODUCTS } from "@/lib/constants";
import { Skeleton } from "./ui/skeleton";

export default function ProductSkeleton() {
  return (
    <ul className="flex flex-1 items-center justify-center gap-10">
      {Array.from({ length: INITIAL_PRODUCTS }).map((_, index) => (
        <li className="flex w-[300px] flex-col gap-3" key={index}>
          <Skeleton className="h-[100px] w-[100px] self-center" />
          <Skeleton className="h-[25px] w-[70px]" />
          <Skeleton className="h-[25px] w-[]" />
          <Skeleton className="h-[35px] w-[]" />
        </li>
      ))}
    </ul>
  );
}
