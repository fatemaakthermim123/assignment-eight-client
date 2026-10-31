import { Mail, User as UserIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface User {
  id?: number;
  _id?: string;
  name: string;
  email: string;
}

const getInitials = (name: string) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  return initials || "?";
};

// Mongo documents come back with _id (string/ObjectId) and no numeric id,
// so derive a numeric seed from whichever identifier is present.
const getSeed = (user: User) => {
  if (typeof user.id === "number") return user.id;
  return [...(user._id ?? "?")].reduce(
    (acc, ch) => acc + ch.charCodeAt(0),
    0
  );
};

// Full class strings (not interpolated) so Tailwind's scanner picks them all up.
const PALETTE = [
  {
    card: "bg-linear-to-br from-violet-500 to-purple-700 text-white",
    avatar: "bg-white/25 text-white",
    badge: "bg-white/20 text-white",
  },
  {
    card: "bg-linear-to-br from-sky-500 to-blue-700 text-white",
    avatar: "bg-white/25 text-white",
    badge: "bg-white/20 text-white",
  },
  {
    card: "bg-linear-to-br from-emerald-500 to-teal-700 text-white",
    avatar: "bg-white/25 text-white",
    badge: "bg-white/20 text-white",
  },
  {
    card: "bg-linear-to-br from-rose-500 to-pink-700 text-white",
    avatar: "bg-white/25 text-white",
    badge: "bg-white/20 text-white",
  },
  {
    card: "bg-linear-to-br from-amber-400 to-orange-600 text-white",
    avatar: "bg-white/25 text-white",
    badge: "bg-white/25 text-white",
  },
  {
    card: "bg-linear-to-br from-cyan-500 to-teal-600 text-white",
    avatar: "bg-white/25 text-white",
    badge: "bg-white/20 text-white",
  },
];

const UserCard = ({ user, className }: { user: User; className?: string }) => {
  const colors = PALETTE[Math.abs(getSeed(user)) % PALETTE.length];

  return (
    <Card
      className={cn(
        "w-full border-transparent ring-transparent transition-transform hover:-translate-y-1 hover:shadow-lg",
        colors.card,
        className
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar size="lg" className={cn(colors.avatar, "after:border-white/40")}>
            <AvatarFallback className={colors.avatar}>
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <CardTitle className="truncate">{user.name}</CardTitle>
            {user.id !== undefined && (
              <CardDescription className="text-white/80">
                Member #{user.id}
              </CardDescription>
            )}
          </div>
          <Badge
            variant="secondary"
            className={cn("ml-auto shrink-0", colors.badge)}
          >
            <UserIcon data-icon="inline-start" />
            User
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-2 text-sm text-white/90">
          <Mail className="size-4 shrink-0" aria-hidden />
          <a
            href={`mailto:${user.email}`}
            className="truncate hover:underline"
          >
            {user.email}
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
