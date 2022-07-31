// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../helpers";

type Data = {
  exists: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const projectName = req.query?.projectName as string;
  console.log(`project-exists: [${projectName}]`);

  let exists = false;

  if (projectName) {
    const { count } = await supabase
      .from("projects")
      .select("name", { count: "exact" })
      .eq("name", projectName);

    exists = !!count && count > 0;
  }
  res.json({ exists });
}
