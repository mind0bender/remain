import { $ZodIssue } from "zod/v4/core";

export function zodIssuesToStrings(issues: $ZodIssue[]): string[] {
  return issues.flatMap((issue: $ZodIssue): string => issue.message);
}
