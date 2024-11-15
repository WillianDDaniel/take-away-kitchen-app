export default function dateFormatter(dateTime) {
  if (!dateTime) return

  const brHour = new Date(dateTime).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const brDate = new Date(dateTime).toLocaleDateString('pt-BR')

  return `${brHour} - ${brDate}`
}
