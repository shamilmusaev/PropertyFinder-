const PropertySellerInfo = ({ property }) => {
  return (
    <aside className="space-y-4">
      

      {/* <!-- Contact Form --> */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Seller</h3>
        <p className="font-bold">Seller Name: </p> <span>{property.seller_info.name}</span>
        <p className="font-bold">Phone: </p> <span>{property.seller_info.phone}</span>
        <p className="font-bold">Email: </p> <span>{property.seller_info.email}</span>
      </div>
    </aside>
  );
};

export default PropertySellerInfo;
