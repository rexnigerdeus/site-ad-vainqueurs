import type { SchemaTypeDefinition } from "sanity";
import event from "./event";
import sermon from "./sermon";
import album from "./album";
import teamMember from "./teamMember";
import faq from "./faq";
import pageContent from "./pageContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, sermon, album, teamMember, faq, pageContent],
};