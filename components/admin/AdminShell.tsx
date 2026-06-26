"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  List,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  Moon,
  Search,
  Settings,
  Shield,
  Stethoscope,
  Sun,
  TrendingUp,
  Users,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

type AdminShellProps = {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  } | null;
};

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
      { href: "/admin/analytics", label: "Analytics", icon: TrendingUp },
      { href: "/admin/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Patients & Appointments",
    items: [
      { href: "/admin/appointments", label: "Appointments", icon: Calendar },
      { href: "/admin/patients", label: "Patients", icon: Users },
      { href: "/admin/treatments", label: "Treatments", icon: Activity },
    ],
  },
  {
    label: "Financial",
    items: [
      { href: "/admin/payments", label: "Payments", icon: CreditCard },
      { href: "/admin/invoices", label: "Invoices", icon: FileText },
      { href: "/admin/reports/revenue", label: "Revenue Reports", icon: DollarSign },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/blog", label: "Blog Posts", icon: BookOpen },
      { href: "/admin/services", label: "Services Manager", icon: Stethoscope },
      { href: "/admin/availability", label: "Availability", icon: Clock },
    ],
  },
  {
    label: "Communications",
    items: [
      { href: "/admin/messages", label: "Messages", icon: MessageSquare },
      { href: "/admin/whatsapp", label: "WhatsApp Logs", icon: MessageCircle },
      { href: "/admin/email-templates", label: "Email Templates", icon: Mail },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/admins", label: "Admin Users", icon: Shield },
      { href: "/admin/logs", label: "Activity Logs", icon: List },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminShell({ children, user }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  const content = (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#0f1923] text-white transition-transform md:flex ${
          sidebarOpen ? "translate-x-0" : "-translate-x-56"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-teal to-brand-green">
              <Stethoscope className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-heading font-bold leading-tight">
                HEALTH POINT
              </p>
              <p className="text-[10px] font-sub uppercase tracking-[0.25em] text-brand-teal">
                Admin Portal
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="rounded-full bg-white/10 p-1 text-white hover:bg-white/20"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex-1 space-y-4 overflow-y-auto px-3 pb-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {group.label}
              </p>
              <div className="mt-1 space-y-1">
                {group.items.map((item) => {
                  const active = pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-[13px] transition ${
                        active
                          ? "bg-brand-teal text-white"
                          : "text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal text-sm font-semibold">
                {user?.name?.[0] ?? "A"}
              </div>
              <div className="text-xs">
                <p className="font-semibold">
                  {user?.name ?? "Admin User"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {(user as any)?.role ?? "admin"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-white/10 p-2 text-slate-200 hover:bg-white/20"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Topbar */}
      <header className="fixed inset-x-0 top-0 z-20 flex h-14 items-center border-b border-slate-100 bg-white/95 px-4 shadow-sm md:pl-64">
        <div className="flex flex-1 items-center gap-3">
          <button
            type="button"
            className="mr-1 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </button>
          <p className="text-sm font-semibold text-brand-text">
            Admin Dashboard
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 md:flex">
            <Search className="mr-2 h-3.5 w-3.5" />
            <span>Search (Ctrl+K)</span>
          </div>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
              0
            </span>
          </button>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-[#0f1923] text-white">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-teal to-brand-green">
                  <Stethoscope className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-heading font-bold leading-tight">
                    HEALTH POINT
                  </p>
                  <p className="text-[10px] font-sub uppercase tracking-[0.25em] text-brand-teal">
                    Admin Portal
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-white/10 p-1 text-white hover:bg-white/20"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
            <div className="mt-2 h-[calc(100vh-5rem)] space-y-4 overflow-y-auto px-3 pb-4">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {group.label}
                  </p>
                  <div className="mt-1 space-y-1">
                    {group.items.map((item) => {
                      const active = pathname.startsWith(item.href);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-[13px] transition ${
                            active
                              ? "bg-brand-teal text-white"
                              : "text-slate-200 hover:bg-white/5"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="flex-1 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <main className="pt-16 md:pl-64">
        <div className="min-h-[calc(100vh-56px)] bg-slate-50 px-4 py-4">
          {children}
        </div>
      </main>
    </>
  );
}

