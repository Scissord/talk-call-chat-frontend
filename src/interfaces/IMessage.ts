import { IAttachment } from "@interfaces";

export type IMessage = {
  id: string | null;
  customer_id: string;
  text: string | "";
  incoming: boolean;
  quoted_message: string | null;
  user_id: number | null;
  avatar: string | null;
  attachment_url: string | null;
  attachments: IAttachment[] | null;
  url: string | null;
};
