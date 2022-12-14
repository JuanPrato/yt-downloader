import type { NextApiRequest, NextApiResponse } from 'next'
import ytdl from "ytdl-core";

type Data = {
  url: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { url } = req.query;

  const info = await ytdl.getInfo(url as string);
  const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
  const audio = ytdl.downloadFromInfo(info, {
    format: audioFormats[0],
  });

  res.status(200).setHeader('Content-Type', 'audio/mpeg').send(audio);

}

export const config = {
  api: {
    responseLimit: '16mb'
  }
}
