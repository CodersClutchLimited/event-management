export const roles = [
  {
    name: "Administrator",
    description: "Has full access to all system features.",
    permissions: {
      view_dashboard: { level: "full" },
      manage_users: { level: "full" },
      manage_staffs: { level: "full" },
      manage_events: { level: "full" },

      manage_settings: { level: "full" },
    },
  },

  {
    name: "Staff",
    description:
      "Has access to customers, Event, and settings with limited access.",
    permissions: {
      view_dashboard: { level: "view" },
      manage_users: { level: "full" },
      manage_staffs: { level: "view" },
      manage_events: { level: "full" },

      manage_settings: { level: "view" },
    },
  },
];
