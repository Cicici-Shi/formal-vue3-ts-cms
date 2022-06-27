type IFormType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
  field: string;
  type: IFormType; //设在上面
  label: string;
  rules?: any[];
  placeholder?: any;
  // 针对select才有
  options?: any[];
  // 针对特殊的属性 如datepicker......
  otherOptions?: any;
  isHidden?: any;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any; //对象，想定义也可以定义下
  itemStyle?: any;
}
