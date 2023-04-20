import { useEffect } from "react";
import { getAllUsers } from "../redux/actions";
import { useAppDispatch } from "../redux/hooks";

function CreateChat() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return <div></div>;
}
export default CreateChat;
