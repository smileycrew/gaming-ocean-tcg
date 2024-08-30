import { Button } from "@/components/ui/button";
import { getCharges } from "@/lib/server-utils";
import { convertUnixTimestampToDate, toUsdPrice } from "@/lib/utils";
import Link from "next/link";

export default async function Page() {
  const charges = await getCharges();

  if (charges.length <= 0) {
    return (
      <div className="flex h-full items-center justify-center text-center">
        <p>No orders on your account.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <table className="w-2/3">
        <thead>
          <tr className="grid grid-cols-5">
            <th>Order</th>
            <th>Date</th>
            <th>Price</th>
            <th>Receipt</th>
            <th></th>
          </tr>
        </thead>
      </table>

      <ul className="w-2/3">
        {charges.map((charge, index) => (
          <li
            className="grid grid-cols-5 items-center text-center"
            key={charge.id}
          >
            <p>{index + 1}</p>
            <p>{convertUnixTimestampToDate(charge.created)}</p>
            <p>{toUsdPrice(charge.amount / 100)}</p>

            <Button asChild variant="link">
              <Link href={charge.receipt_url}>View my receipt</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
