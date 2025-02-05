'use client'

export const ConnectButton = () => {
  return (
    <div >
        {/* @ts-expect-error Add this line while our team fix the upgrade to react 19 for global components */}
        <appkit-button />
    </div>
  )
}
