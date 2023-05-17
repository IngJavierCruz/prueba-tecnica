import { DynamicFormControl } from "./DynamicFormControl";
import { FormUser } from "./FormUser";

export interface DynamicForm {
  id?: number;
  name: string;
  description: string;
  status: string;
  dynamicFormControls?: DynamicFormControl[];
  formUser?: FormUser[];
};
