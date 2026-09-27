import type { SchemaTypeDefinition } from "sanity";
import event from "./event";
import sermon from "./sermon";
import album from "./album";
import teamMember from "./teamMember";
import faq from "./faq";
import pageContent from "./pageContent";
import siteSettings from "./siteSettings";
import stat from "./stat";
import department from "./department";
import testimonial from "./testimonial";
import weeklyProgram from "./weeklyProgram";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    event,
    weeklyProgram,
    sermon,
    album,
    teamMember,
    faq,
    stat,
    department,
    testimonial,
    pageContent,
  ],
};