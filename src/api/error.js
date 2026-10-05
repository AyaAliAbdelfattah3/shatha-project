
//Handling errors in 3 ways

export function getErrorMessage(error) {
  const data = error?.response?.data;

  // error 1
  if (data?.errors?.length) 
    return  data.errors[0].message;;
 


  //error 2
  if (data?.message)
     return  data.message;
 


  //server error
  return "something login went wrong . please try again";
} 