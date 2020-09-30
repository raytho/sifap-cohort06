# SIFAP

# Documentación

## CSS
   Para el estilado de la aplicación estamos usando el preprocesador Sass:
   Profundidad maxima de anidación: 3

   Nomenclatura de carpetas: name
   Nomenclatura de archivos: Name.scss / NameName.scss
   Nomenclatura de variables: --name-name: value;
      - Variables nativas de css
   Nomenclatura de mixin, placeholder: @mixin/%placeholder name-lastname {}

   Metodología: BEM, Bloque sera en capitalize Ej: Bloque__elemento--modificador

   Selectores: Todos menos ID, no usar !important

   Los archivos **utils** Var.scss y Reset.scss y Las fuentes los importamos al archivo App.scss y este los importamos a App.jsx, de esta manera tenemos acceso a estas utilerías, ya que cada archivo.scss que corresponda a un componente en React sera importado en el.
   Mixin y Placeholder, se importaran en cada archivo que los necesite

   - Hover para anclas '<a></a>' #049ECA
   - Color cuando se seleciona algún item #007EA3

   ### Estructura
      - styles/
         - componentes/
            DelegateSuper/
            RoleManage/
            Header.scss
         - utils/
            Mixin.scss
            Placeholder.scss
            Reset.scss
            Var.scss
         App.scss


## React

### Componentes
Todos los componentes que pertenecen a las funcionalidades: Facturas, Historial, Estadísticas, Clientes, Roles, C.Fiscales Delegar S. Admin los encapsulo un componente `<Layout></Layout` que tiene el `NavBar y Header`

```
   import Header from './Header';
   import Navbar from './Navbar';

   const Layout = (props) => {

      const { children } = props;

      return (
         <>
            <Header />
            <div className='Content'>
               <Navbar />
               <main className='Main'>
                  {children}
               </main>
            </div>
         </>
      );
   }
```
   #### GetData
   Es el componente encargado de hacer las peticiones `GET` esta en la carpeta `containers`
   **Uso:**
   Recibe 3 props: api, updateData, children
   - api: la api a la cual vamos hacer la petición
   -updateData: recibe un valor booleano que permite re-ejecutar la petición para actualizar  datos en tiempo real, es una prop opcional.
   - children: el componente GetData maneja la ténica RenderProps, entonces recibe un componente al cual le vamos a pasar los datos que recibimos en la petición.

   Devuelve 3 valores: loading, error, data
   - loading: `true` si la petición aún no se ha completado, `false` si ya se completo
   - error: devuelve el error si llega haber uno en la petición
   - data: la data que se espera de la petición


   ```
   <GetData api={`${API}superAdmin/getAllUsers`} updateData={update}>
      {
         ({ loading, error, data }) => {
            if(loading) return <p>loading...</p>
            if(error) return <p>¡Error!</p>
            return (
               <ul>
                  {
                     data.map(item => <li key={item.id}>{item.name}</li>)
                  }
               </ul>
            )
         }
      }
   </GetData>
   ```


   #### RoleManage
   Este componente tiene la funcionalidad de gestionar los usuarios de la cuenta actual de la app:
      - Crear/Leer/Actualizar/Borrar (CRUD) de los usuarios

   RoleManage tiene  un componente que encapsula a todos los componentes que se presentan en esta sección:

   ```
   const Roles = ({ children }) => {

      return (
         <>
            <Title {...propsRole} />
            {children}
         </>
      )
   }

   ```

   <!-- `const [newUser, setNewUser] = useState(false);` Estado con el que volvemos a hacer una petición en el componente `GetData` para ver cambios en tiempo real de los usuarios agregados: este estado cambia una vez creamos un usuario. Hacemos el cambio de estado con 2 funciones las cuales comunican de: Nieto, Hijo y Padre:

   La función `handleNewUser()` es creada en el componente Padre `<RoleManageContainer>` y es la encargada de cambiar el estado:
      ```
      const handleNewUser = () => {
         if (newUser) {
            setNewUser(false)
         } else {
            setNewUser(true)
         }
      }
      ```
   La función `handleNewUserGrandchild()` es creada en el componente Hijo `<RoleManage>` y es la encargada de llamar a la función `handleNewUser`
   ```
   const handleNewUserGrandchild = () => {
      handleNewUser();
   }

   ```
   El componente Nieto `<RoleAddContainer>` es el encargado de llamar a la función `handleNewUserGrandChild()` al momento de hacer la petición `POST` para crear un nuevo usuario -->

