"use client";

import type { Role } from "@/server/db/schema";
import SignOutButton from "@/features/auth/components/SignOutButton";

type TopbarProps = {
  user: {
    name?: string | null;
    email: string;
    role: Role;
  };
};

const roleBadgeStyles: Record<Role, string> = {
  admin: "bg-purple-50 text-purple-700 border-purple-200",
  analyst: "bg-blue-50 text-blue-700 border-blue-200",
  viewer: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function Topbar({ user }: TopbarProps) {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      {/* Context info / Search placeholder */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Workspace
        </span>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-700">Platform Portal</span>
      </div>

      {/* User profile & Sign out */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 leading-tight">
            {user.name || user.email.split("@")[0]}
          </div>
          <div className="text-xs text-gray-500 leading-tight">{user.email}</div>
        </div>

        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${
            roleBadgeStyles[user.role] ?? roleBadgeStyles.viewer
          }`}
        >
          {user.role}
        </span>

        <div className="h-6 w-px bg-gray-200" />

        <SignOutButton />
      </div>
    </header>
  );
}
