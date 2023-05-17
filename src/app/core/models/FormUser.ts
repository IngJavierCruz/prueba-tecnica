import { DynamicForm } from "./DynamicForm";
import { FormAnswer } from "./FormAnswer";

export interface FormUser {
  id?: number;
  dynamicFormId: number;
  userId: number;
  status: string;
  dynamicForm?: DynamicForm;
  formAnswer?: FormAnswer[];
}