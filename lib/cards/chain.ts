/**
 * Chain mint stays dark unless a public chain target is configured.
 * Platform-native cards are not NFTs on a ledger.
 */
export function chainMintConfigured() {
  return Boolean(
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_VDOC_CARDS_CHAIN
  )
}

export function chainTarget() {
  return process.env.NEXT_PUBLIC_VDOC_CARDS_CHAIN?.trim() || null
}

export function describeCardKind() {
  return chainMintConfigured()
    ? `Chain mint is on · ${chainTarget()}`
    : 'Platform-native collectibles · chain mint is off'
}
