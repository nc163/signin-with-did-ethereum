import { NextApiRequest, NextApiResponse } from 'next'
import { EthrDID } from 'ethr-did'
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver' 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  const [chainNameOrId, identifier] = slug as string[];

  const ethr = new Resolver(getResolver({ rpcUrl: process.env.ETHEREUM_PROVIDER_URL }));
  const goerli = new Resolver(getResolver({ rpcUrl: process.env.GOERLI_PROVIDER_URL }));
  // const polygon = new Resolver(getResolver({ rpcUrl: providerUrl }));
  // const mumbai = new Resolver(getResolver({ rpcUrl: providerUrl }));

  const ethrDid = new EthrDID({
    identifier: identifier,
    // provider: 'https://mainnet.infura.io/v3/<PROJECT_ID>',
    // registry: '0xdca7ef03e98e0dc2b855be647c39abe984fcf21b',
    chainNameOrId: chainNameOrId
  })
  
  const resolver = getResolver({ 
    chainId: ethrDid.network.chainId,
    rpcUrl: 'https://rpc-mainnet.maticvigil.com'
  })
  // const response = {
  //   path: path,
  //   id: id,
  // };

  res.status(200).json({ did: ethrDid.did});
}
