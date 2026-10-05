







// Each user's shopping cart is stored in the database, so adding items to it requires login.
// — Visitors are redirected to the login page instead of allowing the API to generate a 401 error code.

import { useDispatch ,  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";
export default function useAddToCart() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //user in authslice in initialstate
  const user = useSelector(state => state.auth.user);
  return (product , quantity = 1) =>{
if(!user){
  navigate("/login");
  return;
}
const toastId = toast.loading("Adding to cart...");
dispatch(addToCart({ productId: product.id, quantity }))
         .unwrap()
         .then(() => {

      toast.success(`${product.name} added to cart! 🛍️`, {
          id: toastId, // تحديث نفس الـ Toast الفوري
          style: {
            background: '#efdce4',
            color: '#15c60b', // emerald-700
            fontWeight: 'semibold',
          },
        });
      })
      .catch((message) => {
        toast.error(message || "Failed to add product", {
          id: toastId,
        });
      });
    }




















  } 



