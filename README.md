# geoapi.es-nodejs
Librería en JS para GeoAPI.es

### Cómo empezar

Es preferible leer la [documentación general](https://github.com/GeoAPI-es/geoapi.es-docs) a la par con esta documentación.

La librería esta disponible en [npm](https://npmjs.org/).

Para instalar <b>geoapi.es-nodejs</b> y sus dependencias, es suficiente con añadir

    "@geoapi.es/nodejs": "~1.0.0"

en la sección `dependencies` de tu archivo `package.json`.

### Como funciona a nivel funcional

La librería tiene 2 partes importantes.

De base usaremos el siguiente código para poder explicar mejor cada parte.

```javascript
var GeoAPI = require("@geoapi.es/nodejs")();
```

* Configuracion

    El método `setConfig` sirve para definir los parámetros que usará la librería para hacer las
    peticiones. Dichos parámetros están explicados en la [documentación general](https://github.com/GeoAPI-es/geoapi.es-docs).

    ```javascript
    //
    GeoAPI.setConfig("key", "...");
    GeoAPI.setConfig("sandbox", 0);
    ...
    ```

* Métodos

    La librería dispone de varios métodos, los cuales se usan para realizar las distintas peticiones. Cada uno de los métodos puede tener 0 o más parámetros, que se usan para,
    por ejemplo, filtrar o concretar la busqueda. Los métodos reciben un unico argumento del
    tipo Object, que a su vez debe contener parejas de valores siendo:

    * la clave - una cadena de texto especificando el parámetro que se desea enviar
    * el valor - o bien una cadena de texto o bien un número que da valor al parámetro

    Ejemplos:

    ```javascript
    //
    GeoAPI.comunidades({});
    GeoAPI.provincias({
        'CCOM': '08'
    });
    ...
    ```

    Todos los métodos disponibles, así como sus parámetros, están especificados en la [documentación general](https://github.com/GeoAPI-es/geoapi.es-docs).

### Cómo funciona a nivel técnico

La librería realiza peticiones `GET` al endpoint y ejecuta un callback (usando `$q` de Angular),
pasándole como parámetros los datos recibidos. De esta manera se consigue un código asíncrono.

```javascript
GeoAPI.comunidades({
    //Sin argumentos
}).then(function($respuesta) {
    console.log($respuesta);
}, function($error) {
    console.log($error);
});
```
