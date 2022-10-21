import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { JoinChatFormData } from "./types";

const defaultValues = {
  name: "",
  room: "",
};

const schema = yup.object({
  name: yup.string().required("Field Required!"),
  room: yup.string().required("Field Required!"),
});

function useJoinChatForm() {
  return useForm<JoinChatFormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });
}

export default useJoinChatForm;
