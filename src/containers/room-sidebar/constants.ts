import QueueIcon from "~/assets/icons/etc-icons/queue.svg?react";
import PeopleIcon from "~/assets/icons/etc-icons/people.svg?react";
import ChatIcon from "~/assets/icons/etc-icons/chat.svg?react";

export enum SidebarChips {
  Queue = "queue",
  People = "people",
  Chat = "chat",
}

export const chips = [
  { Icon: QueueIcon, name: SidebarChips.Queue },
  { Icon: PeopleIcon, name: SidebarChips.People },
  { Icon: ChatIcon, name: SidebarChips.Chat },
];
