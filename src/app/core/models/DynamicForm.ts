import { DynamicFormControl } from "./DynamicFormControl";

export interface DynamicForm {
  id?: number;
  name: string;
  description: string;
  items: DynamicFormControl[];
};
