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
  const { projectName, data } = req.body;
  console.log(`update-data: [${projectName} | ${data}]`);

  let success = false;

  if (projectName) {
    const response = await supabase
      .from("projects")
      .update({ data })
      .eq("name", projectName);
    success = !!response.data && response.data[0].data === data;
  }
  res.json({ success });
}
