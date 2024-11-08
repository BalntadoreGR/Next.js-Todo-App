import Link from "next/link";

import { Tasks } from "~/app/_components/tasks";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.task.getTasks.prefetch();

  return (
    <HydrateClient>       
      <Tasks />
    </HydrateClient>
  );
}
