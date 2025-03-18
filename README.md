# RollingGames Comisión Web7 🎮

![RollingGames Logo](rolling_code_logo.png)

# 📝 Alcance del proyecto

El objetivo de este proyecto consiste en crear una página web con un catálogo de juegos al estilo de Steam, Epic games etc. El sitio deberá estar compuesto con una página principal con el catálogo de juegos disponibles, y otra página desde donde se administra toda la información de los juegos disponibles.

# 📌 Requerimientos mínimos

## Página principal

Los requerimientos mínimos en la pagina principal son los siguientes:

- `Navbar` fijo con el logo del sitio, debe contener al menos los botones de inicio,login y registro.
- Una sección con la imagen o video del juego (que estará marcado como destacado).
- A la par del juego destacado mostrar las propiedades del juego: categoría, nombre y descripción breve, botón de ver más(debe redireccionar a la web con el detalle del juego).
- Debajo de la imagen destacada agregar las categorías disponibles (al menos cuatro), con los juegos disponibles por categoría (ver mockup).
- El footer contendrá el copyright de la empresa y los logos de redes sociales (optativo incluir los link al resto de las páginas del sitio ej: acerca de nosotros, contacto etc).

## Página detalle de juego

Cuando el usuario seleccione un juego de la página principal, se redireccionará a una web con el detalle del mismo.
Los requerimientos mínimos en en esta página son los siguientes:

- El diseño de esta página es libre.
- Debe contar con al menos una imagen o video, nombre, la descripción del juego y categoría a la cual pertenece, además un botón para comprar este juego (el cual redirecciona a la web error 404, ya que el módulo de compras no formará parte de este proyecto)

## Página de administración

Requerimientos mínimos de la web de administración:

- El navbar debe ser igual al de la página principal, (cuando este en esta página debe aparecer un ítem en el menú “administración” que corresponde a la página actual, este debe estar oculto en la web de inicio, hasta que nos loguemos como administrador)
- Botón para agregar nuevos juegos, debe abrir una ventana modal con todos los campos necesarios para agregar un nuevo juego. (ver mockup de ventana modal)
- Tabla de juegos, muestra todos los juegos disponibles en el sitio, cada uno tiene los siguientes campos
  - Código: numero único
  - Nombre de juego: Nombre de juego
  - Categoría: Nombre de la categoría a la cual pertenece.
  - Descripción: Descripción del juego.
  - Publicado: campo booleano para indicar si el juego está publicado (disponible en el sitio) o no.
- Cada fila de la tabla tendrá los elementos necesarios para realizar las siguientes acciones:
  - Borrar un juego.
  - Editar un juego, debe abrir una ventana modal (igual a la de nuevo juego) y permitir cambiar los valores del mismo.
  - Agregar un botón destacar (estrella). El juego que figure como destacado, debe tener resaltada la fila de la tabla o el icono de la estrella, solo uno deberá ser destacado y es la que se muestra primero en la pantalla principal del sitio.

## Página o modal de Login

- El diseño de esta página es opcional.
- El formulario de login debe solicitar un nombre de usuario o email y contraseña.
  Estos campos deben estar correctamente validados.
- Incorporar un link para recuperar la contraseña en caso de no recordarla, al
  presionar este link mostrar los pasos a seguir para poder recuperar la contraseña.
- Si me logueo como el usuario administrador, me debe redirigir a la web de
  administración, si el usuario y contraseña ingresados no existe, debo informar con un modal o alert.

## Página o modal de registro

- El diseño de esta página es opcional.
- Este formulario me permitirá registrar usuarios al sitio web, por lo tanto solicitar todos los datos necesarios y enviarlos por mail al administrador del sitio.
- El formulario debe estar completamente validado.

## Página de contacto

- La página de contacto puede tener un diseño opcional, (puedo llegar a esta página con un botón en el navbar o en el footer).
- Debe contener un formulario de consulta totalmente validado, la misma debe ser enviada por mail al administrador del sitio.

## Página de acerca de nosotros

- El diseño es opcional debe contener la información del equipo de desarrollo. (puedo llegar a este sitio a través del navbar o del footer)

## Página de Error 404

- El Diseño de esta página es opcional, todos los botones que no cumplan una función específica deben llevarme a este sitio.

# 📌 Requerimientos Optativos

## Página de administración de usuarios

Este módulo es optativo, una vez que un usuario completa el formulario de registro, en la web del administrador además de la administración de los juegos, contendrá una tabla para administrar los usuarios:

El proceso para administrar usuarios es el siguiente:

- al completar el formulario de registro el usuario aún no está validado (es decir que no puede loguearse en nuestro sitio), un administrador debe modificar su estado y aprobarlo.
- Los usuarios que completaron su registro aparecerán en la tabla de usuarios con un estado pendiente.
- Un usuario administrador puede modificar su estado a aprobado o suspendido.
- Un usuario que está aprobado podrá loguearse y será redireccionado a la web principal, que contendrá además un mensaje de bienvenida al usuario logueado.
- Cualquier usuario que esté logueado debe tener la opción para cerrar su sesión.

## Filtro de búsqueda en página principal

En la página principal agregar un filtro de búsqueda por categoría y por nombre de juego (debe ser funcional).

## Agregar videos a través de una url

En el formulario para dar de alta un juego agregar un campo URL, el cual debe ser un link de youtube, cuando se vea el detalle del juego se debe poder reproducir el video (trailer del juego) enlazado a partir de la url ingresada en el formulario.

# Diseño:

- El sitio debe estar realizado con Bootstrap y puede incluir estilos propios.
- Pueden incluir todos los efectos de Javascript que deseen.
- Importante: El sitio debe ser completamente responsive.

# Evaluación:

En este proyecto se evaluará el uso de las siguientes herramientas y conceptos:

1. Panel de trello grupal
2. Uso de Git, subir el proyecto a github o gitla y a netlify.
3. Sitio responsive.
4. Estructura de proyecto.
