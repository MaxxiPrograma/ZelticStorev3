"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useOrderStore } from "@/lib/store"
import type { Order } from "@/lib/types"
import { Calendar, User, MapPin, Phone, Package } from "lucide-react"

export function OrdersManager() {
  const { orders, updateOrderStatus } = useOrderStore()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600"
      case "completed":
        return "bg-green-600"
      case "cancelled":
        return "bg-red-600"
      default:
        return "bg-zinc-600"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "completed":
        return "Completado"
      case "cancelled":
        return "Cancelado"
      default:
        return "Desconocido"
    }
  }

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    updateOrderStatus(orderId, newStatus)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gestión de Pedidos</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-zinc-800 rounded-lg">
          <Package className="h-12 w-12 mx-auto mb-4 text-zinc-600" />
          <p className="text-zinc-400">No hay pedidos disponibles.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((order) => (
              <div key={order.id} className="bg-zinc-800 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Pedido #{order.id}</h3>
                    <div className="flex items-center text-zinc-400 text-sm mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(order.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(order.id, "pending")}
                        disabled={order.status === "pending"}
                      >
                        Pendiente
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(order.id, "completed")}
                        disabled={order.status === "completed"}
                      >
                        Completar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusChange(order.id, "cancelled")}
                        disabled={order.status === "cancelled"}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Información del cliente */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-400">Información del Cliente</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-zinc-400" />
                        <span>
                          {order.customer.name} {order.customer.lastName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-zinc-400" />
                        <span>{order.customer.phone}</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 text-zinc-400 mt-0.5" />
                        <div>
                          <div>{order.customer.address}</div>
                          <div className="text-zinc-400">CP: {order.customer.postalCode}</div>
                        </div>
                      </div>
                      {order.customer.notes && (
                        <div className="mt-2 p-2 bg-zinc-700 rounded text-xs">
                          <strong>Notas:</strong> {order.customer.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Productos del pedido */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-400">Productos</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm bg-zinc-700 p-2 rounded">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-zinc-400">
                              Talle: {item.size} | Cantidad: {item.quantity}
                            </div>
                          </div>
                          <div className="text-blue-400">{item.price}</div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-zinc-600 pt-2 mt-4">
                      <div className="flex justify-between items-center font-bold">
                        <span>Total:</span>
                        <span className="text-blue-400">${order.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
