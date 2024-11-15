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
    case 'canceled':
      return 'Cancelado'
  }
}