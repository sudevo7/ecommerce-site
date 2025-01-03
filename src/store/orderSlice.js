import { useSelector } from "react-redux";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders);

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="p-4 bg-gray-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Order #{order.id}</h2>
            <ul className="space-y-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-gray-600">Total: ${order.total.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
