import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**Redirect to home page */
export default function Error(): null {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
