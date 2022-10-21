import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { MessageFormData } from "./types";

const defaultValues = {
  message: "",
};

const schema = yup.object({
  message: yup.string().required(""),
});

function useMessageForm() {
  return useForm<MessageFormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });
}

export default useMessageForm;
