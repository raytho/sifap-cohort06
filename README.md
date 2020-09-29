# SIFAP

## Documentación

### CSS
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


### React

## Componentes
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
   # RoleManage
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

   Función con la que hacemos las peticiones al servidor:

   `const [data, setData] = useState([]);` :Estado con el que gestionamos la data que recibimos con la fucion getData:


   `const [newUser, setNewUser] = useState(false);` Estado con el que volvemos a ejecutar el getData para ver cambios en tiempo real: este estado se ejecuta una vez creamos un usuario, se ejecuta en el componente `<RoleAddContainer></RoleAddContainer>`, hacemos conexión pasando props Hijo a Padre.
   Hijo ejecuta y Padre recibe y gestiona con la función :

   ```
   const handleNewUser = () => {
      setNewUser(true)
   }
   ```
    ```
    useEffect(() => {
      const getData = async () => {
         try {
            const response = await fetch(`${API}superAdmin/getAllUsers`);
            const result = await response.json();
            setData(result);
            setNewUser(false)
         } catch (error) {
            window.console.log(error.message);
         }
      };
      getData()

   }, [newUser]);
   ```
