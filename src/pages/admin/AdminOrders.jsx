const AdminOrders = () => {
  return (
    <div className="p-6 bg-white rounded-xl border border-[#E5DFD3] shadow-sm">
      <h2 className="text-2xl font-bold text-[#473428] mb-2">Manage Orders</h2>
      <p className="text-sm text-[#9A8B7F] mb-6">
        View and update customer orders status.
      </p>

      <div className="text-center py-12 border border-dashed border-[#E5DFD3] rounded-lg">
        <p className="text-gray-500">No orders received yet.</p>
      </div>
    </div>
  );
};

export default AdminOrders;