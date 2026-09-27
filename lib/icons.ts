import { BookOpen, Cross, Eye, HandHeart, Heart, Users } from "lucide-react";

/** Icônes des cartes « valeurs » — doit couvrir la liste du schéma pageContent.values. */
export const valueIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  HandHeart,
  BookOpen,
  Users,
  Cross,
  Eye,
};
