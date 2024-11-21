export default function translateOrderStatus(status) {
  switch (status) {
    case 'pending':
      return 'Pendente'
    case 'preparing':
      return 'Em preparo'
    case 'ready':
      return 'Pronto'
    case 'delivered':
      return 'Entregue'
    case 'cancelled':
      return 'Cancelado'
  }

  if (!status) {
    return [
      'pending',
      'preparing',
      'ready',
      'delivered',
      'cancelled'
    ]
  }
}