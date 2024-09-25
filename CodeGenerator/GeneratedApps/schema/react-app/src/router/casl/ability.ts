import { defineAbility } from "@casl/ability";

function subjectName(item: any) {
  if (!item || typeof item === "string") {
    return item;
  }

  return item.__type;
}

export default defineAbility((can, cannot) => {
  can("read", "Post");
  cannot("delete", "Post", { published: true });
});
