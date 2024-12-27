import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import NextAuth from 'next-auth'
import { BuildAuthOptions } from '../../../../utils/BuildAuthOptions'



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, BuildAuthOptions(req, res))
}

export { handler as GET, handler as POST, BuildAuthOptions }
