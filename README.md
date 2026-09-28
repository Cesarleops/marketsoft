# Marketsoft — Backend

Backend para el sistema de supermercado **Marketsoft**, construido con Express y Sequelize sobre PostgreSQL.

Autor: **Cesar Leyton**

## Descripción

API REST que gestiona los recursos de un supermercado:

- **Usuarios** (`users`): personal del supermercado
- **Proveedores** (`providers`): proveedores de productos.
- **Productos** (`products`): inventario con precio y stock, cada uno asociado a un proveedor.
- **Ventas** (`sales`): ventas con detalles por producto. El total de la venta se calcula automáticamente y el stock de cada producto se descuenta al momento de la venta.

## Requisitos

- Node.js 18 o superior
- PostgreSQL 13 o superior

## Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DB_USERNAME=postgres
DB_PASSWORD=password
DB_HOSTNAME=localhost
DB_PORT=5432
DB_NAME=marketsoft
```

Estas variables son leídas por `database/client.js` para construir la cadena de conexión de Sequelize, es necesario tener un servidor de Postgresql en ejecución.

## Ejecución

```bash
npm install
node index.js
```

## Endpoints

URL base: `http://localhost:3000/api`

### Usuarios — `/api/users`

| Método | Ruta   | Descripción                       |
| ------ | ------ | --------------------------------- |
| GET    | `/`    | Lista todos los usuarios          |
| GET    | `/:id` | Obtiene un usuario por id         |
| POST   | `/`    | Crea un usuario                   |
| PUT    | `/:id` | Actualiza parcialmente un usuario |
| DELETE | `/:id` | Elimina un usuario                |

Cuerpo de creación/actualización: `{ "name", "email", "role" }`.

Ejemplo para crear usuario

```json
{
  "name": "Cesar",
  "email": "cesarleyton549@gmail.com",
  "role": "admin"
}
```

### Proveedores — `/api/providers`

| Método | Ruta   | Descripción                         |
| ------ | ------ | ----------------------------------- |
| GET    | `/`    | Lista todos los proveedores         |
| GET    | `/:id` | Obtiene un proveedor por id         |
| POST   | `/`    | Crea un proveedor                   |
| PUT    | `/:id` | Actualiza parcialmente un proveedor |
| DELETE | `/:id` | Elimina un proveedor                |

Cuerpo de creación/actualización: `{ "name", "phone", "email", "city" }`.

Ejemplo para crear proveedor

```json
{
  "name": "Alqueria",
  "phone": "+57123456789",
  "email": "ventas@alqueria.com",
  "city": "Bogota"
}
```

### Productos — `/api/products`

| Método | Ruta   | Descripción                        |
| ------ | ------ | ---------------------------------- |
| GET    | `/`    | Lista todos los productos          |
| GET    | `/:id` | Obtiene un producto por id         |
| POST   | `/`    | Crea un producto                   |
| PUT    | `/:id` | Actualiza parcialmente un producto |
| DELETE | `/:id` | Elimina un producto                |

Cuerpo de creación/actualización: `{ "name", "description", "price", "stock", "providerId" }`.

Ejemplo para crear un producto

```json
{
  "name": "Leche Alqueria",
  "description": "Leche entera 1L",
  "price": 4.5,
  "stock": 100,
  "providerId": "<id del proveedor>"
}
```

### Ventas — `/api/sales`

| Método | Ruta   | Descripción                         |
| ------ | ------ | ----------------------------------- |
| GET    | `/`    | Lista todas las ventas con detalles |
| GET    | `/:id` | Obtiene una venta por id            |
| POST   | `/`    | Crea una venta                      |
| PUT    | `/:id` | Cambia el usuario de una venta      |

No incluí DELETE para las ventas porque luego de ejecutar una venta
no deberían poderse revertir los efectos (como el cambio en el stock de cada producto)

Para el PUT solo habilité que se pueda cambiar el userId

Ejemplo para crear una venta:

```json
{
  "userId": "id de usuario",
  "items": [{ "productId": "id del producto", "quantity": 2 }]
}
```
