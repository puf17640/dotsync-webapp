// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../helpers";

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const projectName = req.query?.projectName as string;
  console.log(`initialize-project: [${projectName}]`);

  let success = false;

  if (projectName) {
    const { count } = await supabase
      .from("projects")
      .select("name", { count: "exact" })
      .eq("name", projectName);

    if (count === 0) {
      const response = await supabase
        .from("projects")
        .insert({ name: projectName });
      success = response.status === 201;
    }
  }
  res.json({ success });
}
