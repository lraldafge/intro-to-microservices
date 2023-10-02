# Documentación de API en Express y TypeScript

Esta documentación describe los endpoints y la funcionalidad de la API construida con Express.js y TypeScript...

## Requisitos

Asegúrate de tener instalado Node.js y npm en tu sistema antes de ejecutar la aplicación...

## Endpoints

### Endpoint 1: Obtener los elementos

URL: /api/get  
Método: GET  
Descripción: obtiene los elementos.

ej de solicitud:

```bash
curl --request GET \
  --url myurl/myapi/endpoint1 \
  --header 'Authorization: Bearer bla bla bla' \
  --header 'Content-Type: application/json' \
```

ej de respuesta:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "nombre": "Elemento 1",
      "descripcion": "Descripción del elemento 1"
    },
    {
      "id": 2,
      "nombre": "Elemento 2",
      "descripcion": "Descripción del elemento 2"
    }
  ]
}
```

### Endpoint 2: Crear un nuevo elemento

URL: /api/items  
Método: POST  
Descripción: Crea un nuevo elemento.

ej de solicitud:

```bash
curl --request POST \
  --url myurl/myapi/endpoint2 \
  --header 'Authorization: Bearer bla bla bla' \
  --header 'Content-Type: application/json' \
  --data '{
	"some":"Data"
    }'
```

ej de respuesta:

```json
{
  "status": "success",
  "data": {
    "created": {
      "some": "data"
    }
  }
}
```

ej de respuesta fallida:

```json
{
  "success": false,
  "error": "Some error"
}
```

**Documentar cada posible respuesta**
