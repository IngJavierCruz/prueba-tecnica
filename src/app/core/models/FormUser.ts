import { DynamicForm } from "./DynamicForm";
import { FormAnswer } from "./FormAnswer";
import { User } from "./authentication/User";

export interface FormUser {
  id?: number;
  dynamicFormId: number;
  userId: number;
  status: string;
  dynamicForm?: DynamicForm;
  formAnswer?: FormAnswer[];
  user?: User[];
}