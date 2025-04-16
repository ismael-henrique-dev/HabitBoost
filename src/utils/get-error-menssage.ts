export function getErrorMessage(error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : 'underfined error'
  return errorMessage
}