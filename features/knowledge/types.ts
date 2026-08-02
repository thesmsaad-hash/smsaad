import { DocItem } from "@/types";

export type KnowledgeDoc = DocItem;

export interface KnowledgeGraphNode {
  id: string;
  name: string;
  type: "concept" | "tool" | "workflow" | "model";
  url: string;
}
