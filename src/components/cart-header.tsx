export default function CartHeader() {
  return (
    <table className="w-full">
      <thead>
        <tr className="grid grid-cols-5">
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
    </table>
  );
}
