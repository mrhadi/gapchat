export const hasStatus = (response, status = 200) =>
  Boolean(response && status === response.status)

export const isOkay = hasStatus
