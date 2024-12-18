export const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export const CATEGORIES = {
  LAYER1: 'layer1',
  DEFI: 'defi',
  GAMING: 'gaming',
  EXCHANGE: 'exchange',
  STABLECOIN: 'stablecoin',
  MEME: 'meme',
  METAVERSE: 'metaverse',
  PRIVACY: 'privacy',
  INFRASTRUCTURE: 'infrastructure',
  LENDING: 'lending',
  OTHER: 'other'
} as const;

export const CATEGORY_COINS = {
  [CATEGORIES.LAYER1]: ['btc', 'eth', 'sol', 'ada', 'avax', 'dot', 'near', 'atom'],
  [CATEGORIES.DEFI]: ['uni', 'aave', 'cake', 'comp', 'mkr', 'sushi', 'crv'],
  [CATEGORIES.GAMING]: ['axs', 'sand', 'mana', 'enj', 'gala', 'ilv'],
  [CATEGORIES.EXCHANGE]: ['bnb', 'ftx', 'kcs', 'okb', 'ht'],
  [CATEGORIES.STABLECOIN]: ['usdt', 'usdc', 'busd', 'dai', 'ust'],
  [CATEGORIES.MEME]: ['doge', 'shib', 'elon', 'samo', 'floki'],
  [CATEGORIES.METAVERSE]: ['sand', 'mana', 'axs', 'enj', 'gala'],
  [CATEGORIES.PRIVACY]: ['xmr', 'zec', 'scrt', 'dash', 'xvg'],
  [CATEGORIES.INFRASTRUCTURE]: ['link', 'grt', 'ar', 'fil', 'theta'],
  [CATEGORIES.LENDING]: ['aave', 'comp', 'nexo', 'cel', 'amp']
};