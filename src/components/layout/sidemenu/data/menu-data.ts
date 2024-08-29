export type SideMenuData = {
  link: string;
  title: string;
  children?: SideMenuData[];
};

export const sideMenuList = [
  {
    key: "home",
    link: "/wellcome",
    title: "Home",
  },
  {
    key: "tasks",
    link: "/task",
    title: "Tasks",
    children: [
      {
        key: "list-tasks",
        link: "/task",
        title: "List tasks",
      },
      {
        key: "add-tasks",
        link: "/task/add",
        title: "Add task",
      },
    ],
  },
];
