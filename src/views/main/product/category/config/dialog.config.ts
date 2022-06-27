import { IForm } from "@/base-ui/form";

const DialogConfig: IForm = {
  formItems: [
    {
      field: "name",
      label: "类别",
      type: "input",
      placeholder: "请输入类别",
    },
  ],
  colLayout: {
    span: 24,
  },
};

export default DialogConfig;
