export function emitAccessTokenChangedEvent(): void {
  const event = new CustomEvent('accessTokenChanged');
  window.dispatchEvent(event);
}
