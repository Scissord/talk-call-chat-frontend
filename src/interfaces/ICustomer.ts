export type ICustomer = {
  id: string;
  name: string | "";
  phone: string | "";
  buyer_phone: string | "";
  avatar: string | null;
  good: string | null;
  assistant: string | null;
  thread: string | null;
  status: number | 0;
  ai_active: boolean | false;
  order_id: string | null;
  counter: number | null | 0;
  manager_id: string;
};
