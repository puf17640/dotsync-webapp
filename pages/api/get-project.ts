// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../helpers";

type Data = {
  project: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const projectName = req.query?.projectName as string;
  console.log(`get-project: [${projectName}]`);

  let project = null;

  if (projectName) {
    const response = await supabase
      .from("projects")
      .select("*")
      .eq("name", projectName);
    if (response.data && response.data[0]) {
      project = response.data[0];
    }
  }
  res.json({ project });
}
